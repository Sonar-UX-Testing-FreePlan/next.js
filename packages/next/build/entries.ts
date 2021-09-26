import chalk from 'chalk'
import { posix, join } from 'path'
import { stringify } from 'querystring'
import { API_ROUTE, DOT_NEXT_ALIAS, PAGES_DIR_ALIAS } from '../lib/constants'
import { __ApiPreviewProps } from '../server/api-utils'
import { isTargetLikeServerless } from '../server/config'
import { normalizePagePath } from '../server/normalize-page-path'
import { warn } from './output/log'
import { ClientPagesLoaderOptions } from './webpack/loaders/next-client-pages-loader'
import { ServerlessLoaderQuery } from './webpack/loaders/next-serverless-loader'
import { LoadedEnvFiles } from '@next/env'
import { NextConfigComplete } from '../server/config-shared'
import type webpack5 from 'webpack5'

type PagesMapping = {
  [page: string]: string
}

export function createPagesMapping(
  pagePaths: string[],
  extensions: string[],
  isWebpack5: boolean,
  isDev: boolean
): PagesMapping {
  const previousPages: PagesMapping = {}
  const pages: PagesMapping = pagePaths.reduce(
    (result: PagesMapping, pagePath): PagesMapping => {
      let page = `${pagePath
        .replace(new RegExp(`\\.+(${extensions.join('|')})$`), '')
        .replace(/\\/g, '/')}`.replace(/\/index$/, '')

      const pageKey = page === '' ? '/' : page

      if (pageKey in result) {
        warn(
          `Duplicate page detected. ${chalk.cyan(
            join('pages', previousPages[pageKey])
          )} and ${chalk.cyan(
            join('pages', pagePath)
          )} both resolve to ${chalk.cyan(pageKey)}.`
        )
      } else {
        previousPages[pageKey] = pagePath
      }
      result[pageKey] = join(PAGES_DIR_ALIAS, pagePath).replace(/\\/g, '/')
      return result
    },
    {}
  )

  // @Q This may need to be modified to make _layout work!

  // we alias these in development and allow webpack to
  // allow falling back to the correct source file so
  // that HMR can work properly when a file is added/removed
  if (isWebpack5 && isDev) {
    pages['/_app'] = `${PAGES_DIR_ALIAS}/_app`
    pages['/_layout'] = `${PAGES_DIR_ALIAS}/_layout`
    pages['/_error'] = `${PAGES_DIR_ALIAS}/_error`
    pages['/_document'] = `${PAGES_DIR_ALIAS}/_document`
  } else {
    pages['/_app'] = pages['/_app'] || 'next/dist/pages/_app'
    pages['/_layout'] = pages['/_layout'] || 'next/dist/pages/_layout' // @Q make default layout?
    pages['/_error'] = pages['/_error'] || 'next/dist/pages/_error'
    pages['/_document'] = pages['/_document'] || 'next/dist/pages/_document'
  }
  return pages
}

type Entrypoints = {
  client: webpack5.EntryObject
  server: webpack5.EntryObject
}

