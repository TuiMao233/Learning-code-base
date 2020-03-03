<template>
  <div class="todo-header">
    <input v-model="newTask" @keyup.enter="sumTask" type="text" placeholder="请输入你的任务名称，按回车键确认" />
    <!-- 监视输入框 -->
  </div>
</template>

<script>
  export default { // 配置对象
    data () {
      return {
        newTask: ''
      }
    },
    methods: {
      // 提交新的trsk
      sumTask () {
        // 新的trsk存入变量,并且传入addTask函数中
        const task = {name: this.newTask, choTask: false}
        // this.addTask(task)
        // 触发自定义事件：addTask
        // 传入task值
        this.$emit('addTask', task)
      }
    }
  }
</script>

<style>
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>
