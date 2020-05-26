import Vue from 'vue'
import App from './App'
// 路由器引入
import router from './router'
// 状态管理引入
import store from './store';
// 模拟数据执行
import './mock'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './assets/img/timg.gif'
Vue.use(VueLazyload, {loading})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})