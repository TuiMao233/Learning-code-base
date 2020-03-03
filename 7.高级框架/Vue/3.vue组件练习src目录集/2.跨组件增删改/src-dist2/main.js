/*
入口JS：创建vue实例
 */
import Vue from 'vue'
import App from './App.vue'
var vm = new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
