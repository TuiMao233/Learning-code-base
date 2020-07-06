// 创建mpvue模板
export const createMpVueTemplate = (page_name = '') => (
  `/* ${page_name} */
<template xlang="wxml">
  <div class="${page_name}">
    <!-- 页面头部 -->
    <div class="header"></div>
    <!-- 页面内容 -->
    <div class="main">${page_name}</div>
    <!-- 页面底部 -->
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  props: [],
  data: () => ({}),
  methods: {},
  computed: {},
  watch: {},

  // vue生命周期函数--初始化执行完毕
  created() {},
  // vue生命周期函数--数据更新后
  beforeUpdate() {},
  // vue生命周期函数--组件销毁前
  beforeDestory() {},

  // 小程序生命周期函数--监听页面初次渲染完成
  onReady() {},
  // 生命周期函数--监听页面显示
  onShow() {},
  // 生命周期函数--监听页面隐藏
  onHide() {},
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {},
  // 页面上拉触底事件的处理函数
  onReachBottom() {},
  // 用户点击右上角分享
  onShareAppMessage() {},
  // 页面相关事件处理函数--监听页面滚动
  /* onPageScroll() {}, */
  // 页面相关事件处理函数--tab页点击
  /* onTabItemTap() {} */
};
</script>

<style lang="less">

</style>`
)

// 创建main.js模板
export const createMainJsTemplate = (page_name = '') => {
  const pageExaName = page_name.slice(0, 1).toUpperCase() + page_name.slice(1)
  return (
    `import Vue from 'vue'
import ${pageExaName} from './${page_name}.vue'

const ${page_name}_app = new Vue(${pageExaName})
// 挂载当前页面
${page_name}_app.$mount()`
  )
}

// 创建main.json模板
export const createMainJsonTemplate = (page_name = '') => (
  `{
    "navigationBarTitleText": "${page_name}",
    "navigationBarTextStyle": "black",
    "navigationBarBackgroundColor": "#ffffff",
    "backgroundColor": "#eeeeee",
    "backgroundTextStyle": "light",
    "onReachBottomDistance": 50,
    "navigationStyle":"default"
  }`
)