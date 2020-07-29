// 判断该类名存不存在
export const isClassName = (el, className) => {
  return el.className.indexOf(className) !== -1;
}
// 添加类名
export const addClass = (el, className) => {
  var isClassName = el.className.indexOf(className) !== -1
  // 如果不存在类名，则添加类名
  if (isClassName) { el.className = el.className + ' ' + className }
}
// 删除类名
export const removeClass = (el, className) => {
  // addClass() removeClass()
  var isClassName = el.className.indexOf(className) !== -1
  el.className = isClassName ? removeClass(el, className) : addClass(el, className)
}
// 切换类名
export const toggleClass = (el, className) => {
  // addClass() removeClass()
  var isClassName = el.className.indexOf(className) !== -1
  el.className = isClassName ? removeClass(el, className) : addClass(el, className)
}

// 跳转到新的页面
export const ejectWindow = url => {
  const a = document.createElement('a')
  a.href = "http://wpa.qq.com/msgrd?v=3&uin=951416545&site=qq&menu=yes"
  a.target = "_blank"
  a.click()
}

// oLi.nodeName.toLowerCase() 获取标签名
// event.stopPropagation() 阻止冒泡
// event.preventDefault()  阻止默认行为
// dom.click() 模拟点击
// dom.focus() 赐予焦点
// dom.blur()  移除焦点