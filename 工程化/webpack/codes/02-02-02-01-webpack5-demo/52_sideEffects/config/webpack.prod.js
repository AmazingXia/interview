const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: false,
  optimization: {
    usedExports: true, // 标记不被使用的函数
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
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
    // new webpack.optimize.ModuleConcatenationPlugin()
  ]
}