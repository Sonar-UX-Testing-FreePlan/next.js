import loaderUtils from 'loader-utils'
import path from 'path'
import webpack from 'webpack'

export function getCssModuleLocalIdent(
  context: webpack.loader.LoaderContext,
  _: any,
  exportName: string,
  options: object
) {
  const relativePath = path
    .relative(context.rootContext, context.resourcePath)
    .replace(/\\+/g, '/')

  // Generate a more meaningful name (parent folder) when the user names the
  // file `index.module.css`.
  const fileNameOrFolder =
    (relativePath.endsWith('index.module.css') ||
      relativePath.endsWith('index.module.scss') ||
      relativePath.endsWith('index.module.sass')) &&
    relativePath !== 'pages/index.module.css' &&
      relativePath !== 'pages/index.module.scss' &&
      relativePath !== 'pages/index.module.sass'
      ? '[folder]'
      : '[name]'

  // Generate a hash to make the class name unique.
  const hash = loaderUtils.getHashDigest(
    Buffer.from(`filePath:${relativePath}#className:${exportName}`),
    'md5',
    'base64',
    5
  )

  // Have webpack interpolate the `[folder]` or `[name]` to its real value.
  return loaderUtils
    .interpolateName(
      context,
      fileNameOrFolder + '_' + exportName + '__' + hash,
      options
    )
    .replace(
      // Webpack name interpolation returns `about.module_root__2oFM9` for
      // `.root {}` inside a file named `about.module.css`. Let's simplify
      // this.
      /\.module_/,
      '_'
    )
}
