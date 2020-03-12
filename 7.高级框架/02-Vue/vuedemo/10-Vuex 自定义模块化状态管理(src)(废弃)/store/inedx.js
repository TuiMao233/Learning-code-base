/* vuex的核心管理入口模组 */
import Vue from 'vue'
import Vuex from 'vuex'
import AcMutations from './AcMutations/index.js'
const {state, mutations, actions, getters} = AcMutations
Vue.use(Vuex)
export default new Vuex.Store({ state, mutations, actions, getters })
