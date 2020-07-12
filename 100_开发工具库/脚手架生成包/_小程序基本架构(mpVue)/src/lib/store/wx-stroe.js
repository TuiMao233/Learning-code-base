import Abstract from './abstract'

// 定义微信的store方法
class WxStroe extends Abstract {
  SUCCESS = 0; // 成功
  FAILURE = 1; // 失败
  OVERFLOWER = 2; // 操作异常(超出上限或不存在)
  TIMEOUT = 3; // 时间过期
  getStorage(key) {
    return wx.getStorageSync(key) || {}
  }
  setStorage(key, data = {}) {
    try {
      wx.setStorage({ key, data })
      return this.SUCCESS
    } catch (error) {
      return this.OVERFLOWER
    }
  }
  removeStorage(key) {
    try {
      wx.removeStorage({ key });
      return this.SUCCESS
    } catch (error) {
      return this.OVERFLOWER
    }
  }
  clearStorage() {
    try {
      wx.clearStorage();
      return this.SUCCESS
    } catch (error) {
      return this.OVERFLOWER
    }
  }
}