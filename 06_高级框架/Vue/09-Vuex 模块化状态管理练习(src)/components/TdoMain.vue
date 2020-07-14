<template>
  <ul class="todo-main">
    <TdoItem v-for='(task,index) in Task' :key='index' :index='index' />
    <!-- 循环li元素组件 并且传入task数组,当前索引,还有删除task函数delTask -->
  </ul>
</template>

<script>
  import {actions, mapState} from 'vuex'
  import TdoItem from './TdoItem.vue'
  export default { // 配置对象
    watch: {
      Task: {
        deep: true, // 深度监视
        handler: function (value) {
          // 将todos最新的值，保存到localStrorage
          window.localStorage.setItem('todos_key', JSON.stringify(value))
        }
      }
    },
    computed: {
      ...mapState(['Task'])
    },
    components: {
      TdoItem
    }
  }
</script>

<style>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
