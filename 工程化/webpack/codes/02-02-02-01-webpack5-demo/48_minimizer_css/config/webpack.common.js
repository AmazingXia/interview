const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// 导入其它的配置
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

// 定义对象保存 base 配置信息
const commonConfig = (isProduction) => {
  return {
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
      filename: 'js/[name].[contenthash:8].bundle.js',
      path: resolveApp('./dist'),
    },
    optimization: {
      runtimeChunk: true,
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
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
}

module.exports = (env) => {
  const isProduction = env.production

  process.env.NODE_ENV = isProduction ? 'production' : 'development'

  // 依据当前的打包模式来合并配置
  const config = isProduction ? prodConfig : devConfig

  const mergeConfig = merge(commonConfig(isProduction), config)

  return mergeConfig
}