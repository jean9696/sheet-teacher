const CircularDependencyPlugin = require('circular-dependency-plugin')
const { merge } = require('lodash')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const customConfig = require('./webpack.config')

module.exports = (defaultConfig) => {
  let config = merge({}, defaultConfig, customConfig)

  config.plugins.push(
    new CircularDependencyPlugin({
      onDetected({ paths, compilation }) {
        compilation.errors.push(new Error(paths.join(' -> ')))
      },
      exclude: /node_modules/,
    })
  )

  if (process.env.ANALYZE === '1') {
    config.plugins.push(new BundleAnalyzerPlugin())
  }

  if (process.env.BUNDLEWATCH) {
    config.output.filename = 'main.js'
    config.output.chunkFilename = '[name].[id].js'
  }

  config.optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
          drop_console: true,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
      parallel: 2,
      cache: true,
      sourceMap: true,
      extractComments: false,
    }),
  ]

  return config
}
