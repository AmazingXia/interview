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
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:6].[ext]',
              // outputPath: 'img'
            }
          }
        ]
      }
    ]
  }
}
/**
 * [ext]: 扩展名
 * [name]: 文件名
 * [hash]: 文件内容
 * [contentHash]:
 * [hash:<length>]
 * [path]:
 */