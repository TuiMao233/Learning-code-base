import Vue from 'vue'
import Vuex from 'vuex'
import carInfo from './modules/carInfo.js'
import userInfo from './modules/userInfo.js'
Vue.use(Vuex)


export default new Vuex.Store({
  modules: { carInfo, userInfo }
})