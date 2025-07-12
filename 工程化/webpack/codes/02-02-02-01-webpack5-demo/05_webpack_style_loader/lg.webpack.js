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
        use: ['style-loader', 'css-loader'], // style-loader 用于将 CSS 插入到 DOM 中，css-loader 用于解析 CSS 文件
        // loader执行顺序是从后往前执行的，所以这里先执行 css-loader 再执行 style-loader
        // 这样可以先解析 CSS 文件中的内容，然后将解析后的内容插入到
      }
    ]
  }
}