export default {
    // 添加新的任务
    addTask (state, aaa) {
      state.Task.unshift(aaa)
    },
    // 任务元素自身的删除
    delTask (state, index) {
      state.Task.splice(index, 1)
    },
    // 删除选定内容
    delSumTask (state) {
      const Task = state.Task.filter((tk) => !tk.choTask)
      state.Task = Task
    },
    // 全选或全不选
    allTask (state, fool) {
      state.Task.map((objItem, index, arr) => {
         objItem.choTask = fool
      })
    },
    /* -------- ajex分割线 -------- */
    // 获取Task
    get_Task (state) {
      // 请求ajex
      setTimeout(() => {
        const task = JSON.parse(window.localStorage.getItem('todos_key') || '[]')
        // 将请求结果保存
        state.Task = task
      }, 1000)
    }
}
