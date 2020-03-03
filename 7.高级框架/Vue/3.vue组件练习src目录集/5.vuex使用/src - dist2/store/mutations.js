import {ADD_TASK, DEL_TASK, DEL_SUM_TASK, ALL_TASK, GET_TODO} from './mutation-types'
export default {
  // 添加新的任务
  [ADD_TASK] (state, task) {
    state.Task.unshift(task)
  },
  // 任务元素自身的删除
  [DEL_TASK] (state, index) {
      state.Task.splice(index, 1)
  },
  // 删除选定内容
  [DEL_SUM_TASK] (state) {
    const Task = state.Task.filter((tk) => !tk.choTask)
    state.Task = Task
  },
  // 全选或全不选
  [ALL_TASK] (state, fool) {
    state.Task.map((objItem, index, arr) => {
       objItem.choTask = fool
    })
  },
  // 获取ajex请求数据并改变state属性
  [GET_TODO] (state, task) {
    state.Task = task
  }
}
