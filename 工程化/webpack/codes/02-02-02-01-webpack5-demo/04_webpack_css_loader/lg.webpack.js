const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/, // 一般就是一个正则表达式，用于匹配我们需要处理的文件类型
      //   use: [  // 一个文件可以经过多个 loader 处理,所以 use 是一个数组
      //     {
      //       loader: 'css-loader' // css-loader 是一个处理 CSS 文件的 loader 只会处理css文件里面的background-url等 但是不会把处理后的结果写入到文件中  需要使用style-loader
      //       // options: {
                // query
      //         importLoaders: 1 // 这个配置是告诉 css-loader 在处理 CSS 文件时，应该在处理完 CSS 后再去处理其他的 loader
      //         // 例如，如果我们使用了 postcss-loader，那么这个配置就会告诉
      //     }
      //   ]
      // },

      // 以上有两种简写方式, 没有配置项的时候可以简写
      // {
      //   test: /\.css$/,
      //   loader: 'css-loader'
      // },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  }
}