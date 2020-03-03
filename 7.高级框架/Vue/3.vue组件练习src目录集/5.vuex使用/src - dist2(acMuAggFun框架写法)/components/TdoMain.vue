<template>
  <ul class="todo-main">
    <TdoItem v-for='(task,index) in Task' :key='index' :index='index'/>
    <!-- 循环li元素组件 并且传入task数组,当前索引,还有删除task函数delTask -->
  </ul>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import TdoItem from './TdoItem.vue'
  export default { // 配置对象
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
