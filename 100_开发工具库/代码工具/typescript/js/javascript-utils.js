"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStrCode = exports.isStrCode = exports.isEmail = exports.isMobile = exports.isArray = exports.lockNumber = exports.splitArray = exports.forIn = exports.toggleClass = exports.removeClass = exports.addClass = exports.isClassName = void 0;
// 判断该类名存不存在
function isClassName(el, className) {
    return el.className.indexOf(className) !== -1;
}
exports.isClassName = isClassName;
// 添加类名
function addClass(el, className) {
    var isClassName = el.className.indexOf(className) !== -1;
    // 如果不存在类名，则添加类名
    if (!(el.className.indexOf(className) !== -1)) {
        el.className = el.className + ' ' + className;
    }
}
exports.addClass = addClass;
// 删除类名
function removeClass(el, className) {
    var isClassName = el.className.indexOf(className) !== -1;
    // 如果存在类名，则删除类名
    if (isClassName) {
        el.className = (' ' + el.className).replace(' ' + className, '').trim();
    }
}
exports.removeClass = removeClass;
// 切换类名
function toggleClass(el, className) {
    // addClass() removeClass()
    var isClassName = el.className.indexOf(className) !== -1;
    el.className = isClassName ? removeClass(el, className) : addClass(el, className);
}
exports.toggleClass = toggleClass;
// for in封装
function forIn(object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            callback(key, object[key]);
        }
    }
}
exports.forIn = forIn;
// 分隔二维数组
function splitArray(arr, len) {
    var arr_length = arr.length;
    var newArr = [];
    for (var i = 0; i < arr_length; i += len) {
        newArr.push(arr.slice(i, i + len));
    }
    return newArr;
}
exports.splitArray = splitArray;
// 锁定值在指定区间 [leftInterval, rightInterval]
function lockNumber(number, leftInter, rightInter) {
    if (number < leftInter) {
        number = leftInter;
    }
    if (number > rightInter) {
        number = rightInter;
    }
    return number; // 返回区间值
}
exports.lockNumber = lockNumber;
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
    // return Array.isArray(val)
    // return val.constructor === Array
    // return val.__proto__ === Array.prototype
    // return val instanceof Array
}
exports.isArray = isArray;
function isMobile(str) {
    return /^1[3456789]\d{9}$/.test(str);
}
exports.isMobile = isMobile;
function isEmail(str) {
    return /[A-Za-z0-9._%+-]+@@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(str);
}
exports.isEmail = isEmail;
function isStrCode(str) {
    return /<[\/\!]*[^<>]*>/ig.test(str);
}
exports.isStrCode = isStrCode;
function removeStrCode(str) {
    return str.replace(/<[\/\!]*[^<>]*>/ig, "");
}
exports.removeStrCode = removeStrCode;
// oLi.nodeName.toLowerCase() 获取标签名
// event.stopPropagation() 阻止冒泡
// event.preventDefault()  阻止默认行为
// dom.click() 模拟点击
// dom.focus() 赐予焦点
// dom.blur()  移除焦点
