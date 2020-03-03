<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheck" />
      <!-- 全选或全不选 -->
    </label>
    <span>
      <span>已完成{{seleNum}}</span> / 全部{{Total}}
    </span>
    <button class="btn btn-danger" @click="delSumTask">清除已完成任务</button>
    <!-- 绑定清除任务事件 -->
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default { // 配置对象
    computed: {
      ...mapGetters(['Total', 'seleNum']),
      // 选择状态的对象为多少个
      // input的读取和修改事件
      isCheck: {
        get () {
          // 当选中的元素和数组的总数量相同,则代表全选,input为true,反之为false
          return this.seleNum === this.Total && (this.seleNum > 0)
        },
        set (value) {
          // 根据元素的选择状态改变全选或全不选
          this.allTask(value)
        }
      }
    },
    methods: {
      ...mapActions(['delSumTask', 'allTask'])
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
