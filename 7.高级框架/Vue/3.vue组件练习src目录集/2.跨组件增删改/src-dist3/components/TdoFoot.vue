<template>
  <div class="todo-footer">
    <label>
      <slot name='check'></slot>
      <!-- 全选或全不选 -->
    </label>
    <span>
      <slot name='conunt'></slot>
    </span>
    <slot name='btn btn-danger'></slot>
    <!-- 绑定清除任务事件 -->
  </div>
</template>

<script>
  export default { // 配置对象
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
