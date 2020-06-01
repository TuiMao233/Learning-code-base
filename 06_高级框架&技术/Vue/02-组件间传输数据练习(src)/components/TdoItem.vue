<template>
  <li @mouseenter="mouseLi(true)" @mouseleave="mouseLi(false)" :style="{background:bgColor}">
    <!-- 为元素添加移入和移出事件 移入时为true,移出为false 并且background样式为bgColor数据 -->
    <label>
      <input type="checkbox" v-model="task.choTask" />
      <span>{{task.name}}</span>
    </label>
    <button class="btn btn-danger" v-show="butShow" @click="delTask(index)">删除</button>
    <!-- 单个task,绑定show事件,为true时显示,为false隐藏,传入一个删除函数delTask(索引) -->
  </li>
</template>

<script>
  export default { // 配置对象
    data () {
      return {
        // 默认background样式
        bgColor: 'white',
        // 默认删除点击按钮样式
        butShow: false
      }
    },
    props: {
      // 数组的单个变量,变量为Object对象
      task: Object,
      // 当前元素的索引
      index: Number,
      // 删除函数
      delTask: Function
    },
    methods: {
      mouseLi (fool) {
        // 鼠标移入移出事件
        if (fool) {
          // 移入时元素本身和子元素样式改变
          this.bgColor = 'rgba(0,0,0,.2)'
          this.butShow = true
        } else {
          // 移出时元素本身和子元素样式改变
          this.bgColor = 'white'
          this.butShow = false
        }
      }
    }
  }
</script>

<style>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
