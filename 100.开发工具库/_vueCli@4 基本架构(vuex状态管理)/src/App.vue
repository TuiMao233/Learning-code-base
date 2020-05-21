<template>
  <div id='app'>
    <div>VueCli@4_App.vue</div>
    <div>欢迎来到App.vue基础界面</div>
    <el-button @click='open'>el-button</el-button>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    open() {
      this.$notify.success({
        title: '成功',
        message: '这是一条成功的提示消息'
      });
    }
  },
  components: {}
};
</script>

<style lang='less'>
  #app {
    text-align: center;
    margin-top: 40px;
  }
  div {
    margin-bottom: 40px;
    font: 16px Medium;
    color: #303133;
  }
</style>
