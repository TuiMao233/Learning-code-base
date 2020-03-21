function isClassName(el, className) {// 判断该类名存不存在
    return el.className.indexOf(className) !== -1
}
function addClass(el, className) {    // 添加类名
    var isClassName = el.className.indexOf(className) !== -1
    // 如果不存在类名，则添加类名
    if (!isClassName(el, className)) { el.className = el.className + ' ' + className }
}
function removeClass(el, className) { // 删除类名
    var isClassName = el.className.indexOf(className) !== -1
    // 如果存在类名，则删除类名
    if (isClassName) {
        el.className = (' ' + el.className).replace(' ' + className, '').trim()
    }
}
function toggleClass(el, className) { // 切换类名
    // addClass() removeClass()
    var isClassName = el.className.indexOf(className) !== -1
    el.className = isClassName ? removeClass(el, className) : addClass(el, className)
}
function forIn(object, callback) {    // for in封装
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            callback(key, object[key])
        }
    }
}
function isArray(val) { // 判断数组
    return Object.prototype.toString.call(val) === '[object Array]'
    return Array.isArray(val)
    return val.constructor === Array
    return val.__proto__ === Array.prototype
    return val instanceof Array
}
function lockNumber(number, leftInter, rightInter) { // 锁定值在指定区间 [leftInterval, rightInterval]
    if (number < leftInterval) {
        number = leftInterval
    }
    if (number > rightInterval) {
        number = rightInterval
    }
    return number // 返回区间值
}
// oLi.nodeName.toLowerCase() 获取标签名
// event.stopPropagation() 阻止冒泡
// event.preventDefault()  阻止默认行为
// dom.click() 模拟点击
// dom.focus() 赐予焦点
// dom.blur()  移除焦点