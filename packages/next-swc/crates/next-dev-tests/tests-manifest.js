// Tests that are currently disabled with Turbopack in CI.
// Any tests not listed in here are assumed to be enabled.
const disabledTests = [
  // these are build specific
  'test/integration/auto-export-error-bail/test/index.test.js',
  'test/integration/auto-export-query-error/test/index.test.js',

  // these are build specific
  'test/integration/build-output/test/index.test.js',
  'test/integration/build-trace-extra-entries-turbo/test/index.test.js',
  'test/integration/build-trace-extra-entries/test/index.test.js',
  'test/integration/build-warnings/test/index.test.js',

  // next build specific
  'test/integration/config-schema-check/test/index.test.js',
  'test/integration/config-syntax-error/test/index.test.js',
  'test/integration/config-validation/test/index.test.ts',
  'test/integration/conflicting-ssg-paths/test/index.test.js',

  // these are already tested against turbopack explicitly in the suite
  'test/integration/create-next-app/index.test.ts',
  'test/integration/create-next-app/templates.test.ts',

  // next build specific
  'test/integration/critical-css/test/index.test.js',

  // custom-server isn't compatible with turbopack why is it here?
  'test/integration/custom-server-types/test/index.test.js',

  // Clean dist dir is a production only test should it be here?
  'test/integration/clean-distdir/test/index.test.js',

  // this is next build specific why is it here?
  'test/integration/dist-dir/test/index.test.js',

  // these are next build specific
  'test/integration/export-404/test/index.test.js',
  'test/integration/export-default-map/test/index.test.js',
  'test/integration/export-dynamic-pages/test/index.test.js',
  'test/integration/export-fallback-true-error/test/index.test.js',
  'test/integration/export-getInitialProps-warn/test/index.test.js',
  'test/integration/export-image-default/test/index.test.js',
  'test/integration/export-image-loader-legacy/test/index.test.js',
  'test/integration/export-image-loader/test/index.test.js',
  'test/integration/export-index-not-found-gsp/test/index.test.ts',
  'test/integration/export-intent/test/index.test.js',
  'test/integration/export-no-build/test/index.test.js',
  'test/integration/export-progress-status-message/test/index.test.js',
  'test/integration/export-subfolders/test/index.test.js',

  // build specific
  'test/integration/middleware-build-errors/test/index.test.js',
  'test/integration/webpack-require-hook/test/index.test.js',
  // this is next build and next export specific
  'test/integration/with-electron/test/index.test.js',
  'test/e2e/test-template/{{ toFileName name }}/{{ toFileName name }}.test.ts',

  'test/development/acceptance-app/app-hmr-changes.test.ts',
  'test/development/acceptance-app/component-stack.test.ts',
  'test/development/acceptance-app/editor-links.test.ts',
  'test/development/acceptance-app/error-message-url.test.ts',
  'test/development/acceptance-app/error-recovery.test.ts',
  'test/development/acceptance-app/hydration-error.test.ts',
  'test/development/acceptance-app/invalid-imports.test.ts',
  'test/development/acceptance-app/ReactRefresh.test.ts',
  'test/development/acceptance-app/ReactRefreshLogBox-builtins.test.ts',
  'test/development/acceptance-app/ReactRefreshLogBox-scss.test.ts',
  'test/development/acceptance-app/ReactRefreshLogBox.test.ts',
  'test/development/acceptance-app/ReactRefreshModule.test.ts',
  'test/development/acceptance-app/ReactRefreshRegression.test.ts',
  'test/development/acceptance-app/rsc-build-errors.test.ts',
  'test/development/acceptance-app/server-components.test.ts',
  'test/development/acceptance-app/version-staleness.test.ts',
  'test/development/acceptance/component-stack.test.ts',
  'test/development/acceptance/error-recovery.test.ts',
  'test/development/acceptance/hydration-error.test.ts',
  'test/development/acceptance/ReactRefreshLogBox-app-doc.test.ts',
  'test/development/acceptance/ReactRefreshLogBox-builtins.test.ts',
  'test/development/acceptance/ReactRefreshLogBox.test.ts',
  'test/development/acceptance/ReactRefreshModule.test.ts',
  'test/development/acceptance/ReactRefreshRegression.test.ts',
  'test/development/acceptance/ReactRefreshRequire.test.ts',
  'test/development/acceptance/server-component-compiler-errors-in-pages.test.ts',
  'test/development/api-route-errors/index.test.ts',
  'test/development/app-render-error-log/app-render-error-log.test.ts',
  'test/development/basic/gssp-ssr-change-reloading/test/index.test.ts',
  'test/development/basic/hmr.test.ts',
  'test/development/basic/misc.test.ts',
  'test/development/basic/next-dynamic.test.ts',
  'test/development/basic/node-builtins.test.ts',
  'test/development/basic/project-directory-rename.test.ts',
  'test/development/basic/styled-components.test.ts',
  'test/development/client-dev-overlay/index.test.ts',
  'test/development/correct-tsconfig-defaults/index.test.ts',
  'test/development/gssp-notfound/index.test.ts',
  'test/development/next-font/build-errors.test.ts',
  'test/development/next-font/deprecated-package.test.ts',
  'test/development/next-font/font-loader-in-document-error.test.ts',

  // below test times out
  'test/development/repeated-dev-edits/repeated-dev-edits.test.ts',

  'test/development/watch-config-file/index.test.ts',
  'test/development/webpack-issuer-deprecation-warning/index.test.ts',
  'test/e2e/404-page-router/index.test.ts',
  'test/e2e/app-dir-legacy-edge-runtime-config/index.test.ts',
  'test/e2e/app-dir/actions/app-action.test.ts',
  'test/e2e/app-dir/app-a11y/index.test.ts',
  'test/e2e/app-dir/app-basepath/index.test.ts',
  'test/e2e/app-dir/app-css/index.test.ts',
  'test/e2e/app-dir/app-edge/app-edge.test.ts',
  'test/e2e/app-dir/app-middleware/app-middleware.test.ts',
  'test/e2e/app-dir/app-rendering/rendering.test.ts',
  'test/e2e/app-dir/app-routes-trailing-slash/app-routes-trailing-slash.test.ts',
  'test/e2e/app-dir/app-routes/app-custom-routes.test.ts',
  'test/e2e/app-dir/app-static/app-static-custom-handler.test.ts',
  'test/e2e/app-dir/app-static/app-static.test.ts',
  'test/e2e/app-dir/app/index.test.ts',
  'test/e2e/app-dir/create-root-layout/create-root-layout.test.ts',
  'test/e2e/app-dir/crypto-globally-available/crypto-globally-available.test.ts',
  'test/e2e/app-dir/draft-mode/draft-mode-edge.test.ts',
  'test/e2e/app-dir/draft-mode/draft-mode-node.test.ts',
  'test/e2e/app-dir/dynamic-href/dynamic-href.test.ts',
  'test/e2e/app-dir/edge-runtime-node-compatibility/edge-runtime-node-compatibility.test.ts',
  'test/e2e/app-dir/error-boundary-and-not-found-linking/error-boundary-and-not-found-linking.test.ts',
  'test/e2e/app-dir/front-redirect-issue/front-redirect-issue.test.ts',
  'test/e2e/app-dir/hooks/hooks.test.ts',
  'test/e2e/app-dir/i18n-hybrid/i18n-hybrid.test.js',
  'test/e2e/app-dir/interception-middleware-rewrite/interception-middleware-rewrite.test.ts',
  'test/e2e/app-dir/mdx/mdx.test.ts',
  'test/e2e/app-dir/metadata-dynamic-routes/index.test.ts',
  'test/e2e/app-dir/metadata/metadata.test.ts',
  'test/e2e/app-dir/next-font/next-font.test.ts',
  'test/e2e/app-dir/next-image/next-image.test.ts',
  'test/e2e/app-dir/pages-to-app-routing/pages-to-app-routing.test.ts',
  'test/e2e/app-dir/parallel-routes-and-interception/parallel-routes-and-interception.test.ts',
  'test/e2e/app-dir/parallel-routes-not-found/parallel-routes-not-found.test.ts',
  'test/e2e/app-dir/root-layout-redirect/root-layout-redirect.test.ts',
  'test/e2e/app-dir/root-layout/root-layout.test.ts',
  'test/e2e/app-dir/rsc-basic/rsc-basic.test.ts',
  'test/e2e/app-dir/set-cookies/set-cookies.test.ts',
  'test/e2e/app-dir/trailingslash/trailingslash.test.ts',
  'test/e2e/app-dir/with-babel/with-babel.test.ts',
  'test/e2e/basepath-trailing-slash.test.ts',
  'test/e2e/basepath.test.ts',
  'test/e2e/browserslist/browserslist.test.ts',
  'test/e2e/browserslist/legacybrowsers-false.test.ts',
  'test/e2e/browserslist/legacybrowsers-true.test.ts',
  'test/e2e/edge-can-read-request-body/index.test.ts',
  'test/e2e/edge-can-use-wasm-files/index.test.ts',
  'test/e2e/edge-compiler-can-import-blob-assets/index.test.ts',
  'test/e2e/edge-configurable-runtime/index.test.ts',
  'test/e2e/edge-pages-support/index.test.ts',
  'test/e2e/fetch-failures-have-good-stack-traces-in-edge-runtime/fetch-failures-have-good-stack-traces-in-edge-runtime.test.ts',
  'test/e2e/getserversideprops/test/index.test.ts',
  'test/e2e/i18n-api-support/index.test.ts',
  'test/e2e/i18n-data-fetching-redirect/index.test.ts',
  'test/e2e/i18n-default-locale-redirect/i18n-default-locale-redirect.test.ts',
  'test/e2e/i18n-disallow-multiple-locales/i18n-disallow-multiple-locales.test.ts',
  'test/e2e/i18n-ignore-redirect-source-locale/redirects-with-basepath.test.ts',
  'test/e2e/i18n-ignore-redirect-source-locale/redirects.test.ts',
  'test/e2e/i18n-ignore-rewrite-source-locale/rewrites-with-basepath.test.ts',
  'test/e2e/i18n-ignore-rewrite-source-locale/rewrites.test.ts',
  'test/e2e/ignore-invalid-popstateevent/with-i18n.test.ts',
  'test/e2e/instrumentation-hook-src/instrumentation-hook-src.test.ts',
  'test/e2e/instrumentation-hook/instrumentation-hook.test.ts',
  'test/e2e/manual-client-base-path/index.test.ts',
  'test/e2e/middleware-custom-matchers-basepath/test/index.test.ts',
  'test/e2e/middleware-custom-matchers-i18n/test/index.test.ts',
  'test/e2e/middleware-custom-matchers/test/index.test.ts',
  'test/e2e/middleware-dynamic-basepath-matcher/test/index.test.ts',
  'test/e2e/middleware-fetches-with-any-http-method/index.test.ts',
  'test/e2e/middleware-fetches-with-body/index.test.ts',
  'test/e2e/middleware-matcher/index.test.ts',
  'test/e2e/middleware-redirects/test/index.test.ts',
  'test/e2e/middleware-request-header-overrides/test/index.test.ts',
  'test/e2e/middleware-rewrites/test/index.test.ts',
  'test/e2e/middleware-trailing-slash/test/index.test.ts',
  'test/e2e/next-font/basepath.test.ts',
  'test/e2e/next-font/google-fetch-error.test.ts',
  'test/e2e/next-font/index.test.ts',
  'test/e2e/next-font/with-font-declarations-file.test.ts',
  'test/e2e/next-font/with-proxy.test.ts',
  'test/e2e/next-font/without-preloaded-fonts.test.ts',
  'test/e2e/next-head/index.test.ts',
  'test/e2e/next-script/index.test.ts',
  'test/e2e/og-api/index.test.ts',
  'test/e2e/opentelemetry/opentelemetry.test.ts',
  'test/e2e/prerender-crawler.test.ts',
  'test/e2e/prerender.test.ts',
  'test/e2e/reload-scroll-backforward-restoration/index.test.ts',
  'test/e2e/skip-trailing-slash-redirect/index.test.ts',
  'test/e2e/streaming-ssr/index.test.ts',
  'test/e2e/swc-warnings/index.test.ts',
  'test/e2e/switchable-runtime/index.test.ts',
  'test/examples/examples.test.ts',
  'test/integration/404-page/test/index.test.js',
  'test/integration/500-page/test/index.test.js',
  'test/integration/amphtml-ssg/test/index.test.js',
  'test/integration/amphtml/test/index.test.js',
  'test/integration/api-support/test/index.test.js',
  'test/integration/app-dir-export/test/dynamicapiroute-dev.test.ts',
  'test/integration/app-dir-export/test/dynamicpage-dev.test.ts',
  'test/integration/app-dir-export/test/trailing-slash-dev.test.ts',
  'test/integration/app-document-add-hmr/test/index.test.js',
  'test/integration/app-document-import-order/test/index.test.js',
  'test/integration/app-document-remove-hmr/test/index.test.js',
  'test/integration/app-document/test/index.test.js',
  'test/integration/async-modules/test/index.test.js',
  'test/integration/auto-export/test/index.test.js',
  'test/integration/babel/test/index.test.js',
  'test/integration/basepath-root-catch-all/test/index.test.js',
  'test/integration/broken-webpack-plugin/test/index.test.js',
  'test/integration/build-indicator/test/index.test.js',
  'test/integration/build-spinners/index.test.ts',
  'test/integration/cli/test/index.test.js',
  'test/integration/client-navigation/test/index.test.js',
  'test/integration/compression/test/index.test.js',
  'test/integration/config-devtool-dev/test/index.test.js',
  'test/integration/config-mjs/test/index.test.js',
  'test/integration/config-output-export/test/index.test.ts',
  'test/integration/config/test/index.test.js',
  'test/integration/conflicting-app-page-error/test/index.test.js',
  'test/integration/conflicting-public-file-page/test/index.test.js',
  'test/integration/css/test/group-2.test.js',
  'test/integration/custom-error/test/index.test.js',
  'test/integration/custom-page-extension/test/index.test.js',
  'test/integration/custom-routes-catchall/test/index.test.js',
  'test/integration/custom-routes-i18n-index-redirect/test/index.test.js',
  'test/integration/custom-routes-i18n/test/index.test.js',
  'test/integration/custom-routes/test/index.test.js',
  'test/integration/custom-server/test/index.test.js',
  'test/integration/data-fetching-errors/test/index.test.js',
  'test/integration/development-runtime-config/test/index.test.js',
  'test/integration/draft-mode/test/index.test.ts',
  'test/integration/dynamic-optional-routing-root-fallback/test/index.test.js',
  'test/integration/dynamic-optional-routing-root-static-paths/test/index.test.js',
  'test/integration/dynamic-optional-routing/test/index.test.js',
  'test/integration/dynamic-routing/test/index.test.js',
  'test/integration/dynamic-routing/test/middleware.test.js',
  'test/integration/edge-runtime-configurable-guards/test/index.test.js',
  'test/integration/edge-runtime-dynamic-code/test/index.test.js',
  'test/integration/edge-runtime-module-errors/test/index.test.js',
  'test/integration/edge-runtime-response-error/test/index.test.js',
  'test/integration/edge-runtime-streaming-error/test/index.test.ts',
  'test/integration/edge-runtime-with-node.js-apis/test/index.test.ts',
  'test/integration/empty-project/test/index.test.js',
  'test/integration/env-config/test/index.test.js',
  'test/integration/fallback-false-rewrite/test/index.test.js',
  'test/integration/fallback-route-params/test/index.test.js',
  'test/integration/file-serving/test/index.test.js',
  'test/integration/getinitialprops/test/index.test.js',
  'test/integration/getserversideprops-preview/test/index.test.js',
  'test/integration/gssp-redirect-base-path/test/index.test.js',
  'test/integration/gssp-redirect-with-rewrites/test/index.test.js',
  'test/integration/gssp-redirect/test/index.test.js',
  'test/integration/i18n-support-base-path/test/index.test.js',
  'test/integration/i18n-support-catchall/test/index.test.js',
  'test/integration/i18n-support-custom-error/test/index.test.js',
  'test/integration/i18n-support-fallback-rewrite-legacy/test/index.test.js',
  'test/integration/i18n-support-fallback-rewrite/test/index.test.js',
  'test/integration/i18n-support-index-rewrite/test/index.test.js',
  'test/integration/i18n-support-same-page-hash-change/test/index.test.js',
  'test/integration/i18n-support/test/index.test.js',
  'test/integration/image-optimizer/test/content-disposition-type.test.ts',
  'test/integration/image-optimizer/test/index.test.ts',
  'test/integration/image-optimizer/test/minimum-cache-ttl.test.ts',
  'test/integration/image-optimizer/test/sharp.test.ts',
  'test/integration/image-optimizer/test/squoosh.test.ts',
  'test/integration/import-assertion/test/index.test.js',
  'test/integration/invalid-custom-routes/test/index.test.js',
  'test/integration/invalid-middleware-matchers/test/index.test.js',
  'test/integration/invalid-multi-match/test/index.test.js',
  'test/integration/jsconfig-baseurl/test/index.test.js',
  'test/integration/jsconfig-paths/test/index.test.js',
  'test/integration/link-with-encoding/test/index.test.js',
  'test/integration/middleware-dev-errors/test/index.test.js',
  'test/integration/middleware-dev-update/test/index.test.js',
  'test/integration/next-dynamic-lazy-compilation/test/index.test.js',
  'test/integration/next-image-legacy/asset-prefix/test/index.test.ts',
  'test/integration/next-image-legacy/base-path/test/index.test.ts',
  'test/integration/next-image-legacy/base-path/test/static.test.ts',
  'test/integration/next-image-legacy/default/test/index.test.ts',
  'test/integration/next-image-legacy/image-from-node-modules/test/index.test.ts',
  'test/integration/next-image-legacy/svgo-webpack/test/index.test.ts',
  'test/integration/next-image-legacy/trailing-slash/test/index.test.ts',
  'test/integration/next-image-legacy/typescript/test/index.test.ts',
  'test/integration/next-image-legacy/unicode/test/index.test.ts',
  'test/integration/next-image-new/app-dir/test/index.test.ts',
  'test/integration/next-image-new/app-dir/test/static.test.ts',
  'test/integration/next-image-new/asset-prefix/test/index.test.js',
  'test/integration/next-image-new/base-path/test/index.test.js',
  'test/integration/next-image-new/base-path/test/static.test.js',
  'test/integration/next-image-new/both-basepath-trailingslash/test/index.test.ts',
  'test/integration/next-image-new/default/test/index.test.ts',
  'test/integration/next-image-new/default/test/static.test.ts',
  'test/integration/next-image-new/export-config/test/index.test.ts',
  'test/integration/next-image-new/image-from-node-modules/test/index.test.ts',
  'test/integration/next-image-new/invalid-image-import/test/index.test.ts',
  'test/integration/next-image-new/loader-config-edge-runtime/test/index.test.ts',
  'test/integration/next-image-new/loader-config/test/index.test.ts',
  'test/integration/next-image-new/svgo-webpack/test/index.test.ts',
  'test/integration/next-image-new/typescript/test/index.test.ts',
  'test/integration/next-image-new/unicode/test/index.test.ts',
  'test/integration/no-duplicate-compile-error/test/index.test.js',
  'test/integration/no-override-next-props/test/index.test.js',
  'test/integration/node-fetch-keep-alive/test/index.test.js',
  'test/integration/nullish-config/test/index.test.js',
  'test/integration/prerender-fallback-encoding/test/index.test.js',
  'test/integration/prerender-preview/test/index.test.js',
  'test/integration/preview-fallback/test/index.test.js',
  'test/integration/process-env-stub/test/index.test.js',
  'test/integration/project-dir-delete/index.test.ts',
  'test/integration/react-18/test/index.test.js',
  'test/integration/relay-graphql-swc-multi-project/test/index.test.js',
  'test/integration/repeated-slashes/test/index.test.js',
  'test/integration/rewrite-with-browser-history/test/index.test.js',
  'test/integration/rewrites-client-resolving/test/index.test.js',
  'test/integration/rewrites-has-condition/test/index.test.js',
  'test/integration/rewrites-manual-href-as/test/index.test.js',
  'test/integration/route-index/test/index.test.js',
  'test/integration/script-loader/test/index.test.js',
  'test/integration/scroll-back-restoration/test/index.test.js',
  'test/integration/scroll-forward-restoration/test/index.test.js',
  'test/integration/server-asset-modules/test/index.test.js',
  'test/integration/server-side-dev-errors/test/index.test.js',
  'test/integration/telemetry/test/config.test.js',
  'test/integration/telemetry/test/index.test.js',
  'test/integration/telemetry/test/page-features.test.js',
  'test/integration/trailing-slash-dist/test/index.test.js',
  'test/integration/trailing-slashes-rewrite/test/index.test.js',
  'test/integration/trailing-slashes/test/index.test.js',
  'test/integration/turbopack-unsupported-log/index.test.ts',
  'test/integration/typescript-app-type-declarations/test/index.test.js',
  'test/integration/typescript-hmr/test/index.test.js',
  'test/integration/typescript-only-remove-type-imports/test/index.test.js',
  'test/integration/typescript-paths/test/index.test.js',
  'test/integration/typescript-version-warning/test/index.test.js',
  'test/integration/typescript-workspaces-paths/packages/www/test/index.test.js',
  'test/integration/typescript/test/index.test.js',
  'test/integration/undefined-webpack-config/test/index.test.js',
  'test/integration/url-imports/test/index.test.js',
  'test/integration/url/test/index.test.js',
  'test/integration/with-router/test/index.test.js',
  'test/integration/worker-webpack5/test/index.test.js',
  'test/production/app-dir-edge-runtime-with-wasm/index.test.ts',
  'test/production/app-dir-hide-suppressed-error-during-next-export/index.test.ts',
  'test/production/app-dir-prefetch-non-iso-url/index.test.ts',
  'test/production/app-dir/app-only-flag/app-only-flag.test.ts',
  'test/production/app-dir/revalidate/revalidate.test.ts',
  'test/production/ci-missing-typescript-deps/index.test.ts',
  'test/production/custom-error-500/index.test.ts',
  'test/production/custom-server/custom-server.test.ts',
  'test/production/dependencies-can-use-env-vars-in-middlewares/index.test.ts',
  'test/production/disable-fallback-polyfills/index.test.ts',
  'test/production/edge-config-validations/index.test.ts',
  'test/production/edge-runtime-is-addressable/index.test.ts',
  'test/production/emit-decorator-metadata/index.test.ts',
  'test/production/enoent-during-require/index.test.ts',
  'test/production/escheck-output/index.test.ts',
  'test/production/eslint-plugin-deps/index.test.ts',
  'test/production/export/index.test.ts',
  'test/production/exported-runtimes-value-validation/index.test.ts',
  'test/production/fallback-export-error/index.test.ts',
  'test/production/fatal-render-errror/index.test.ts',
  'test/production/generate-middleware-source-maps/index.test.ts',
  'test/production/jest/index.test.ts',
  'test/production/jest/new-link-behavior.test.ts',
  'test/production/jest/relay/relay-jest.test.ts',
  'test/production/jest/remove-react-properties/remove-react-properties-jest.test.ts',
  'test/production/jest/transpile-packages.test.ts',
  'test/production/middleware-environment-variables-in-node-server-reflect-the-usage-inference/index.test.ts',
  'test/production/middleware-typescript/test/index.test.ts',
  'test/production/next-font/babel-unsupported.test.ts',
  'test/production/next-font/telemetry-old.test.ts',
  'test/production/next-font/telemetry.test.ts',
  'test/production/pnpm-support/index.test.ts',
  'test/production/postcss-plugin-config-as-string/index.test.ts',
  'test/production/prerender-prefetch/index.test.ts',
  'test/production/reading-request-body-in-middleware/index.test.ts',
  'test/production/standalone-mode/metadata/index.test.ts',
  'test/production/standalone-mode/optimizecss/index.test.ts',
  'test/production/standalone-mode/required-server-files/required-server-files-app.test.ts',
  'test/production/standalone-mode/required-server-files/required-server-files-i18n.test.ts',
  'test/production/standalone-mode/required-server-files/required-server-files.test.ts',
  'test/production/standalone-mode/response-cache/index.test.ts',
  'test/production/standalone-mode/type-module/index.test.ts',
  'test/production/supports-module-resolution-nodenext/supports-moduleresolution-nodenext.test.ts',
  'test/production/typescript-basic/index.test.ts',
  'test/unit/accept-headers.test.ts',
  'test/unit/babel-plugin-next-page-config.test.ts',
  'test/unit/babel-plugin-next-ssg-transform.test.ts',
  'test/unit/cli.test.ts',
  'test/unit/cssnano-simple/cssnano-preset-simple/issue-1.test.ts',
  'test/unit/cssnano-simple/cssnano-preset-simple/plugin-config.test.ts',
  'test/unit/cssnano-simple/cssnano-preset-simple/property-sorting.test.ts',
  'test/unit/cssnano-simple/cssnano-simple/basic.test.ts',
  'test/unit/cssnano-simple/cssnano-simple/exclude-all.test.ts',
  'test/unit/cssnano-simple/cssnano-simple/plugin-config.test.ts',
  'test/unit/eslint-plugin-next/google-font-display.test.ts',
  'test/unit/eslint-plugin-next/google-font-preconnect.test.ts',
  'test/unit/eslint-plugin-next/index.test.ts',
  'test/unit/eslint-plugin-next/inline-script-id.test.ts',
  'test/unit/eslint-plugin-next/next-script-for-ga.test.ts',
  'test/unit/eslint-plugin-next/no-assign-module-variable.test.ts',
  'test/unit/eslint-plugin-next/no-before-interactive-script-outside-document.test.ts',
  'test/unit/eslint-plugin-next/no-css-tags.test.ts',
  'test/unit/eslint-plugin-next/no-document-import-in-page.test.ts',
  'test/unit/eslint-plugin-next/no-duplicate-head.test.ts',
  'test/unit/eslint-plugin-next/no-head-element.test.ts',
  'test/unit/eslint-plugin-next/no-head-import-in-document.test.ts',
  'test/unit/eslint-plugin-next/no-html-link-for-pages.test.ts',
  'test/unit/eslint-plugin-next/no-img-element.test.ts',
  'test/unit/eslint-plugin-next/no-page-custom-font.test.ts',
  'test/unit/eslint-plugin-next/no-script-component-in-head.test.ts',
  'test/unit/eslint-plugin-next/no-styled-jsx-in-document.test.ts',
  'test/unit/eslint-plugin-next/no-sync-scripts.test.ts',
  'test/unit/eslint-plugin-next/no-title-in-document-head.test.ts',
  'test/unit/eslint-plugin-next/no-typos.test.ts',
  'test/unit/eslint-plugin-next/no-unwanted-polyfillio.test.ts',
  'test/unit/esm-interpolate/esm-interpolate.test.tsx',
  'test/unit/find-config.test.ts',
  'test/unit/find-page-file.test.ts',
  'test/unit/get-module-build-info.test.ts',
  'test/unit/get-node-options-without-inspect.test.ts',
  'test/unit/get-page-static-infos.test.ts',
  'test/unit/get-project-dir.test.ts',
  'test/unit/getDisplayName.test.ts',
  'test/unit/htmlescape.test.ts',
  'test/unit/image-optimizer/detect-content-type.test.ts',
  'test/unit/image-optimizer/get-max-age.test.ts',
  'test/unit/image-optimizer/match-remote-pattern.test.ts',
  'test/unit/incremental-cache/file-system-cache.test.ts',
  'test/unit/infer-get-server-side-props-type.test.ts',
  'test/unit/infer-get-static-props.test.ts',
  'test/unit/is-equal-node.unit.test.ts',
  'test/unit/is-serializable-props.test.ts',
  'test/unit/isolated/config.test.ts',
  'test/unit/isolated/require-page.test.ts',
  'test/unit/jest-next-swc.test.ts',
  'test/unit/link-rendering.test.ts',
  'test/unit/link-warnings.test.tsx',
  'test/unit/loadGetInitialProps.test.ts',
  'test/unit/mitt.test.ts',
  'test/unit/next-babel-loader-dev.test.ts',
  'test/unit/next-babel-loader-prod.test.ts',
  'test/unit/next-babel.test.ts',
  'test/unit/next-dynamic.test.tsx',
  'test/unit/next-head-rendering.test.ts',
  'test/unit/next-image-legacy.test.ts',
  'test/unit/next-image-new.test.ts',
  'test/unit/next-server-utils.test.ts',
  'test/unit/next-swc.test.ts',
  'test/unit/oxford-comma.test.ts',
  'test/unit/page-route-sorter.test.ts',
  'test/unit/parse-page-static-info.test.ts',
  'test/unit/parse-relative-url.test.ts',
  'test/unit/phaseConstants.test.ts',
  'test/unit/preserve-process-env.test.ts',
  'test/unit/recursive-copy.test.ts',
  'test/unit/recursive-delete.test.ts',
  'test/unit/recursive-readdir.test.ts',
  'test/unit/router-add-base-path.test.ts',
  'test/unit/split-cookies-string.test.ts',
  'test/unit/validate-url.test.ts',
  'test/unit/warn-removed-experimental-config.test.ts',
  'test/unit/web-runtime/next-response-cookies.test.ts',
  'test/unit/web-runtime/next-response.test.ts',
  'test/unit/web-runtime/next-server-node.test.ts',
  'test/unit/web-runtime/next-url.test.ts',
  'test/unit/web-runtime/user-agent.test.ts',
  'test/unit/webpack-config-overrides.test.ts',
  'test/unit/write-app-declarations.test.ts',
]

module.exports = {
  disabledTests,
}
