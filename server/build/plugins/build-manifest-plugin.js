// @flow
import { RawSource } from 'webpack-sources'
import { MATCH_ROUTE_NAME } from '../../utils'
import {BUILD_MANIFEST} from '../../../lib/constants'

// This plugin creates a build-manifest.json for all assets that are being output
// It has a mapping of "entry" filename to real filename. Because the real filename can be hashed in production
export default class BuildManifestPlugin {
  apply (compiler: any) {
    compiler.plugin('emit', (compilation, callback) => {
      const {chunks} = compilation
      const assetMap = {pages: {}, css: []}

      for (const chunk of chunks) {
        if (!chunk.name || !chunk.files) {
          continue
        }

        let pageFile
        const files = []

        for (const file of chunk.files) {
          if (/\.map$/.test(file)) {
            continue
          }

          if (/\.hot-update\.js$/.test(file)) {
            continue
          }

          if (MATCH_ROUTE_NAME.exec(file)) {
            pageFile = file
            continue
          }

          if (/\.css$/.exec(file)) {
            assetMap.css.push(file)
          }

          files.push(file)
        }

        const result = MATCH_ROUTE_NAME.exec(chunk.name)
        if (result) {
          let pagePath = result[1]
          if (pagePath === 'index') {
            pagePath = ''
          }
          const page = `/${pagePath.replace(/\\/g, '/')}`
          assetMap.pages[page] = {pageFile, files}
          continue
        }

        if (files.length > 0) {
          assetMap[chunk.name] = files
        }
      }

      compilation.assets[BUILD_MANIFEST] = new RawSource(JSON.stringify(assetMap))
      callback()
    })
  }
}
