/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-27 12:57:04
 * @LastEditTime: 2021-06-28 16:47:35
 * @Description: 通用工具集
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

/**
 * 获取数据类型
 * @param target 检测对象
 * @returns 返回字符串
 */
export const checkedTypeof = (target: any): string => {
  return Object.prototype.toString.call(target).slice(8, -1)
}
/**
 * 剔除字符串代码字段
 * @param str 字符串
 * @returns 剔除字符串
 */
export const removeStrCode = (str: string) => {
  return str.replace(/<[\/\!]*[^<>]*>/ig, "")
}
/**
 * 闭包缓存函数执行结果
 * @param fn 传入方法
 * @returns 返回方法
 */
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
/**
 * 过滤字符串为数值
 * @param str 字符串
 * @returns 数值
 */
export const filterOutNumber = (str: string) => {
  const filterStr = str.replace(/[^0-9]/g, '')
  const outCount = filterStr !== '' ? Number(filterStr) : filterStr
  return outCount
}
/**
 * 地址参数计算
 * @param url 传入url
 * @param params 请求参数
 * @returns 拼接url
 */
export const paramsAnaly = (url: string, params: Record<string, any>) => {
  const queryStr = Object.keys(params).map((key) => `${key}=${params[key]}`)
  if (queryStr.length > 0) {
    url += '?' + queryStr.join('&')
  }
  return url
}
/**
 * 时间戳格式化(秒)
 * @param timestamp 格式化时间戳(秒)
 * @param format 格式化时间格式
 * @returns 格式时间字符串
 */
export const formatUnix = (timestamp: number, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs.unix(timestamp).format(format)
}
/**
 * 时间戳格式化(时长)
 * @param timeStamp 格式化时间戳(秒)
 * @returns 格式时长字符串
 */
export const formatMediatime = (timeStamp: number) => {
  let minute = Math.floor(timeStamp / 60).toString();
  let second = Math.floor(timeStamp - Number(minute) * 60).toString();
  second = second.length == 1 ? `0${second}` : second;
  minute = minute.length == 1 ? `0${minute}` : minute;
  return `${minute}:${second}`;
}
/**
 * 截取字符串
 * @param text 字符串
 * @param length 截取长度
 * @returns 截取字符串
 */
export const tailoringText = (text: string, length: number) => {
  if (typeof text === 'string' && text.length > length) {
    return text.substring(0, length - 2) + '...'
  }
  return text
}
/**
 * 颜色混合器
 * @param colorOne 颜色值
 * @param colorTwo 颜色值
 * @param ratio 混合比例
 * @returns 颜色
 */
export const blendColour = (colorOne: string, colorTwo: string, ratio: number) => {
  ratio = Math.max(Math.min(Number(ratio), 1), 0)
  const r1 = parseInt(colorOne.substring(1, 3), 16)
  const g1 = parseInt(colorOne.substring(3, 5), 16)
  const b1 = parseInt(colorOne.substring(5, 7), 16)
  const r2 = parseInt(colorTwo.substring(1, 3), 16)
  const g2 = parseInt(colorTwo.substring(3, 5), 16)
  const b2 = parseInt(colorTwo.substring(5, 7), 16)
  let r: string | number = Math.round(r1 * (1 - ratio) + r2 * ratio)
  let g: string | number = Math.round(g1 * (1 - ratio) + g2 * ratio)
  let b: string | number = Math.round(b1 * (1 - ratio) + b2 * ratio)
  r = ('0' + (r || 0).toString(16)).slice(-2)
  g = ('0' + (g || 0).toString(16)).slice(-2)
  b = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + r + g + b
}
/**
 * 将 hex 颜色转成 rgb
 * @param hex
 * @param opacity
 * @returns rgba String
 */
export const hexToRgba = (hex: string, opacity: number) => {
  const RGBA =
    'rgba(' +
    parseInt('0x' + hex.slice(1, 3)) +
    ',' +
    parseInt('0x' + hex.slice(3, 5)) +
    ',' +
    parseInt('0x' + hex.slice(5, 7)) +
    ',' +
    opacity +
    ')'
  return {
    red: parseInt('0x' + hex.slice(1, 3)),
    green: parseInt('0x' + hex.slice(3, 5)),
    blue: parseInt('0x' + hex.slice(5, 7)),
    rgba: RGBA
  }
}
/**
 * 生成递进的数组
 * @param start 开始数值
 * @param end 结束数值
 * @returns 递进的数组
 */
export const generateArray = (start: number, end: number) => {
  start = Number(start)
  end = Number(end)
  end = end > start ? end : start
  return [...Array(end + 1).keys()].slice(start)
}
/**
 * 自定义 Promise 等待
 * @param code 等待时间
 */
 export const awaitPromise = (code = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, code))
}

/**
 * 过滤为价格(两位小数点)
 * @param value 传入字符
 */
 export const filterPrice = (value: string) => {
  return value
    .replace(/^[^\d+]/, '')
    .replace(/[^\d{1,}.\d{1,}|\d{1,}]/g, '')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/\.{2,}/g, '.')
    .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
}