import type { CacheNode } from '../../shared/lib/app-router-context'
import type {
  FlightRouterState,
  FlightData,
  FlightDataPath,
} from '../../server/app-render'
import { fetchServerResponse } from './app-router.client'

const fillCacheWithNewSubTreeData = (
  newCache: CacheNode,
  existingCache: CacheNode,
  flightDataPath: FlightDataPath
) => {
  const isLastEntry = flightDataPath.length <= 2

  if (isLastEntry) {
    const [, subTreeData] = flightDataPath

    if (!newCache.data && !newCache.subTreeData) {
      newCache.subTreeData = subTreeData
    }
    return
  }

  const [parallelRouteKey, segment] = flightDataPath

  const existingChildSegmentMap =
    existingCache.parallelRoutes.get(parallelRouteKey)

  if (!existingChildSegmentMap) {
    // Bailout because the existing cache does not have the path to the leaf node
    // Will trigger lazy fetch in layout-router because of missing segment
    return
  }

  let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey)
  if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
    childSegmentMap = new Map(existingChildSegmentMap)
    newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap)
  }

  const existingChildCacheNode = existingChildSegmentMap.get(segment)
  let childCacheNode = childSegmentMap.get(segment)
  if (!childCacheNode || !existingChildCacheNode) {
    // Bailout because the existing cache does not have the path to the leaf node
    // Will trigger lazy fetch in layout-router because of missing segment
    return
  }

  if (childCacheNode === existingChildCacheNode) {
    childCacheNode = {
      data: childCacheNode.data,
      subTreeData: childCacheNode.subTreeData,
      parallelRoutes: new Map(childCacheNode.parallelRoutes),
    }
    childSegmentMap.set(segment, childCacheNode)
  }

  fillCacheWithNewSubTreeData(
    childCacheNode,
    existingChildCacheNode,
    flightDataPath.slice(2)
  )
}

const createOptimisticTree = (
  segments: string[],
  flightRouterState: FlightRouterState | null,
  isFirstSegment: boolean,
  parentRefetch: boolean,
  href?: string
): FlightRouterState => {
  const [existingSegment, existingParallelRoutes] = flightRouterState || [
    null,
    {},
  ]
  const segment = segments[0]
  const isLastSegment = segments.length === 1

  const shouldRefetchThisLevel =
    !flightRouterState || segment !== flightRouterState[0]

  let parallelRoutes: FlightRouterState[1] = {}
  if (existingSegment === segment) {
    parallelRoutes = existingParallelRoutes
  }

  let childTree
  if (!isLastSegment) {
    const childItem = createOptimisticTree(
      segments.slice(1),
      parallelRoutes ? parallelRoutes.children : null,
      false,
      parentRefetch || shouldRefetchThisLevel
    )

    childTree = childItem
  }

  const result: FlightRouterState = [
    segment,
    {
      ...parallelRoutes,
      ...(childTree ? { children: childTree } : {}),
    },
  ]

  if (!parentRefetch && shouldRefetchThisLevel) {
    result[3] = 'refetch'
  }

  // Add url into the tree
  if (isFirstSegment) {
    result[2] = href
  }

  return result
}

type AppRouterState = {
  tree: FlightRouterState
  cache: CacheNode
  pushRef: { pendingPush: boolean }
  canonicalUrl: string
}

type HistoryState = { tree: FlightRouterState }

