const path = require('path')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'nosources-source-map',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'web',
  devServer: {
    hot: true,
    port: 4000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.ts$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'copyWebpackPlugin',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    })
  ]
}

// source-map  cheap-module-source-map