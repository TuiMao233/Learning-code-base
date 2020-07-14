<template>
  <div class='todo-container'>
    <div class="todo-wrap">
      <TdoHead/>
      <TdoMain/>
      <TdoFoot/>
    </div>
  </div>
</template>

<script>
  import TdoHead from './components/TdoHead.vue'
  import TdoMain from './components/TdoMain.vue'
  import TdoFoot from './components/TdoFoot.vue'
  import {mapState} from 'vuex'
  export default { // 配置对象
    mounted () {
      // 请求ajex
      this.$store.dispatch('get_Task')
    },
    computed: { ...mapState(['Task']) },
    watch: { Task: {
        deep: true, // 深度监视
        handler: function (value) {
          // 将todos最新的值，保存到localStrorage
          window.localStorage.setItem('todos_key', JSON.stringify(value))
        }
    }},
    // 映射组件标签
    components: { TdoHead, TdoMain, TdoFoot }
  }
</script>

<style>
  body {
    background: #fff;
  }

  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
