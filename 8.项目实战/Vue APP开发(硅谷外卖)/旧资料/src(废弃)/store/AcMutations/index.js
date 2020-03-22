import state from '../state.js'
import getters from '../getters.js'
// import actions from '../actions.js'
// import mutations from '../mutations.js'
import acMuAgg from './acMuAgg.js'
let actions = {}
let mutations = {}
acMuAgg.acMu = {actions, mutations}
acMuAgg.addMethod(state)
export default {
  state,
  getters,
  actions,
  mutations
}
