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
