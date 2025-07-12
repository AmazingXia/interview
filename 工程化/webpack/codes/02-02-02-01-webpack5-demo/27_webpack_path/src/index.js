import './title'
import Vue from 'vue'
import App from './App.vue'

if (module.hot) {
  module.hot.accept(['./title.js'], () => {
    console.log('title.js模块更新')
  })
}

new Vue({
  render: h => h(App)
}).$mount('#root')

/**
 * output
- publicPath：index.html内部的引用路径
- 域名+ publicPath + filename

devServer
- publicPath: 指定本地服务所在的目录
- contentBase: 我们打包之后的资源如果说依赖其它的资源，此时就告知去哪找。
 */