export function createEntrypoints(
  pages: PagesMapping,
  target: 'server' | 'serverless' | 'experimental-serverless-trace',
  buildId: string,
  previewMode: __ApiPreviewProps,
  config: NextConfigComplete,
  loadedEnvFiles: LoadedEnvFiles
): Entrypoints {
  const client: webpack5.EntryObject = {}
  const server: webpack5.EntryObject = {}

  const hasRuntimeConfig =
    Object.keys(config.publicRuntimeConfig).length > 0 ||
    Object.keys(config.serverRuntimeConfig).length > 0

  const defaultServerlessOptions = {
    absoluteAppPath: pages['/_app'],
    absoluteDocumentPath: pages['/_document'],
    absoluteErrorPath: pages['/_error'],
    absolute404Path: pages['/404'] || '',
    distDir: DOT_NEXT_ALIAS,
    buildId,
    assetPrefix: config.assetPrefix,
    generateEtags: config.generateEtags ? 'true' : '',
    poweredByHeader: config.poweredByHeader ? 'true' : '',
    canonicalBase: config.amp.canonicalBase || '',
    basePath: config.basePath,
    runtimeConfig: hasRuntimeConfig
      ? JSON.stringify({
          publicRuntimeConfig: config.publicRuntimeConfig,
          serverRuntimeConfig: config.serverRuntimeConfig,
        })
      : '',
    previewProps: JSON.stringify(previewMode),
    // base64 encode to make sure contents don't break webpack URL loading
    loadedEnvFiles: Buffer.from(JSON.stringify(loadedEnvFiles)).toString(
      'base64'
    ),
    i18n: config.i18n ? JSON.stringify(config.i18n) : '',
  }

  Object.keys(pages).forEach((page) => {
    const absolutePagePath = pages[page]
    const bundleFile = normalizePagePath(page)
    const isApiRoute = page.match(API_ROUTE)

    const clientBundlePath = posix.join('pages', bundleFile)
    const serverBundlePath = posix.join('pages', bundleFile)

    const isLikeServerless = isTargetLikeServerless(target)

    if (isApiRoute && isLikeServerless) {
      const serverlessLoaderOptions: ServerlessLoaderQuery = {
        page,
        absolutePagePath,
        ...defaultServerlessOptions,
      }
      server[serverBundlePath] = `next-serverless-loader?${stringify(
        serverlessLoaderOptions
      )}!`
    } else if (isApiRoute || target === 'server') {
      // server[serverBundlePath] = [absolutePagePath]
      // @Q
      if (['/_document', '/_app', '/_layout'].includes(page)) {
        server[serverBundlePath] = [absolutePagePath]
      } else {
        server[serverBundlePath] = [
          'private-next-pages/_layout.js',
          absolutePagePath,
        ]
      }
    } else if (isLikeServerless && page !== '/_app' && page !== '/_document') {
      const serverlessLoaderOptions: ServerlessLoaderQuery = {
        page,
        absolutePagePath,
        ...defaultServerlessOptions,
      }
      server[serverBundlePath] = `next-serverless-loader?${stringify(
        serverlessLoaderOptions
      )}!`
    }

    if (page === '/_document') {
      return
    }

    if (!isApiRoute) {
      const pageLoaderOpts: ClientPagesLoaderOptions = {
        page,
        absolutePagePath,
      }

      // @Q May need to look into this loader!
      const pageLoader = `next-client-pages-loader?${stringify(
        pageLoaderOpts
      )}!`

      // Make sure next/router is a dependency of _app or else chunk splitting
      // might cause the router to not be able to load causing hydration
      // to fail

      // @Q May need to add _layout as dependency of affected pages?
      if (page === '/_app') {
        client[clientBundlePath] = [
          pageLoader,
          require.resolve('../client/router'),
        ]
        // } else {
        //   client[clientBundlePath] = pageLoader
        // }
      } else if (page === '/_layout') {
        client[clientBundlePath] = pageLoader
      } else {
        client[clientBundlePath] = [
          'next-client-pages-loader?page=%2F_layout&absolutePagePath=private-next-pages%2F_layout.js!',
          pageLoader,
        ]
      }
    }
  })

  return {
    client,
    server,
  }
}

export function finalizeEntrypoint(
  name: string,
  value: any,
  isServer: boolean,
  isWebpack5: boolean
): any {
  if (isWebpack5) {
    if (isServer) {
      const isApi = name.startsWith('pages/api/')
      const runtime = isApi ? 'webpack-api-runtime' : 'webpack-runtime'
      const layer = isApi ? 'api' : undefined
      const publicPath = isApi ? '' : undefined
      if (typeof value === 'object' && !Array.isArray(value)) {
        return {
          publicPath,
          runtime,
          layer,
          ...value,
        }
      } else {
        return {
          import: value,
          publicPath,
          runtime,
          layer,
        }
      }
    } else {
      if (
        name !== 'polyfills' &&
        name !== 'main' &&
        name !== 'amp' &&
        name !== 'react-refresh'
      ) {
        const dependOn =
          name.startsWith('pages/') && name !== 'pages/_app'
            ? 'pages/_app'
            : 'main'
        if (typeof value === 'object' && !Array.isArray(value)) {
          return {
            dependOn,
            ...value,
          }
        } else {
          return {
            import: value,
            dependOn,
          }
        }
      }
    }
  }
  return value
}
