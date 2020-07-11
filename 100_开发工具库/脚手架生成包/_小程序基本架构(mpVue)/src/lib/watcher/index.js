/** 观察者构造函数; author: Mr_Mao
  * 观察者模式又叫发布订阅和消息模式。是设计模式中非常著名也是非常重要的一种模式。
  * 这种模式一般会定义一个主题和众多个个体，这里主题可以想象为一个消息中心，里面有各种各样的消息，
  * 众多个体可以订阅不同的消息，当未来消息中心发布某条消息的时候，订阅过他的个体就会得到通知。
  * 使用方式: 
  * 订阅消息-> $watcher.subscribe(type, execute)
  * @param {string} type -> 消息名称
  * @param {Function} execute -> 接受消息回调
  * @returns {observe}
  * 
  * 发布消息-> $watcher.publish(type, value, _isSave)
  * @param {string} type 消息名称
  * @param {any} value 消息数据
  * @param {boolean} _isSava 是否保存消息(占用内存)
  * 
  * 取消订阅 -> $watcher.unsubscribe(_observe)
  * @param {observe} 订阅消息返回的订阅者对象(销毁数据，清除缓存)
  */
class Watcher {
  constructor(config = { debugging: false }) {
    this.observes = {} // 订阅者对象集合
    this.message = {} // 消息对象结合
    this.debugging = config.debugging // 是否开启调试模式
  }
  // 发布消息
  publish(type, value, _isSave) {
    // 是否保存该消息(有一次保存消息, 那么之后都会保存消息)
    if (_isSave || this.message[type] !== null) {
      this.message[type] = value
    }
    if (!Array.isArray(this.observes[type])) { return }
    this.observes[type].forEach(_observe => _observe.execute(value))
    if (this.debugging) {
      console.log(`观察者发布消息, 消息名称为: `, type, '消息为: ', value)
    }
  }
  // 订阅消息, 返回订阅者
  subscribe(type, execute, isInit = true) {
    if (!type || !typeof execute == 'function') {
      return
    }
    const _observe = new this.Observe(type, execute)
    // 添加到消息列表对象中
    if (this.observes[type]) {
      this.observes[type].push(_observe)
    } else {
      this.observes[type] = [_observe]
    }
    // 如果该消息存在, 初始化执行
    if (this.message[_observe.type] !== null && isInit) {
      _observe.execute(this.message[_observe.type])
    }
    if (this.debugging) {
      console.log(`订阅者订阅消息, 消息名称为: `, type, '订阅者为: ', _observe)
    }
    return _observe
  }
  // 取消订阅
  unsubscribe(_observe) {
    if (this.debugging) {
      console.log('观察者取消该订阅者: ', _observe)
    }
    if (!Array.isArray(this.observes[_observe.type])) { return }
    // 查找消息列表, 删除对应订阅者
    for (const i in this.observes[_observe.type]) {
      if (this.observes[_observe.type][i].id == _observe.id) {
        this.observes[_observe.type].splice(i, 1)
        // 如果该类型订阅者数组为空，删除数组和消息
        if (!this.observes[_observe.type].length) {
          delete this.observes[_observe.type]
          delete this.message[_observe.type]
        }
        return
      }
    }
  }
  // 订阅者构造函数
  Observe = class {
    constructor(type, execute) {
      this.type = type
      this.id = this.Guid()
      if (typeof execute == 'function') {
        this.execute = execute
      }
    }
    execute(message) {
      console.log("id: %s, value: %s", this.id, message)
    }
    Guid() {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
  }
}

export default Watcher
