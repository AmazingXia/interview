const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin')
const resolveApp = require('./paths')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true, // 标记不被使用的函数
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolveApp('./src')}/**/*`, { nodir: true }),
      safelist: function () {
        return {
          standard: ['body', 'html', 'ef']
        }
      }
    }),
    new CompressionPlugin({
      test: /\.(css|js)$/,
      minRatio: 0.8,
      threshold: 0,
      algorithm: 'gzip'
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js/])
  ]
}