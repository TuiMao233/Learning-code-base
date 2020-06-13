
// src / store.js
import Vue from 'vue'
import Vuex from '../libs/Vuex'
// vue解析vuex插件
Vue.use(Vuex)
const state = { // 状态对象
    count: 1
}
const mutations = { // 包含多个更新state函数的对象
    QAQ(state, num) {
        state.count += num
    }
}
const actions = { // 包含多个对应事件回调函数的对象
    qaq({ commit }, num) {
        commit('QAQ', num)
    }
}
const getters = {} // 包含多个getter计算属性函数的对象


// 向Vuex添加所有管理对象(必须), 名称必须统一(state, mutations, actions, getters)
export default new Vuex.Store({ state, mutations, actions, getters })