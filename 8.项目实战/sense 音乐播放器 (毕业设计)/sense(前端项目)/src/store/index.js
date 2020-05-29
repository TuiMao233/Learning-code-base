import Vue from "vue";
import Vuex from "vuex";
import {
  RECEIVE_USER_INFO, RECEIVE_SONG_LIST, UNSHIFT_SONG_MSG, SHIFT_SONG_MSG
} from './models-types'
Vue.use(Vuex);
import { Message } from "element-ui";
import { reqOutLogin, reqSearchSong } from "../api";
export default new Vuex.Store({
  state: {
    userInfo: {},
    searchSongList: [],
    playerSongList: [{}]
  },
  mutations: {
    [RECEIVE_USER_INFO](state, userInfo) { state.userInfo = userInfo },
    [RECEIVE_SONG_LIST](state, searchSongList) { state.searchSongList = searchSongList },
    [UNSHIFT_SONG_MSG](state, songMsg) { state.playerSongList.unshift(songMsg) },
    [SHIFT_SONG_MSG](state) { if (state.playerSongList.length > 1) state.playerSongList.shift() },
  },
  actions: {
    // 获取搜索歌曲列表
    async getSearchSongList({ commit }, [serachStr, cb]) {
      const result = await reqSearchSong(serachStr)
      cb && cb()
      console.log(result)
      if (result.code !== 0) return Message.error(result.msg)
      commit(RECEIVE_SONG_LIST, result.data)
    },
    // 接收歌曲信息
    receivePlayerSong({ commit }, songMsg) { commit(UNSHIFT_SONG_MSG, songMsg) },
    remotePlayerSong({ commit }) { commit(UNSHIFT_SONG_MSG) },
    // 接受用户数据
    receiveUserInfo({ commit }, userInfo) { commit(RECEIVE_USER_INFO, userInfo) },
    // 退出登录, 清除user-cookies、store
    outLogin({ commit }) { reqOutLogin(); commit(RECEIVE_USER_INFO, {}) }
  },
  modules: {}
});