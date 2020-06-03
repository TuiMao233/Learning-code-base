import Vue from "vue";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;
import store from './store'

Vue.prototype.$store = store

new Vue({
  router, render: h => h(App),
  data: () => ({ $store: store })
}).$mount("#app");