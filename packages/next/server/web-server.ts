import type { WebNextRequest, WebNextResponse } from './base-http'
import type { RenderOpts } from './render'
import type RenderResult from './render-result'
import type { NextParsedUrlQuery } from './request-meta'
import type { Params } from './router'
import type { PayloadOptions } from './send-payload'
import type { Options, Manifests } from './base-server'

import BaseServer from './base-server'

export default class NextWebServer extends BaseServer {
  // For the web server, we provide the manifests directly via the constructor.
  constructor(options: Options & { manifestOpts: Manifests }) {
    super(options)
  }
  protected loadManifests(manifests: Manifests) {
    return manifests
  }
  protected generateRewrites() {
    // @TODO: assuming minimal mode right now
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    }
  }
  protected handleCompression() {
    // @TODO
  }
  protected getPagePath() {
    // @TODO
    return ''
  }
  protected getPublicDir() {
    // @TODO
    return ''
  }
  protected getBuildId() {
    // @TODO
    return ''
  }
  protected loadEnvConfig() {
    // @TODO
  }
  protected getHasStaticDir() {
    return false
  }
  protected async hasMiddleware() {
    return false
  }
  protected generateImageRoutes() {
    return []
  }
  protected generateStaticRotes() {
    return []
  }
  protected generateFsStaticRoutes() {
    return []
  }
  protected generatePublicRoutes() {
    return []
  }
  protected getMiddleware() {
    return []
  }
  protected generateCatchAllMiddlewareRoute() {
    return undefined
  }
  protected getFontManifest() {
    return undefined
  }
  protected getMiddlewareManifest() {
    return undefined
  }
  protected getFilesystemPaths() {
    return new Set<string>()
  }
  protected async renderHTML(
    req: WebNextRequest,
    res: WebNextResponse,
    pathname: string,
    query: NextParsedUrlQuery,
    renderOpts: RenderOpts
  ): Promise<RenderResult | null> {
    // @TODO
    console.log(pathname)
    return null
  }
  protected async sendRenderResult(
    req: WebNextRequest,
    res: WebNextResponse,
    options: {
      result: RenderResult
      type: 'html' | 'json'
      generateEtags: boolean
      poweredByHeader: boolean
      options?: PayloadOptions | undefined
    }
  ): Promise<void> {
    // @TODO
    console.log(options)
  }
  protected async runApi() {
    // @TODO
    return true
  }
  protected async findPageComponents(
    pathname: string,
    query?: NextParsedUrlQuery,
    params?: Params | null
  ) {
    // @TODO
    return null
  }
}
