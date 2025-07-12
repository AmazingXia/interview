// webpack.config.js 代码分割基础配置示例

module.exports = {
  entry: {
    main: './src/index.js',
    // 可以有多个入口
  },
  output: {
    filename: '[name].[contenthash].js', // 利用 contenthash 做缓存优化
    path: __dirname + '/dist',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 对所有类型的 chunk 进行分割
      minSize: 20000, // 最小分割体积
      maxSize: 0,
      minChunks: 1, // 被引用次数
      maxAsyncRequests: 30, // 按需加载最大并行请求数
      maxInitialRequests: 30, // 入口文件最大并行请求数
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single', // 提取 runtime 代码
  },
  // 其他 loader 和 plugin 配置
};