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
    // 提交登录数据
    async getLogin ({commit}, {username, password}) {
      const result = await reqLogin(username, password)
      if(result.code == 0){ commit(RECEIVE_USER_INFO, result.data) }
    },
    // 提交注册数据
    async getRegister ({commit}, {username, password}) {
      const result = await reqRegister(username, password)
      if(result.code == 0){ commit(RECEIVE_USER_INFO, result.data) }
    }
  },
  modules: {}
});
