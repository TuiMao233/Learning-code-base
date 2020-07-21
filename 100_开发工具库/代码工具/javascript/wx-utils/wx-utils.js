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

// 过滤input为数字
export const onFilterNumber = (ev) => {
  const value = ev.detail.value
  return value.trim().replace(/\D/g, "");
}
// 过滤input为字符串
export const onFilterString = (ev) => {
  const value = ev.detail.value
  return value.trim().replace(/\d/g, "");
}
// 获取地理位置
export const choiceLocation = async () => {
  let location = null;
  try { location = await wxPromise("chooseLocation") } 
  catch (error) {
    // 查询授权情况
    const getSettingRes = await wxPromise("getSetting");
    const statu = getSettingRes.authSetting;
    if (statu["scope.userLocation"]) return;

    // 弹出对话框
    const { confirm } = await wxPromise("showModal", {
      title: "是否授权当前位置",
      content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用"
    });
    if (!confirm) return;

    // 弹出授权框
    const { authSetting } = await wxPromise("openSetting");
    if (!authSetting['scope.userLocation']) return errorMsg('授权失败');
    location = await wxPromise("chooseLocation");
  }
  console.log(location)
}