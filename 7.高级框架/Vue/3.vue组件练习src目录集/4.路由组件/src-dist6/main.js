/* 入口JS：创建vue实例 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
const app = new Vue({
  components: { App },
  template: '<App/>',
  router
}).$mount('#app')
