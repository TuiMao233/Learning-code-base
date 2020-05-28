import Vue from "vue";
import Vuex from "vuex";
import {
  RECEIVE_USER_INFO
} from './models-types'
Vue.use(Vuex);

import { reqOutLogin } from "../api";
export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    [RECEIVE_USER_INFO](state, userInfo) { state.userInfo = userInfo }
  },
  actions: {
    // 提交注册数据
    async receiveUserInfo({ commit }, userInfo) { commit(RECEIVE_USER_INFO, userInfo) },
    // 退出登录
    outLogin({ commit }) {
      reqOutLogin() // 请求清除user-cookies
      commit(RECEIVE_USER_INFO, {}) // 清空store
    }
  },
  modules: {}
});
