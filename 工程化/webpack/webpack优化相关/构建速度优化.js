// 缩小⽂文件范围 Loader
// 优化loader配置
// test include exclude三个配置项来缩⼩小loader的处理理范围
// 推荐include
// include: path.resolve(__dirname, "./src"),



// 优化resolve.modules配置
// resolve.modules⽤用于配置webpack去哪些⽬目录下寻找第三⽅方模块，默认是['node_modules']
// 寻找第三⽅方模块，默认是在当前项⽬目⽬目录下的node_modules⾥里里⾯面去找，如果没有找到，就会去上⼀一级
// ⽬目录../node_modules找，再没有会去../../node_modules中找，以此类推，和Node.js的模块寻找机制
// 很类似。
// 如果我们的第三⽅方模块都安装在了了项⽬目根⽬目录下，就可以直接指明这个路路径。
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules")]
  }
}



// 优化resolve.alias配置
// resolve.alias配置通过别名来将原导⼊入路路径映射成⼀一个新的导⼊入路路径
// 拿react为例例，我们引⼊入的react库，⼀一般存在两套代码
// cjs
// 采⽤用commonJS规范的模块化代码
// umd
// 已经打包好的完整代码，没有采⽤用模块化，可以直接执⾏行行
// 默认情况下，webpack会从⼊入⼝口⽂文件./node_modules/bin/react/index开始递归解析和处理理依赖
// 的⽂文件。我们可以直接指定⽂文件，避免这处的耗时。
// alias: {
// "@": path.join(__dirname, "./pages"),
// react: path.resolve(
// __dirname,
// "./node_modules/react/umd/react.production.min.js"
// ),
// "react-dom": path.resolve(
// __dirname,
// "./node_modules/react-dom/umd/react-dom.production.min.js"
// )
// }



/*
// 使用externals优化cdn静态资源
  externals 配置可以让我们在打包时排除某些依赖，不将其打包进最终的 bundle 文件，而是通过 CDN 或全局变量等方式在运行时获取。
  常见用法如排除 React、Vue、Lodash 等大型库，减少打包体积，提高加载速度。
  例如：
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_'
  }
  这样配置后，webpack 构建时不会将 react、react-dom、lodash 打包进 bundle，而是期望它们在全局变量中可用。
*/
//webpack.config.js
module.exports = {
  //...
  externals: {
  //jquery通过script引⼊入之后，全局中即有了了 jQuery 变量量
  'jquery': 'jQuery'
  }
}



// 借助MiniCssExtractPlugin 完成抽离css
// 如果不不做抽取配置，我们的 css 是直接打包进 js ⾥里里⾯面的，我们希望能单独⽣生成 css ⽂文件。 因为单独⽣生
// 成css,css可以和js并⾏行行下载，提⾼高⻚页⾯面加载效率


// npm install mini-css-extract-plugin -D
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// {
// test: /\.scss$/,
// use: [
// // "style-loader", // 不不再需要style-loader，⽤用MiniCssExtractPlugin.loader代替
// MiniCssExtractPlugin.loader,
// "css-loader", // 编译css
// "postcss-loader",
// "sass-loader" // 编译scss
// ]
// },
// plugins: [
// new MiniCssExtractPlugin({
// filename: "css/[name]_[contenthash:6].css",
// chunkFilename: "[id].css"
// })
// ]


// 压缩css
// 借助 optimize-css-assets-webpack-plugin
// 借助cssnano
// ##安装
// npm install cssnano -D
// npm i optimize-css-assets-webpack-plugin -D
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// new OptimizeCSSAssetsPlugin({
// cssProcessor: require("cssnano"), //引⼊入cssnano配置压缩选项
// cssProcessorOptions: {
// discardComments: { removeAll: true }
// }
// })




// 压缩HTML
// 借助html-webpack-plugin

// new htmlWebpackPlugin({
//   title: "京东商城",
//   template: "./index.html",
//   filename: "index.html",
//   minify: {
//   // 压缩HTML⽂文件
//   removeComments: true, // 移除HTML中的注释
//   collapseWhitespace: true, // 删除空⽩白符与换⾏行行符
//   minifyCSS: true // 压缩内联css
//   }
//   }),




// development vs Production模式区分打包


