import Vue from "vue";
import Vuex from "vuex";
import {
  RECEIVE_USER_INFO, RECEIVE_SONG_LIST, MODIFY_SONG_INDEX,
  MODIFY_SONG_ITEM_STATUS, SWITCH_SONG_ITEM_STATUS,
  UNSHIFT_USER_SONG_ITEM, DEL_USER_SONG_ITEM
} from './models-types'
Vue.use(Vuex);
import { reqOutLogin } from "../api";
export default new Vuex.Store({
  state: {
    userInfo: {},
    songIndex: 0,
    playerSongList: []
  },
  mutations: {
    [RECEIVE_USER_INFO](state, userInfo) { state.userInfo = userInfo },
    [MODIFY_SONG_INDEX](state, songIndex) { state.songIndex = songIndex },
    [RECEIVE_SONG_LIST](state, playerSongList) { state.playerSongList = playerSongList },
    [MODIFY_SONG_ITEM_STATUS](state, [index, status]) {
      // 正在播放的歌曲更改对应的状态
      const currentPlaySong = state.playerSongList[index]
      if (!currentPlaySong.isPlay) { Vue.set(currentPlaySong, 'isPlay', !status); }
      else currentPlaySong.isPlay = !status
    },
    [SWITCH_SONG_ITEM_STATUS](state, index) {
      // 查找歌曲队列中是否有播放的项, 有则改变为false
      const findSongItem = state.playerSongList.find(item => item.isPlay)
      if (findSongItem) findSongItem.isPlay = false;
      // 正在播放的歌曲更改对应的状态
      const currentPlaySong = state.playerSongList[index]
      if (!currentPlaySong.isPlay) { Vue.set(currentPlaySong, 'isPlay', true); }
      else currentPlaySong.isPlay = !currentPlaySong.isPlay;
    },
    [UNSHIFT_USER_SONG_ITEM](state, songItem) { state.userInfo.song_list.unshift(songItem) },
    [DEL_USER_SONG_ITEM](state, audio_name) {
      state.userInfo.song_list.splice(
        state.userInfo.song_list.findIndex(item=> item.audio_name == audio_name), 1
      )
    },
  },
  actions: {
    // 移除用户歌曲中的某个项
    delUserSongItem({ commit }, audio_name) { commit(UNSHIFT_USER_SONG_ITEM, audio_name) },
    // 接受单个歌曲项存入用户歌曲中
    receiveUserSongItem({ commit }, songItem) { commit(UNSHIFT_USER_SONG_ITEM, songItem) },
    // 切换歌曲时, 改变歌曲项状态
    switchSongItemStatus({ commit }, index) { commit(SWITCH_SONG_ITEM_STATUS, index) },
    // 修改歌曲项的状态
    modifySongItemStatus({ commit }, [index, status]) { commit(MODIFY_SONG_ITEM_STATUS, [index, status]) },
    // 接受播放歌单
    receiveSongList({ commit }, playerSongList) { commit(RECEIVE_SONG_LIST, playerSongList) },
    // 修改播放的歌曲索引
    modifySongIndex({ commit }, songIndex) { commit(MODIFY_SONG_INDEX, songIndex) },
    // 接受用户数据
    receiveUserInfo({ commit }, userInfo) { commit(RECEIVE_USER_INFO, userInfo) },
    // 退出登录, 清除user-cookies、store
    outLogin({ commit }) { reqOutLogin(); commit(RECEIVE_USER_INFO, {}) },
  },
  modules: {}
});