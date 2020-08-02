// 定义全局存放消息名称
const Mediator = {
  target: null
}
/**定义对象属性行为
 * @param obj 目标对象
 * @param key 定义属性key值
 * @param val 存放值
 */
function defineReactive(obj: any, key: string, val: any) {
  // 定义消息容器
  const listeners = []
  // 改写默认行为
  Object.defineProperty(obj, key, {
    get() {
      if (Mediator.target) {
        listeners.push(Mediator.target)
      }
      return val
    },
    set(newVal) {
      val = newVal
      listeners.forEach(update => update())
    }
  })
}
/**定义计算属性
 * @param obj 目标对象
 * @param key 计算属性key值
 * @param computeFunc 计算属性方法
 * @param updateCallback 计算属性更新回调
 */
function defineComputed(
  obj: any,
  key: string,
  computeFunc: Function,
  updateCallback?: Function
) {
  // 储存消息
  Mediator.target = function () {
    const val = computeFunc.call(obj)
    updateCallback.call(obj, val)
  }
  // 订阅消息
  computeFunc.call(obj);
  // 销毁消息
  Mediator.target = null
  // 定义获取行为
  Object.defineProperty(obj, key, {
    get() { return computeFunc.call(obj) }
  })
}



const gift: any = {}
defineReactive(gift, 'price', 250)
// 定义对象计算属性
defineComputed(gift, 'status', function () {
  return this.price > 1024 ? 'Smile' : 'Cry'
}, function (val: any) {
  // 当相关属性更新时
  console.log(val)
})
gift.price = 88
gift.price = 1025