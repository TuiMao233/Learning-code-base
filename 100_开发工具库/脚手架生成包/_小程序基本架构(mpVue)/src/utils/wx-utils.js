// 封装所有微信API为promise
export const wxPromise = (key = "", options = {}) => new Promise((success, fail) => {
  wx[key]({ ...options, success, fail })
})
// 错误信息提示
export const errorMsg = (title, isBack) => {
  wx.showToast({ icon: 'none', title })
  if (isBack) setTimeout(() => wx.navigateBack(), 1500);
}
// 成功信息提示
export const successMsg = (title, isBack) => {
  wx.showToast({ icon: 'success', title })
  if (isBack) setTimeout(() => wx.navigateBack(), 1500);
}