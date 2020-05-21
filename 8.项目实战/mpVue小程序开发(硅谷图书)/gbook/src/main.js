import Vue from 'vue'
import App from './app.vue'
import store from './store'
// 用于启动项目的时候提示信息，设置为false关闭提示
Vue.config.productionTip = false
// 因为小程序页面组件和这个App.vue组件的写法和引入方式是一致的，为了区分两者，需要设置mpType值
App.mpType = 'app'  
// 挂载Vuex
Vue.prototype.$store = store
// 生成Vue实例
const app = new Vue(App)
// 挂载组件
app.$mount()