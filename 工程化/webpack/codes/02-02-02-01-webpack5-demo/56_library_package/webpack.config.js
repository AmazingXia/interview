const path = require('path')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    filename: 'sy_utils.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'syUtil', 
    globalObject: 'this'
  }
}