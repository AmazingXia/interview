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
    index: './src/index.js',
    main: './src/main.js'
  },
  resolve: {
    extensions: [".js", ".json", '.ts', '.jsx', '.vue'],
    alias: {
      '@': resolveApp('./src')
    }
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: resolveApp('./dist')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'initial',  // async initial all
      minSize: 20000,
      maxSize: 20000,
      minChunks: 1,
      cacheGroups: {
        syVendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'js/[id]_vendor.js',
          priority: -10,
        },
        default: {
          minChunks: 2,
          filename: 'js/syy_[id].js',
          priority: -20,
        }
      }
    }
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