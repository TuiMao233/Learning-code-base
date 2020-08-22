/*
 * @Author: 毛先生
 * @Date: 2020-07-10 09:22:49
 * @LastEditTime: 2020-08-19 12:08:03
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
// 检测数据类型; return: String
export const checkedTypeof = (target) => Object.prototype.toString.call(target).slice(8, -1)
// 剔除字符串代码字段; return: String
export const removeStrCode = str => str.replace(/<[\/\!]*[^<>]*>/ig, "")

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
// 传入字符串和长度, 返回字符串, 超出长度以...展示
export function strEllipsis(str = '', length = 30) {
  if (str.length > length)
    return str.slice(0, length).trim() + '...'
  else
    return str
}

/** 格式化时间戳
 * @param {String} time 传入的时间戳
 * @param {String} format 需要转换的格式
 * @returns {String} 2019-12-26 12:06:00
 */
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
// 反编译日期格式
export function formatRelieve(date_str = "2020-06-10") {
  const date = date_str.replace(/-/g, '/')
  const timestamp = new Date(date).getTime()
  return timestamp
}
// 过滤空的与不必要数据
export function clearUseless({ target, clear_keys }) {
  const exp = new RegExp(clear_keys)
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      const isNotNull = !(!target[key] && typeof (target[key]) != "undefined" && target[key] != 0)
      if (isNotNull) {
        exp.test(key) && delete target[key]
      } else {
        delete target[key]
      }
      if (typeof target[key] == 'object') {
        target[key] = clearUseless({ target: target[key], clear_keys })
      }
    }
  }
  return target
}
// 按需拷贝对象
const object = {
  id: 6,
  username: "毛先生",
  carshop: {
    address: "广东省惠州市"
  }
}
const cloneObject = appointClone({
  target: object,
  clone_keys: `
  
  `
})
console.log(cloneObject)

function appointClone({ target, clone_keys }) {
  const new_object = {}

  return new_object
}