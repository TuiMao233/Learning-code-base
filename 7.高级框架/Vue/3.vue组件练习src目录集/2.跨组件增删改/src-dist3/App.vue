<template>
  <div class='todo-container'>
    <div class="todo-wrap">
      <!-- <TdoHead @addTask='addTask' /> 给Todohead绑定addTask事件监听 -->
      <TdoHead ref='header' />
      <TdoMain :Task='Task' />
      <!-- <TdoFoot :delSumTask='delSumTask' :allTask='allTask' :Task='Task'/> -->
      <TdoFoot>
        <input type="checkbox" v-model="isCheck" slot='check'/>
        <span slot='conunt'>已完成{{seleNum}} / 全部{{Task.length}}</span>
        <button slot='btn btn-danger' class="btn btn-danger" @click="delSumTask" v-show="seleNum">清除已完成任务</button>
      </TdoFoot>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import TdoHead from './components/TdoHead.vue'
  import TdoMain from './components/TdoMain.vue'
  import TdoFoot from './components/TdoFoot.vue'
  import cache from './util/cacheUtil.js'
  export default { // 配置对象
    // 页面显示数据
    data () {
      return {
        // 1.读取数据
        Task: cache.readCache('todos_key')
      }
    },
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
    mounted () { // 执行异步代码
      // 给<TdoHead>绑定addTask事件
      this.$refs.header.$on('addTask', this.addTask)
      // 订阅消息,当消息发生改变时触发,需要初始化执行
      PubSub.subscribe('del', (msg, index) => {
        this.Task.splice(index, 1)
      })
    },
    watch: {// 监视
      Task: {
        deep: true, // 深度监视
        // 2.写入数据
        handler: (value) => { cache.writeCache('todos_key', value) }
      }
    },
    // 存放函数位置
    methods: {
      // 添加新的task
      addTask (taskObj) {
        this.Task.unshift(taskObj)
      },
      // 删除指定索引的task
      delTask (index) {
        this.Task.splice(index, 1)
      },
      // 删除选中状态的task
      delSumTask () {
      // 创建一个变量里面存储着原数组过滤完后的数组
      // 过滤规则为如果task里的choTask不为true 则返回并组成为数组
      // 因为我们要做的是选中的删除，所以只要把没选中的返回为数组
      // 在替换原数组，这样我们想要的效果就出现了
        const Task = this.Task.filter((tk) => !tk.choTask)
        this.Task = Task
      },
      // 全选或者全部不选
      allTask (fool) {
        // 如果fool为true，则全部为选中状态
        // 如果fool为false，则全部为不选中状态
        if (fool) {
          // 遍历并修改task数组每个对象的choTask为true
          this.Task.forEach((task) => { task.choTask = true })
        } else {
          // 遍历并修改task数组每个对象的choTask为false
          this.Task.forEach((task) => { task.choTask = false })
        }
      }
    },
    // 映射组件标签
    components: {
      TdoHead,
      TdoMain,
      TdoFoot
    }
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
