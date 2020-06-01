/* 入口JS：创建vue实例 */
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
export default new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  store // 所有的组件对象都多了一个属性：$store
})
