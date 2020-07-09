// 封装所有微信API为promise
export const wxPromise = (name = "", options = {}) => new Promise((resolve, reject) => {
  wx[name]({
    ...options,
    success: resolve,
    fail: reject
  })
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