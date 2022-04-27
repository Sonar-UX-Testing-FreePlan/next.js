import type ws from 'ws'
import type { webpack5 as webpack } from 'next/dist/compiled/webpack/webpack'
import type { NextConfigComplete } from '../config-shared'
import { EventEmitter } from 'events'
import { findPageFile } from '../lib/find-page-file'
import { getPageRuntime, runDependingOnPageType } from '../../build/entries'
import { join, posix } from 'path'
import { normalizePagePath, normalizePathSep } from '../page-path-utils'
import { ensureLeadingSlash, removePagePathTail } from '../page-path-utils'
import { pageNotFoundError } from '../require'
import { reportTrigger } from '../../build/output'
import getRouteFromEntrypoint from '../get-route-from-entrypoint'

export const ADDED = Symbol('added')
export const BUILDING = Symbol('building')
export const BUILT = Symbol('built')

export const entries: {
  [page: string]: {
    bundlePath: string
    absolutePagePath: string
    status?: typeof ADDED | typeof BUILDING | typeof BUILT
    lastActiveTime?: number
    dispose?: boolean
  }
} = {}

export default function onDemandEntryHandler(
  watcher: any,
  multiCompiler: webpack.MultiCompiler,
  {
    pagesDir,
    nextConfig,
    maxInactiveAge,
    pagesBufferLength,
  }: {
    pagesDir: string
    nextConfig: NextConfigComplete
    maxInactiveAge: number
    pagesBufferLength: number
  }
) {
  const { compilers } = multiCompiler
  const invalidator = new Invalidator(watcher, multiCompiler)

  let lastClientAccessPages = ['']
  let doneCallbacks: EventEmitter | null = new EventEmitter()

  for (const compiler of compilers) {
    compiler.hooks.make.tap(
      'NextJsOnDemandEntries',
      (_compilation: webpack.Compilation) => {
        invalidator.startBuilding()
      }
    )
  }

  function getPagePathsFromEntrypoints(
    type: string,
    entrypoints: any
  ): string[] {
    const pagePaths = []
    for (const entrypoint of entrypoints.values()) {
      const page = getRouteFromEntrypoint(entrypoint.name)
      if (page) {
        pagePaths.push(`${type}${page}`)
      }
    }

    return pagePaths
  }

  multiCompiler.hooks.done.tap('NextJsOnDemandEntries', (multiStats) => {
    if (invalidator.rebuildAgain) {
      return invalidator.doneBuilding()
    }
    const [clientStats, serverStats, edgeServerStats] = multiStats.stats
    const pagePaths = [
      ...getPagePathsFromEntrypoints(
        'client',
        clientStats.compilation.entrypoints
      ),
      ...getPagePathsFromEntrypoints(
        'server',
        serverStats.compilation.entrypoints
      ),
      ...(edgeServerStats
        ? getPagePathsFromEntrypoints(
            'edge-server',
            edgeServerStats.compilation.entrypoints
          )
        : []),
    ]

    for (const page of pagePaths) {
      const entry = entries[page]
      if (!entry) {
        continue
      }

      if (entry.status !== BUILDING) {
        continue
      }

      entry.status = BUILT
      doneCallbacks!.emit(page)
    }

    invalidator.doneBuilding()
  })

  const pingIntervalTime = Math.max(1000, Math.min(5000, maxInactiveAge))

  const disposeHandler = setInterval(function () {
    disposeInactiveEntries(watcher, lastClientAccessPages, maxInactiveAge)
  }, pingIntervalTime + 1000)

  disposeHandler.unref()

  function handlePing(pg: string) {
    const page = normalizePathSep(pg)
    const pageKey = `client${page}`
    const entryInfo = entries[pageKey]
    let toSend

    // If there's no entry, it may have been invalidated and needs to be re-built.
    if (!entryInfo) {
      // if (page !== lastEntry) client pings, but there's no entry for page
      return { invalid: true }
    }

    // 404 is an on demand entry but when a new page is added we have to refresh the page
    if (page === '/_error') {
      toSend = { invalid: true }
    } else {
      toSend = { success: true }
    }

    // We don't need to maintain active state of anything other than BUILT entries
    if (entryInfo.status !== BUILT) return

    // If there's an entryInfo
    if (!lastClientAccessPages.includes(pageKey)) {
      lastClientAccessPages.unshift(pageKey)

      // Maintain the buffer max length
      if (lastClientAccessPages.length > pagesBufferLength) {
        lastClientAccessPages.pop()
      }
    }
    entryInfo.lastActiveTime = Date.now()
    entryInfo.dispose = false
    return toSend
  }

  return {
    async ensurePage(_page: string, clientOnly: boolean) {
      const { absolutePagePath, bundlePath, page } = await getPageInfo({
        pageExtensions: nextConfig.pageExtensions,
        page: _page,
        pagesDir,
      })

      let entriesChanged = false

      const addPageEntry = (type: 'client' | 'server' | 'edge-server') => {
        return new Promise<void>((resolve, reject) => {
          // Makes sure the page that is being kept in on-demand-entries matches the webpack output
          const pageKey = `${type}${page}`
          const entryInfo = entries[pageKey]

          if (entryInfo) {
            entryInfo.lastActiveTime = Date.now()
            entryInfo.dispose = false
            if (entryInfo.status === BUILT) {
              resolve()
              return
            }

            doneCallbacks!.once(pageKey, handleCallback)
            return
          }

          entriesChanged = true

          entries[pageKey] = {
            bundlePath,
            absolutePagePath,
            status: ADDED,
            lastActiveTime: Date.now(),
            dispose: false,
          }
          doneCallbacks!.once(pageKey, handleCallback)

          function handleCallback(err: Error) {
            if (err) return reject(err)
            resolve()
          }
        })
      }

      const promises = runDependingOnPageType({
        page,
        pageRuntime: await getPageRuntime(absolutePagePath, nextConfig),
        onClient: () => addPageEntry('client'),
        onServer: () => addPageEntry('server'),
        onEdgeServer: () => addPageEntry('edge-server'),
      })

      if (entriesChanged) {
        reportTrigger(
          !clientOnly && promises.length > 1
            ? `${page} (client and server)`
            : page
        )
        invalidator.invalidate()
      }

      return Promise.all(promises)
    },

    onHMR(client: ws) {
      client.addEventListener('message', ({ data }) => {
        data = typeof data !== 'string' ? data.toString() : data
        try {
          const parsedData = JSON.parse(data)

          if (parsedData.event === 'ping') {
            const result = handlePing(parsedData.page)
            client.send(
              JSON.stringify({
                ...result,
                event: 'pong',
              })
            )
          }
        } catch (_) {}
      })
    },
  }
}

