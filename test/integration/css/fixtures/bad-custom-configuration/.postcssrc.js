module.exports = {
  sourceMap: false,
  plugins: {
    'postcss-modules-extract-imports': {},
    'postcss-modules-local-by-default': {},
    'postcss-modules-scope': {},
    'postcss-modules-values': {},
    'postcss-modules': {},

    // Test a non-standard feature that wouldn't be normally enabled
    'postcss-short-size': {},
  },
}
