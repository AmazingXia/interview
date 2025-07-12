const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin");

// 导入其它的配置
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

// 定义对象保存 base 配置信息
const commonConfig = {
  entry: {
    index: './src/index.js'
  },
  resolve: {
    extensions: [".js", ".json", '.ts', '.jsx', '.vue'],
    alias: {
      '@': resolveApp('./src')
    }
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: resolveApp('./dist'),
    chunkFilename: 'js/chunk_[name].js'
  },
  optimization: {
    // 当前文件的名称是按自然数进行编号排序，如果某个文件当前次不再被依赖那么重新打包时序号都会变
    chunkIds: 'deterministic',
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ]
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
        type: 'asset',
        generator: {
          filename: "img/[name].[hash:4][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024
          }
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:3][ext]'
        }
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'copyWebpackPlugin',
      template: './public/index.html'
    })
  ]
}

module.exports = (env) => {
  const isProduction = env.production

  process.env.NODE_ENV = isProduction ? 'production' : 'development'

  // 依据当前的打包模式来合并配置
  const config = isProduction ? prodConfig : devConfig

  const mergeConfig = merge(commonConfig, config)

  return mergeConfig
}