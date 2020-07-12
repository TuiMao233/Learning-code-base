/* 
数据访问对象模式（Data Access Object Pattern）
或 DAO 模式用于把低级的数据访问 API 或操作从高级的业务服务中分离出来。
以下是数据访问对象模式的参与者。
*/
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