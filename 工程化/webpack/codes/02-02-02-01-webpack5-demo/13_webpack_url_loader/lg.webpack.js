const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[hash:6].[ext]',
              limit: 25 * 1024
            }
          }
        ]
      }
    ]
  }
}
/**
 * 01 url-loader base64 uri 文件当中，减少请求次数
 * 02 file-loader 将资源拷贝至指定的目录，分开请求
 * 03 url-loader 内部其实也可以调用 file-loader
 * 04 limit
 *
 */