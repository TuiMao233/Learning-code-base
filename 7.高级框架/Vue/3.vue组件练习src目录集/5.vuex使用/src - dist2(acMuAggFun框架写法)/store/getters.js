export default {
  Total (state) {
    return state.Task.length
  },
  // 选择状态的对象为多少个
  seleNum (state) {
    return state.Task.reduce((preTo, taskCont) => (preTo += taskCont.choTask ? 1 : 0), 0)
  }
}
