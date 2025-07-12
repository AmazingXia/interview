const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

// 导入其它的配置
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

// 定义对象保存 base 配置信息
const commonConfig = {
  entry: {
    index: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.jsx', '.ts', '.vue']
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ],
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 20000,
      minChunks: 1,
      cacheGroups: {
        reactVendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'js/[name].vendor.js'
        }
      }
    }
  },
  resolve: {
    extensions: [".js", ".json", '.ts', '.jsx', '.vue'],
    alias: {
      '@': resolveApp('./src')
    }
  },
  output: {
    filename: 'js/[name].[contenthash:8]._bundle.js',
    path: resolveApp('./dist'),

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
    }),
    new webpack.DllReferencePlugin({
      context: resolveApp('./'),
      manifest: resolveApp('./dll/react.manifest.json')
    }),
    new AddAssetHtmlPlugin({
      outputPath: 'js',
      filepath: resolveApp('./dll/dll_react.js')
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