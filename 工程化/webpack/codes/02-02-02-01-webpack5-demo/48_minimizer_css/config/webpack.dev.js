const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  devServer: {
    hot: true,
    hotOnly: true,
    port: 4000,
    open: false,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: { "^/api": "" },
        changeOrigin: true
      }
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
}