export function reducer(
  state: AppRouterState,
  action:
    | {
        type: 'navigate'
        payload: { url: URL; cacheType: 'soft' | 'hard'; cache: CacheNode }
      }
    | { type: 'restore'; payload: { url: URL; historyState: HistoryState } }
    | {
        type: 'server-patch'
        payload: {
          flightData: FlightData
          previousTree: FlightRouterState
        }
      }
): AppRouterState {
  if (action.type === 'restore') {
    const { url, historyState } = action.payload
    const href = url.pathname + url.search

    return {
      canonicalUrl: href,
      pushRef: state.pushRef,
      cache: state.cache,
      tree: historyState.tree,
    }
  }

  if (action.type === 'navigate') {
    const { url, cacheType, cache } = action.payload
    const { pathname } = url
    // TODO: include hash
    const href = url.pathname + url.search

    // TODO: hard push with optimistic tree
    // - Build optimistic tree
    // - Pass that in to fetch - if the optimistic tree is deeper than the current state leave that deeper part out of the fetch
    // - Fill in the cache with blank that holds the `data` field.
    // Extra: implement refresh at the root level

    const segments = pathname.split('/')
    // TODO: figure out something better for index pages
    segments.push('page')

    // Create new cache
    if (cacheType === 'hard') {
      if (!cache.data) {
        cache.data = fetchServerResponse(url, state.tree)
      }
      const root = cache.data.readRoot()
      cache.data = null

      const flightDataPath = root[0]

      fillCacheWithNewSubTreeData(cache, state.cache, flightDataPath)
      // TODO: patch the tree to reflect the flightDataPath tree
    }

    return {
      canonicalUrl: href,
      pushRef: { pendingPush: true },
      cache: cache ? cache : state.cache,
      tree: optimisticTreeWithRefetch,
    }
  }

  if (action.type === 'server-patch') {
    const { flightData, previousTree /* , newCache */ } = action.payload
    if (previousTree !== state.tree) {
      console.log('TREE MISMATCH')
      // TODO: Refetch here
      // return existingValue
    }

    // TODO: flightData could hold multiple paths
    const flightDataPath = flightData[0]

    const walkTreeWithFlightDataPath = (
      flightSegmentPath: FlightData[0],
      flightRouterState: FlightRouterState,
      treePatch: FlightRouterState
    ): FlightRouterState => {
      const [segment, parallelRoutes, url] = flightRouterState
      const [currentSegment, parallelRouteKey] = flightSegmentPath

      // Tree path returned from the server should always match up with the current tree in the browser
      // TODO: verify
      if (segment !== currentSegment) {
        throw new Error('TREE MISMATCH')
      }

      const lastSegment = flightSegmentPath.length === 2

      const tree: FlightRouterState = [
        flightSegmentPath[0],
        {
          ...parallelRoutes,
          [parallelRouteKey]: lastSegment
            ? treePatch
            : walkTreeWithFlightDataPath(
                flightSegmentPath.slice(2),
                parallelRoutes[parallelRouteKey],
                treePatch
              ),
        },
      ]

      if (url) {
        tree.push(url)
      }

      return tree
    }

    const treePath = flightDataPath.slice(0, -2)
    const [treePatch, subTreeData] = flightDataPath.slice(-2)

    // TODO: put the new tree into history?
    const newTree = walkTreeWithFlightDataPath(treePath, state.tree, treePatch)

    // Fill cache with data from flightDataTree
    // const fillCache = (
    //   cacheNode: CacheNode,
    //   flightSegmentPath: FlightData[0] // ["", "children", "dashboard", "children"], ["integrations", {children: ["page", {}]}], React.ReactNode
    // ) => {
    //   const [parallelRouteKey, currentSegment] = flightSegmentPath
    //   const lastSegment = flightSegmentPath.length === 1

    //   if (lastSegment) {
    //     if (cacheNode.parallelRoutes[parallelRouteKey].has(treePatch[0])) {
    //       // const childNode = cacheNode.parallelRoutes[parallelRouteKey].get(
    //       //   treePatch[0]
    //       // )!
    //       // childNode.subTreeData = subTreeData
    //       // childNode.parallelRoutes = {}
    //     } else {
    //       cacheNode.parallelRoutes[parallelRouteKey].set(treePatch[0], {
    //         subTreeData,
    //         parallelRoutes: {},
    //       })
    //     }
    //   } else {
    //     const childNode =
    //       cacheNode.parallelRoutes[parallelRouteKey].get(currentSegment)!
    //     fillCache(childNode, flightSegmentPath.slice(2))
    //   }
    // }

    // TODO: handle `/` case
    // fillCache(state.cache, treePath.slice(1))

    return {
      canonicalUrl: state.canonicalUrl,
      pushRef: state.pushRef,
      tree: newTree,
      cache: state.cache,
    }
  }

  return state
}
