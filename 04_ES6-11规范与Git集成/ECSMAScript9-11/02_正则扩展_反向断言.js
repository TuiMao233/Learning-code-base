/*
 * @Author: 毛先生
 * @Date: 2020-07-20 08:42:10
 * @LastEditTime: 2020-08-04 15:50:45
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
let str = '你知道么555啦啦啦'
// 正向断言: 匹配字符串后面(?=) 如果\d前面不是啦啦啦, 则不满足条件
const reg = /\d+(?=啦)/
const result = reg.exec(str)
// console.log(result[0]) // 555

// 反向断言: 匹配字符串前面(?<=) 如果\d后面不是么, 则不满足条件
const reg2 = /(?<=么)\d+/
const result2 = reg2.exec(str)
// console.log(result2[0])