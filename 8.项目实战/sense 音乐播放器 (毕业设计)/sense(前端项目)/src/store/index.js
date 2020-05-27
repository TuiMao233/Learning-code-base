import Vue from "vue";
import Vuex from "vuex";
import {
  RECEIVE_USER_INFO
} from './models-types'
Vue.use(Vuex);

import { reqLogin, reqRegister } from "../api";
export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  mutations: {
    [RECEIVE_USER_INFO] (state, userInfo) {state.userInfo = userInfo}
  },
  actions: {
    // 提交注册数据
    async receiveUserInfo ({commit}, userInfo) { commit(RECEIVE_USER_INFO, userInfo) },
  },
  modules: {}
});
