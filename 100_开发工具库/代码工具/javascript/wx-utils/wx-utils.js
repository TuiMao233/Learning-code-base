/*
 * @Author: 毛先生
 * @Date: 2020-07-10 09:22:49
 * @LastEditTime: 2020-08-01 13:59:47
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */ 
// 封装所有微信API为promise
export const wxPromise = (key = "", options = {}) => new Promise((success, fail) => {
  wx[key]({ ...options, success, fail })
})
export const downloadImgUrl = (url) => new Promise((resolve, reject) => {
  wx.downloadFile({
    url,
    success: (val) => resolve(val.tempFilePath),
    fail: reject
  })
})
// 错误信息提示
export const errorMsg = (title, isBack, options = {}) => {
  wx.showToast({ icon: 'none', title, ...options })
  if (isBack) setTimeout(() => wx.navigateBack(), options.duration || 1500);
  return true;
}
// 成功信息提示
export const successMsg = (title, isBack, options = {}) => {
  wx.showToast({ icon: 'success', title, ...options })
  if (isBack) setTimeout(() => wx.navigateBack(), options.duration || 1500);
  return true;
}

// 微信路由跳转封装
const paramsAnaly = (url = "", params = {}) => {
  const queryStr = Object.keys(params).map(key => `${key}=${params[key]}`)
  if (queryStr.length > 0) { url += '?' + queryStr.join("&") }
  return url
}
export const navigateTo = (url = "", params = {}) => wx.navigateTo({ url: paramsAnaly(url, params) })
export const redirectTo = (url = "", params = {}) => wx.navigateBack({ url: paramsAnaly(url, params) })
export const reLaunch = (url = "", params = {}) => wx.reLaunch({ url: paramsAnaly(url, params) })
export const switchTab = (url = "", params = {}) => wx.switchTab({ url: paramsAnaly(url, params) })
export const navigateBack = (delta = 0) => wx.navigateBack({ delta })
