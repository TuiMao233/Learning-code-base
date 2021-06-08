/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-27 13:03:40
 * @LastEditTime: 2021-06-08 16:11:42
 * @Description: 浏览器工具集
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { blendColour, hexToRgba } from "./utils-currency";

// 监测浏览器环境
declare const WXEnvironment: any;
export const inBrowser = typeof window !== 'undefined'
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const isPhantomJS = UA && /phantomjs/.test(UA)
export const isFF = UA && UA.match(/firefox\/(\d+)/)

// oLi.nodeName.toLowerCase() 获取标签名
// event.stopPropagation() 阻止冒泡
// event.preventDefault()  阻止默认行为
// dom.click() 模拟点击
// dom.focus() 赐予焦点
// dom.blur()  移除焦点
/**
 * 判断该类名存不存在
 * @param el 判断元素
 * @param className 类名
 * @returns 是否存在
 */
export const isClassName = (el: HTMLElement, className: string) => {
  return el.className.indexOf(className) !== -1;
}
/**
 * 跳转到新的页面
 * @param url 跳转url
 */
export const ejectWindow = (url: string) => {
  const a = document.createElement('a')
  a.href = url
  a.target = "_blank"
  a.click()
}
/**
 * 判断当前是否是IE浏览器
 * @returns IE 版本 -1则代表不为 IE 浏览器
 */
export const getIeVersion = () => {
  // 取得浏览器的userAgent字符串
  const userAgent = navigator.userAgent
  // 判断是否IE<11浏览器
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
  // const isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion == 7) {
      return 7
    } else if (fIEVersion == 8) {
      return 8
    } else if (fIEVersion == 9) {
      return 9
    } else if (fIEVersion == 10) {
      return 10
    }
    return 6
  } else if (isIE11) {
    return 11
  }
  return -1 //不是ie或是edge浏览器
}
/**
 * 设置全局主题色
 * @param color 颜色值
 */
export const setThemeColor = (color: string) => {
  document.documentElement.style.setProperty('--color-primary', color)
  document.documentElement.style.setProperty(
    '--color-primary-dark-1',
    blendColour('#000000', color, 9)
  )
  for (let i = 1; i < 10; i++) {
    const cssLightVariable = `--color-primary-light-${i}`
    const cssLightOpacity = `--color-primary-light-opacity-${i}`
    document.documentElement.style.setProperty(cssLightOpacity, hexToRgba(color, 1 - i / 10).rgba)
    document.documentElement.style.setProperty(
      cssLightVariable,
      blendColour('#ffffff', color, 1 - i / 10)
    )
  }
}
/**
 * 动态设置HTML标签图标
 * @param path 图标路径
 */
export const setHtmlIconLink = (path:string) => {
  const link = document.querySelector<HTMLLinkElement>('#icon-link')
  if (!link) return false
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = path
  document.getElementsByTagName('head')[0].appendChild(link)
}