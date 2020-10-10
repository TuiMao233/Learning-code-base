import { createStore } from "vuex";

export default createStore({
  state: {}, // 状态对象
  mutations: {}, // 包含多个更新state函数的对象
  actions: {}, // 包含多个对应事件回调函数的对象
  getters: {}, // 包含多个getter计算属性函数的对象
  modules: {}  // 包含多个store模块的对象
});
