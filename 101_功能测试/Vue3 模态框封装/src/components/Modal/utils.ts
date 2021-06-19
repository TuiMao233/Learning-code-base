/*
 * @Author: Mr.Mao
 * @Date: 2021-06-17 15:13:20
 * @LastEditTime: 2021-06-17 15:14:03
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { Component, h, render } from "vue"

/**
 * 渲染组件实例
 * @param Constructor 组件
 * @param props 组件参数
 * @returns 组件实例
 */
export const renderInstance = <T = Component>(Constructor: T, props: Record<string, any>) => {
  // 创建组件容器, 这一步是必须的, 在销毁组件时会使用到
  const container = document.createElement('div')

  // 在 props 添加组件消失钩子, 移除当前实例, 将销毁方法提供给组件
  // 这里不需要调用 document.body.removeChild(container.firstElementChild)
  // 因为调用 render(null, container) 为我们完成了这项工作
  props.vanish = () => {
    render(null, container)
  }

  // 创建虚拟节点, 渲染组件
  const vnode = h(Constructor, props)
  render(vnode, container)

  // 添加子元素至父元素
  if (container.firstElementChild) {
    document.body.appendChild(container.firstElementChild)
  }
}