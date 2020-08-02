const obj = {
  username: '毛先生',
  password: 123456,
  [Symbol('secret')]: 'I am scared!',
}
const observer = new Proxy(obj, {
  /**当获取proxy对象属性时的捕捉器
   * @param {object} target 目标对象
   * @param {string} property 目标属性名称
   * @param {object} receiver 最初被调用的对象。通常是 proxy 本身
   */
  get(target, property, receiver) {
    // console.log('属性值获取: ', target[property])
    // console.log('receiver: ', receiver)
    return target[property]
  },
  /**当设置proxy对象属性时的捕捉器
   * @param {object} target 目标对象
   * @param {string} property 目标属性名称
   * @param {any} value 设置的属性值
   * @param {object} receiver 最初被调用的对象。通常是 proxy 本身
   */
  set(target, property, value, receiver) {
    return value
  },
  /**当 key in proxy 时的拦截器
   * @param {object} target 目标对象
   * @param {string} key in传入的key值
   * @returns {Boolean}
   */
  has(target, key) {
    return key in target
  },
  /**当 delete propxy 属性时的拦截器
   * @param {object} target 目标对象
   * @param {string} property 待删除的属性名称
   * @returns {Boolean} 是否删除成功
   */
  deleteProperty(target, property) {
    return true
  },
  /**当调用 Reflect.ownKeys 时的拦截器
   * @param {object} target 目标对象
   */
  ownKeys(target) {
    return Reflect.ownKeys(target)
  }
})

function sum(a, b) { return a + b; }
const HandlerFunction = new Proxy(sum, {
  /**函数调用的拦截器
   * @param {Function} target 目标方法
   * @param {object|undefined} thisArg 调用时上下文 
   * @param {Array<any>} args 参数组成的数组
   * @returns {any} 返回值将作为函数返回值使用
   */
  apply(target, thisArg, args) {
    return args[0] + args[1] * 10
  },
  /**new操作符的拦截
   * @param {Function} target 目标对象
   * @param {Array<any>} args 参数组成的数组
   * @param {newTarget} newTarget 最初被调用的构造函数
   */
  construct(target, args, newTarget) {
    return new target(...args);
  }
})