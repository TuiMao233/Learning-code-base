/*
 * @Author: 毛先生
 * @Date: 2020-08-04 11:06:25
 * @LastEditTime: 2020-08-15 13:49:12
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
interface ECView {
  view_name: string,
  typescript?: boolean | unknown,
  style_type?: string | unknown
}
export function createViewTemplate(options: ECView) {
  const style_type = options.style_type && options.style_type !== 'css' ? ` lang="${options.style_type}"` : ""
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

  // vue周期函数--初始化执行完毕
  created() {},
  // vue周期函数--数据更新后
  beforeUpdate() {},

  // 小程序周期函数--监听页面加载
  onLoad(options) {},
  // 小程序周期函数--监听页面初次渲染完成
  onReady() {},
  // 小程序周期函数--监听页面显示
  onShow() {},
  // 小程序周期函数--监听页面隐藏
  onHide() {},
  // 小程序周期函数--监听页面卸载
  onUnload() {},
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
`
}