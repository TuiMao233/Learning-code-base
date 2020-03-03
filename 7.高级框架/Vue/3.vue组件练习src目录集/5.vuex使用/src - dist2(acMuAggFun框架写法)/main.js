/* 入口JS：创建vue实例 */
import Vue from 'vue'
import App from './App.vue'
// import store from './store.js'
import store from './store/inedx.js'
var vm = new Vue({
  el: '#app',
  render: h => h(app),
  store // 所有的组件对象都多了一个属性：$store
})
