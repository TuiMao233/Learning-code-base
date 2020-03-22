import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/inedx.js'
const app = new Vue({
  components: { App },
  template: '<App/>',
  router,
  store
}).$mount('#app')
