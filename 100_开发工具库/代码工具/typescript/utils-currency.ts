/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-27 12:57:04
 * @LastEditTime: 2020-12-19 16:44:24
 * @Description: 通用工具集
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

// 检测数据类型; return: String
export const checkedTypeof = (target: any): string => {
  return Object.prototype.toString.call(target).slice(8, -1)
}

// 剔除字符串代码字段; return: String
export const removeStrCode = (str: string) => {
  return str.replace(/<[\/\!]*[^<>]*>/ig, "")
}

// 返回只执行一次的函数
export const once = (fn: Function) => {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
// 闭包缓存函数执行结果
export const cached = (fn: Function) => {
  const cache = Object.create(null);
  return function cachedFn(...args: any[]) {
    const key = JSON.stringify(args)
    if (!cache[key]) {
      let result = fn(...args);
      cache[key] = result;
    }
    return cache[key]
  }
}

// for in封装
type FonInCallBack<T> = (key: keyof T, value: T[keyof T]) => T[keyof T] | void
export const forIn = <T>(object: T, callback:FonInCallBack<T>) => {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      callback(key, object[key])
    }
  }
  return object
}