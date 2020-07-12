// 定义抽象类, 抽象方法是空方法, 由派生类实现
class AbStore {
  SUCCESS = 0; // 成功
  FAILURE = 1; // 失败
  OVERFLOWER = 2; // 超出上线
  TIMEOUT = 3; // 时间过期
  // 获取单储存
  getStorage = (key, callback) => ({});
  // 设置单储存
  setStorage = (key, data, callback) => (null);
  // 清除单储存
  removeStorage = (key, callback) => (null);
  // 清除所有储存
  clearStorage = (callback) => (null);
}