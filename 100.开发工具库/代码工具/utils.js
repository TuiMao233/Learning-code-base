export function isClassName(el, className) {// 判断该类名存不存在
    return el.className.indexOf(className) !== -1
}
export function addClass(el, className) {    // 添加类名
    var isClassName = el.className.indexOf(className) !== -1
    // 如果不存在类名，则添加类名
    if (!isClassName(el, className)) { el.className = el.className + ' ' + className }
}
export function removeClass(el, className) { // 删除类名
    var isClassName = el.className.indexOf(className) !== -1
    // 如果存在类名，则删除类名
    if (isClassName) {
        el.className = (' ' + el.className).replace(' ' + className, '').trim()
    }
}
export function toggleClass(el, className) { // 切换类名
    // addClass() removeClass()
    var isClassName = el.className.indexOf(className) !== -1
    el.className = isClassName ? removeClass(el, className) : addClass(el, className)
}
export function forIn(object, callback) {    // for in封装
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            callback(key, object[key])
        }
    }
}
export function splitArray(arr, len) { // 分隔二维数组
    let arr_length = arr.length;
    let newArr = [];
    for (let i = 0; i < arr_length; i += len) {
        console.log(i)
        newArr.push(arr.slice(i, i + len));
        console.log(i)
    }
    return newArr;
}
export function lockNumber(number, leftInter, rightInter) { // 锁定值在指定区间 [leftInterval, rightInterval]
    if (number < leftInterval) { number = leftInterval }
    if (number > rightInterval) { number = rightInterval }
    return number // 返回区间值
}
export function isArray(val) { // 判断数组
    return Object.prototype.toString.call(val) === '[object Array]'
    // return Array.isArray(val)
    // return val.constructor === Array
    // return val.__proto__ === Array.prototype
    // return val instanceof Array
}
export function isMobile(str) { // 手机号码判断
    return /^1[3456789]\d{9}$/.test(str)
}
export function isEmail(str) { // 邮箱验证
    return /[A-Za-z0-9._%+-]+@@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(str)
}
export function isStrCode(str) { // 判断字符有没有代码字段
    return /<[\/\!]*[^<>]*>/ig.test(str)
}
export function removeStrCode(str) { // 剔除字符串代码字段
    return str.replace(/<[\/\!]*[^<>]*>/ig, "")
}
// oLi.nodeName.toLowerCase() 获取标签名
// event.stopPropagation() 阻止冒泡
// event.preventDefault()  阻止默认行为
// dom.click() 模拟点击
// dom.focus() 赐予焦点
// dom.blur()  移除焦点

