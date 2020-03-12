/* vuex的核心管理对象模块 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态对象
const state = { cliNum: 0 }

// 包含多个更新state函数的行为
const mutations = {
  PLUS (state) { state.cliNum++ },
  REDUCE (state) { state.cliNum-- },
  PLUSODD (state) { if (state.cliNum % 2) { state.cliNum++ } },
  ONESECPLUS (state) { setTimeout(() => { state.cliNum++ }, 1000) }
}

// 包含多个更新state函数的行为的通知方法
const actions = {
  plus ({commit}) { commit('PLUS') },
  reduce ({commit}) { commit('REDUCE') },
  plusOdd ({commit}) { commit('PLUSODD') },
  oneSecPlus ({commit}) { commit('ONESECPLUS') }
}

// 包含多个getter计算属性函数的对象
const getters = {
  type (state) {
    return (state.cliNum % 2) === 0 ? '偶数' : '奇数'
  }
}

export default new Vuex.Store({
  state, // 状态对象
  mutations, // 包含多个更新state函数的对象
  actions, // 包含多个对应事件回调函数的对象
  getters // 包含多个getter计算属性函数的对象
})
