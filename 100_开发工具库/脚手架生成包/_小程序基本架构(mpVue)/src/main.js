import Vue from 'vue'
import App from './app.vue'
// 用于启动项目的时候提示信息，设置为false关闭提示
Vue.config.productionTip = false
// 开启数据更新量提示(用于性能优化)
Vue.config._mpTrace = true
// 因为小程序页面组件和这个App.vue组件的写法和引入方式是一致的，为了区分两者，需要设置mpType值
App.mpType = 'app'  

// 生成Vue实例
const app = new Vue(App)
// 挂载组件
app.$mount()