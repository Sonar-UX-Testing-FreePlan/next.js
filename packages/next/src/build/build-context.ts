import type { LoadedEnvFiles } from '@next/env'
import type { Ora } from 'next/dist/compiled/ora'
import type { Rewrite, Redirect } from '../lib/load-custom-routes'
import type { __ApiPreviewProps } from '../server/api-utils'
import type { NextConfigComplete } from '../server/config-shared'
import type { Span } from '../trace'
import type getBaseWebpackConfig from './webpack-config'
import type { PagesManifest } from './webpack/plugins/pages-manifest-plugin'
import type { TelemetryPlugin } from './webpack/plugins/telemetry-plugin'

// A layer for storing data that is used by plugins to communicate with each
// other between different steps of the build process. This is only internal
// to Next.js and will not be a part of the final build output.
let pluginState: Record<string, any> = {}
export function resumePluginState(resumedState?: Record<string, any>) {
  pluginState = resumedState || {}
}
// This method gives you the plugin state with typed and mutable value fields.
export function getPluginStateAsStructure<
  Structure extends Record<string, any>
>() {
  return pluginState as Structure
}

// a global object to store context for the current build
// this is used to pass data between different steps of the build without having
// to pass it through function arguments.
// Not exhaustive, but should be extended to as needed whilst refactoring
export const NextBuildContext: Partial<{
  compilerIdx?: number
  pluginState: Record<string, any>
  serializedPagesManifestEntries: {
    edgeServerPages?: PagesManifest
    nodeServerPages?: PagesManifest
    edgeServerAppPaths?: PagesManifest
    nodeServerAppPaths?: PagesManifest
  }
  // core fields
  dir: string
  buildId: string
  config: NextConfigComplete
  appDir: string
  pagesDir: string
  rewrites: {
    fallback: Rewrite[]
    afterFiles: Rewrite[]
    beforeFiles: Rewrite[]
  }
  originalRewrites: {
    fallback: Rewrite[]
    afterFiles: Rewrite[]
    beforeFiles: Rewrite[]
  }
  originalRedirects: Redirect[]
  loadedEnvFiles: LoadedEnvFiles
  previewProps: __ApiPreviewProps
  mappedPages:
    | {
        [page: string]: string
      }
    | undefined
  mappedAppPages:
    | {
        [page: string]: string
      }
    | undefined
  mappedRootPaths: {
    [page: string]: string
  }
  hasInstrumentationHook: boolean

  // misc fields
  telemetryPlugin: TelemetryPlugin
  buildSpinner: Ora
  nextBuildSpan: Span

  // cli fields
  reactProductionProfiling: boolean
  noMangling: boolean
  appDirOnly: boolean
  clientRouterFilters: Parameters<
    typeof getBaseWebpackConfig
  >[1]['clientRouterFilters']
}> = {}
