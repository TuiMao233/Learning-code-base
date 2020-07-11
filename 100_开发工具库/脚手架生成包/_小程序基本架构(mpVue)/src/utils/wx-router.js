const paramsAnaly = (url = "", params = {})=>{
  const queryStr = Object.keys(params).map(key => `${key}=${params[key]}`)
  if (queryStr.length > 0) { url += '?' + queryStr.join("&") }
  return url
}
export const navigateTo = (url = "", params = {}) => wx.navigateTo({ url: paramsAnaly(url, params) })
export const redirectTo = (url = "", params = {}) => wx.navigateBack({ url: paramsAnaly(url, params) })
export const reLaunch = (url = "", params = {}) => wx.reLaunch({ url: paramsAnaly(url, params) })
export const switchTab = (url = "", params = {}) => wx.switchTab({ url: paramsAnaly(url, params) })
export const navigateBack = (delta = 0) => wx.navigateBack({ delta })