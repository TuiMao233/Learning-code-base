<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheck" />
      <!-- 全选或全不选 -->
    </label>
    <span>
      <span>已完成{{seleNum}}</span> / 全部{{Task.length}}
    </span>
    <button class="btn btn-danger" @click="delSumTask">清除已完成任务</button>
    <!-- 绑定清除任务事件 -->
  </div>
</template>

<script>
  export default { // 配置对象
    computed: {
      // 选择状态的对象为多少个
      seleNum () {
        return this.Task.reduce((preTo, taskCont) => (preTo += taskCont.choTask ? 1 : 0), 0)
      },
      // input的读取和修改事件
      isCheck: {
        get () {
          // 当选中的元素和数组的总数量相同,则代表全选,input为true,反之为false
          return this.seleNum === this.Task.length
        },
        set (value) {
          // 根据元素的选择状态改变全选或全不选
          this.allTask(value)
        }
      }
    },
    props: {
      // 清除选择状态的对象
      delSumTask: Function,
      // 全选或全不选
      allTask: Function,
      // task对象
      Task: Array
    }
  }
</script>
<!-- foot样式 -->
<style>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
