import {ADD_TASK, DEL_TASK, DEL_SUM_TASK, ALL_TASK, GET_TODO} from './mutation-types'
export default {
  // 添加新的任务
  addTask ({commit}, task) {
    commit(ADD_TASK, task)
  },
  // 任务元素自身的删除
  delTask ({commit}, index) {
    commit(DEL_TASK, index)
  },
  // 删除选定内容
  delSumTask ({commit}) {
    commit(DEL_SUM_TASK)
  },
  // 全选或全不选
  allTask ({commit}, fool) {
    commit(ALL_TASK, fool)
  },
  reqTask ({commit}) {
    setTimeout(() => {
      const task = JSON.parse(window.localStorage.getItem('todos_key') || '[]')
      commit(GET_TODO, task)
    }, 1000)
  }
}
