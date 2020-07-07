// 所以类名的操作
class domClass {
  // 判断该类名存不存在
  isClassName(el, className) {
    return el.className.indexOf(className) !== -1
  }
  // 添加类名
  addClass(el, className) {
    var isClassName = el.className.indexOf(className) !== -1
    // 如果不存在类名，则添加类名
    if (isClassName) { el.className = el.className + ' ' + className }
  }
  // 删除类名
  removeClass(el, className) {
    var isClassName = el.className.indexOf(className) !== -1
    // 如果存在类名，则删除类名
    if (isClassName) {
      el.className = (' ' + el.className).replace(' ' + className, '').trim()
    }
  }
  // 切换类名
  toggleClass(el, className) {
    // addClass() removeClass()
    var isClassName = el.className.indexOf(className) !== -1
    el.className = isClassName ? this.removeClass(el, className) : this.addClass(el, className)
  }
}
// for in封装
export function forIn(object, callback) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      callback(key, object[key])
    }
  }
  return object
}
// 分隔二维数组
export function splitArray(arr, len) {
  let arr_length = arr.length;
  let newArr = [];
  for (let i = 0; i < arr_length; i += len) {
    newArr.push(arr.slice(i, i + len));
  }
  return newArr;
}
// 锁定值在指定区间 [leftInterval, rightInterval]
export function lockNumber(number, leftInter, rightInter) {
  if (number < leftInter) { number = leftInter }
  if (number > rightInter) { number = rightInter }
  return number // 返回区间值
}
// 判断字符有没有代码字段
export function isStrCode(str) {
  return /<[\/\!]*[^<>]*>/ig.test(str)
}
// 剔除字符串代码字段
export function removeStrCode(str) {
  return str.replace(/<[\/\!]*[^<>]*>/ig, "")
}
// 格式化时间, 传入时间戳, 和时间格式
export function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
  const date = new Date(time);
  const year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();
  const preArr = Array.apply(null, Array(10)).map(function (elem, index) { return '0' + index; });
  //开个长度为10的数组 格式为 00 01 02 03 
  const newTime = format.replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec);
  return newTime;
}
// 检测数据类型功能函数
export function checkedTypeof(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}
// 实现深度克隆 ---> 对象/数组
export function clone(target) {
  // 判断拷贝的数据类型
  // 初始化变量result 称为最终克隆的数据
  let result, targetType = checkedTypeof(target)
  if (targetType === 'Object') { // 如果是obj
    result = {}
  } else if (targetType === 'Array') { // 如果是数组
    result = []
  } else { return target }
  for (item in target) {
    let bool = checkedTypeof(target[item]) !== 'Object' && checkedTypeof(target[item]) !== 'Array'
    result[item] = bool ? target[item] : clone(target[item])
  }
  return result
}
// oLi.nodeName.toLowerCase() 获取标签名
// event.stopPropagation() 阻止冒泡
// event.preventDefault()  阻止默认行为
// dom.click() 模拟点击
// dom.focus() 赐予焦点
// dom.blur()  移除焦点

