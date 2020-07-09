// 判断字符有没有代码字段
export function isStrCode(str) {
  return /<[\/\!]*[^<>]*>/ig.test(str)
}
// 剔除字符串代码字段
export function removeStrCode(str) {
  return str.replace(/<[\/\!]*[^<>]*>/ig, "")
}
// 检测数据类型功能函数
export function checkedTypeof(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}