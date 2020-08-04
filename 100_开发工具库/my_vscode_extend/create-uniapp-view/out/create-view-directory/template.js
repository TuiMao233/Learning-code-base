"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewTemplate = void 0;
function createViewTemplate(options) {
    const style_type = options.style_type && options.style_type !== 'css' ? ` lang="${options.style_type}"` : "";
    return `
<template>
  <view>${options.view_name}</view>
</template>

<script${options.typescript ? ' lang="ts"' : ''}>
import Vue from "vue";
export default ${options.typescript ? 'Vue.extend(' : ''}{
  data: () => ({}),
  methods: {},
  computed: {},
  watch: {},

  // vue生命周期函数--初始化执行完毕
  created() {},
  // vue生命周期函数--数据更新后
  beforeUpdate() {},

  // 小程序生命周期函数--监听页面加载
  onLoad(options) {},
  // 小程序生命周期函数--监听页面初次渲染完成
  onReady() {},
  // 小程序生命周期函数--监听页面显示
  onShow() {},
  // 小程序生命周期函数--监听页面隐藏
  onHide() {},
  // 小程序页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {},
  // 小程序页面上拉触底事件的处理函数
  onReachBottom() {}
  // 小程序用户点击右上角分享
  /* onShareAppMessage() {}, */
  // 小程序页面相关事件处理函数--监听页面滚动
  /* onPageScroll() {}, */
  // 小程序页面相关事件处理函数--tab页点击
  /* onTabItemTap() {} */
}${options.typescript ? ')' : ''};
</script>

<style${style_type}>
</style>
`;
}
exports.createViewTemplate = createViewTemplate;
//# sourceMappingURL=template.js.map