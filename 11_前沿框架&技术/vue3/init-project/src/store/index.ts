import { createStore } from "vuex";

export default createStore({
  state: {
    count: 6
  },
  mutations: {},
  actions: {},
  getters: {
    bCount(state){
      return state.count
    }
  },
  modules: {}
});
