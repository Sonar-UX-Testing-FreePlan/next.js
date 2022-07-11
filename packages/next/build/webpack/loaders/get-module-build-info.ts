import { webpack5 } from 'next/dist/compiled/webpack/webpack'

/**
 * A getter for module build info that casts to the type it should have.
 * We also expose here types to make easier to use it.
 */
export function getModuleBuildInfo(webpackModule: webpack5.Module) {
  return webpackModule.buildInfo as {
    nextEdgeMiddleware?: EdgeMiddlewareMeta
    nextEdgeApiFunction?: EdgeMiddlewareMeta
    nextEdgeSSR?: EdgeSSRMeta
    nextUsedEnvVars?: Set<string>
    nextWasmMiddlewareBinding?: WasmBinding
    nextAssetMiddlewareBinding?: AssetBinding
    usingIndirectEval?: boolean | Set<string>
    route?: RouteMeta
    importLocByPath?: Map<string, any>
  }
}

export interface RouteMeta {
  page: string
  absolutePagePath: string
}

export interface EdgeMiddlewareMeta {
  page: string
  matcherRegexp?: string
}

export interface EdgeSSRMeta {
  isServerComponent: boolean
  page: string
}

export interface WasmBinding {
  filePath: string
  name: string
}

export interface AssetBinding {
  filePath: string
  name: string
  /**
   * this.emitFile fails so I add the source here to add an asset
   * directly in the hook. Maybe I can fix it
   */
  source: Buffer
}
