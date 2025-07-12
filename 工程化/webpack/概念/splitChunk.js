    // webpack.config.js
    module.exports = {
      // ...
      optimization: {
        splitChunks: {
          chunks: 'all', // 对所有类型的 chunk 进行分割
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            commons: {
              name: 'commons',
              minChunks: 2, // 被至少两个 chunk 引用才会被提取
              priority: -10,
              reuseExistingChunk: true,
            },
          },
        },
      },
    };



    /**
     * splitChunks 优化项配置说明：
     *
     * 1. chunks: 指定对哪些 chunk 进行分割（'all'、'async'、'initial'）
     * 2. minSize: 生成 chunk 的最小体积（默认 20KB）
     * 3. minChunks: 被多少模块共享时才会被分割（默认 1）
     * 4. maxAsyncRequests: 按需加载时的最大并行请求数（默认 30）
     * 5. maxInitialRequests: 入口点的最大并行请求数（默认 30）
     * 6. automaticNameDelimiter: 自动生成名称的分隔符（默认 '~'）
     * 7. name: 是否自动命名 chunk（true/false/函数）
     * 8. cacheGroups: 自定义分包策略，按规则分组提取 chunk
     *
     * 分包策略（cacheGroups）常见用法：
     * - vendors: 提取第三方库（如 node_modules）
     * - commons: 提取多入口间共享模块
     * - async: 针对异步加载的模块分包
     * - custom: 按业务自定义分组（如 UI 组件、工具库等）
     *
     *
     *
     * splitChunks 的分包策略分为默认分包策略和自定义分包策略：
     *
     * 一、默认分包策略（不配置 cacheGroups 时）：
     *   - webpack 会自动将 node_modules 中的依赖提取到 vendors~xxx.js
     *   - 多入口间共享的模块会被提取到 commons~xxx.js
     *   - 只需简单配置即可：
     *     optimization: {
     *       splitChunks: {
     *         chunks: 'all'
     *       }
     *     }
     *
     * 二、自定义分包策略（配置 cacheGroups）：
     *   - 可以根据业务需求自定义分组规则，如下例：
     *
     *   optimization: {
     *     splitChunks: {
     *       chunks: 'all',
     *       cacheGroups: {
     *         vendors: {
     *           test: /[\\/]node_modules[\\/]/,
     *           name: 'vendors',
     *           chunks: 'all',
     *           priority: 10
     *         },
     *         reactBase: {
     *           test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
     *           name: 'react-base',
     *           chunks: 'all',
     *           priority: 20
     *         },
     *         commons: {
     *           name: 'commons',
     *           minChunks: 2,
     *           priority: -10,
     *           reuseExistingChunk: true
     *         }
     *       }
     *     }
     *   }
     *
     *   // 说明：
     *   // - vendors: 提取所有 node_modules 依赖
     *   // - reactBase: 单独提取 react/react-dom 相关依赖，优先级更高
     *   // - commons: 提取被多个 chunk 引用的公共模块
     *
     *   // 你可以根据业务需要继续添加 cacheGroups，比如 ui 组件、工具库等
     */
