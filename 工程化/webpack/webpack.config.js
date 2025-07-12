const path = require('path')

module.exports = {
  entry: './src/index.js', // 入口文件 可以使用相对路径或绝对路径
  mode: 'development', // 模式，development 或 production
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  }
}