function disposeInactiveEntries(
  _watcher: any,
  lastClientAccessPages: any,
  maxInactiveAge: number
) {
  Object.keys(entries).forEach((page) => {
    const { lastActiveTime, status, dispose } = entries[page]

    // Skip pages already scheduled for disposing
    if (dispose) return

    // This means this entry is currently building or just added
    // We don't need to dispose those entries.
    if (status !== BUILT) return

    // We should not build the last accessed page even we didn't get any pings
    // Sometimes, it's possible our XHR ping to wait before completing other requests.
    // In that case, we should not dispose the current viewing page
    if (lastClientAccessPages.includes(page)) return

    if (lastActiveTime && Date.now() - lastActiveTime > maxInactiveAge) {
      entries[page].dispose = true
    }
  })
}

// Make sure only one invalidation happens at a time
// Otherwise, webpack hash gets changed and it'll force the client to reload.
class Invalidator {
  private multiCompiler: webpack.MultiCompiler
  private watcher: any
  private building: boolean
  public rebuildAgain: boolean

  constructor(watcher: any, multiCompiler: webpack.MultiCompiler) {
    this.multiCompiler = multiCompiler
    this.watcher = watcher
    // contains an array of types of compilers currently building
    this.building = false
    this.rebuildAgain = false
  }

  invalidate() {
    // If there's a current build is processing, we won't abort it by invalidating.
    // (If aborted, it'll cause a client side hard reload)
    // But let it to invalidate just after the completion.
    // So, it can re-build the queued pages at once.
    if (this.building) {
      this.rebuildAgain = true
      return
    }

    this.building = true
    this.watcher.invalidate()
  }

  startBuilding() {
    this.building = true
  }

  doneBuilding() {
    this.building = false

    if (this.rebuildAgain) {
      this.rebuildAgain = false
      this.invalidate()
    }
  }
}

async function getPageInfo(opts: {
  page: string
  pageExtensions: string[]
  pagesDir: string
}) {
  const { page, pagesDir, pageExtensions } = opts

  let normalizedPagePath: string

  try {
    normalizedPagePath = normalizePagePath(page)
  } catch (err) {
    console.error(err)
    throw pageNotFoundError(page)
  }

  let pagePath = await findPageFile(
    pagesDir,
    normalizedPagePath,
    pageExtensions
  )

  if (pagePath === null) {
    // Default the /_error route to the Next.js provided default page
    if (page === '/_error') {
      pagePath = 'next/dist/pages/_error'
    } else {
      throw pageNotFoundError(normalizedPagePath)
    }
  }

  if (pagePath.startsWith('next/dist/pages/')) {
    return {
      page: normalizePathSep(page),
      bundlePath: page,
      absolutePagePath: require.resolve(pagePath),
    }
  }

  const pageUrl = ensureLeadingSlash(
    removePagePathTail(normalizePathSep(pagePath), pageExtensions)
  )

  return {
    bundlePath: posix.join('pages', normalizePagePath(pageUrl)),
    absolutePagePath: join(pagesDir, pagePath),
    page: posix.normalize(pageUrl),
  }
}