// tree Shaking
// webpack2.x开始⽀持 tree shaking概念，顾名思义，"摇树"，清除⽆用 css,js(Dead Code)
// Dead Code ⼀一般具有以下⼏几个特征
// 代码不会被执⾏行行，不不可到达
// 代码执行的结果不会被⽤到
// 代码只会影响死变量量（只写不不读）
// Js tree shaking只⽀支持ES module的引⼊入⽅方式！！！！,





// Css tree shaking
// npm i glob-all purify-css purifycss-webpack --save-dev
// const PurifyCSS = require('purifycss-webpack')
// const glob = require('glob-all')
// plugins:[
// // 清除⽆无⽤用 css
// new PurifyCSS({
// paths: glob.sync([
// // 要做 CSS Tree Shaking 的路路径⽂文件
// path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html ⽂文
// 件进⾏行行 tree shaking
// path.resolve(__dirname, './src/*.js')
// ])
// })
// ]



// JS tree shaking
// 只⽀支持import⽅方式引⼊入，不不⽀支持commonjs的⽅方式引⼊入

//webpack.config.js
optimization: {
  usedExports: true // 哪些导出的模块被使⽤用了了，再做打包
}

// ⽣生产模式不不需要配置，默认开启

// 副作⽤
//package.json
// "sideEffects":false //正常对所有模块进⾏行行tree shaking , 仅⽣生产模式有效，需要配合
// usedExports
// 或者 在数组⾥里里⾯面排除不不需要tree shaking的模块
// "sideEffects":['*.css','@babel/polyfill']






// 代码分割 code Splitting
// 单⻚页⾯面应⽤用spa：
// 打包完后，所有⻚页⾯面只⽣生成了了⼀一个bundle.js
// 代码体积变⼤大，不不利利于下载
// 没有合理理利利⽤用浏览器器资源


// 多⻚页⾯面应⽤用mpa:
// 如果多个⻚页⾯面引⼊入了了⼀一些公共模块，那么可以把这些公共的模块抽离出来，单独打包。公共代码只需要
// 下载⼀一次就缓存起来了了，避免了了重复下载







// Scope Hoisting
// 作⽤用域提升（Scope Hoisting）是指 webpack 通过 ES6 语法的静态分析，分析出模块之间的依赖关
// 系，尽可能地把模块放到同⼀一个函数中。下⾯面通过代码示例例来理理解：

// // hello.js
// export default 'Hello, Webpack';
// // index.js
// import str from './hello.js';
// console.log(str);


// 打包后， hello.js 的内容和 index.js 会分开
// 通过配置 optimization.concatenateModules=true`：开启 Scope Hoisting

// webpack.config.js
module.exports = {
  optimization: {
    concatenateModules: true
  }
};

//   我们发现hello.js内容和index.js的内容合并在⼀一起了了！所以通过 Scope Hoisting 的功能可以让
// Webpack 打包出来的代码⽂文件更更⼩小、运⾏行行的更更快




// DllPlugin插件打包第三⽅方类库 优化构建性能




// ⽤用 HardSourceWebpackPlugin ，⼀一样的优化效果，但是使⽤用却及其简单
// 提供中间缓存的作⽤用
// ⾸首次构建没有太⼤大的变化
// 第⼆二次构建时间就会有较⼤大的节省
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// const plugins = [
// new HardSourceWebpackPlugin()
// ]






// 使⽤用happypack并发执⾏行行任务
// 运⾏行行在 Node.之上的Webpack是单线程模型的，也就是说Webpack需要⼀一个⼀一个地处理理任务，不不能同
// 时处理理多个任务。 Happy Pack 就能让Webpack做到这⼀一点，它将任务分解给多个⼦子进程去并发执
// 行，⼦进程处理完后再将结果发送给主进程。从⽽发挥多核 CPU 电脑的威⼒

npm i - D happypack
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });
//const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
// webpack.config.js
rules: [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        // ⼀一个loader对应⼀一个id
        loader: "happypack/loader?id=babel"
      }
    ]
  },
  {
    test: /\.css$/,
    include: path.resolve(__dirname, "./src"),
    use: ["happypack/loader?id=css"]
  },
]
//在plugins中增加
plugins: [
  new HappyPack({
    // ⽤用唯⼀一的标识符id，来代表当前的HappyPack是⽤用来处理理⼀一类特定的⽂文件
    id: 'babel',
    // 如何处理理.js⽂文件，⽤用法和Loader配置中⼀一样
    loaders: ['babel-loader?cacheDirectory'],
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    id: "css",
    loaders: ["style-loader", "css-loader"]
  }),
]