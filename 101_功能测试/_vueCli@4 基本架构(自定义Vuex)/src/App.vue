<template>
  <div id='app'>
    <div>VueCli@4_App.vue</div>
    <div>欢迎来到App.vue基础界面</div>
    <button @click='open'>getCount</button><br>
    <button @click='$store.dispatch("qaq", 1)'>add_count</button><br>
    count: {{$store.state.count}}
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    
  }),
  methods: {
    open() {
      console.log(this.$store.state)
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
