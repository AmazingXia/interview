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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}


//  less /src/css/login.less  index.css   less命令可以把less文件编译成css文件
//  less-loader 内部会调用 less 命令来编译 less 文件
//  所以安装 less-loader 还需要安装 less
//  npm install less-loader less -D

// "devDependencies": {
//   "css-loader": "^6.2.0",
//   "less": "^4.1.1",
//   "less-loader": "^10.0.1",
//   "style-loader": "^3.2.1",
//   "webpack": "^5.47.1",
//   "webpack-cli": "^4.7.2"
// }