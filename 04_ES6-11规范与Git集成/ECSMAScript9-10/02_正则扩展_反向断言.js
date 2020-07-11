let str = 'JS521131314你知道么555啦啦啦'
// 正向断言: 匹配字符串后面(?=) 如果\d前面不是啦啦啦, 则不满足条件
const reg = /\d+(?=啦)/
const result = reg.exec(str)
console.log(result[0]) // 555

// 反向断言: 匹配字符串前面(?<=) 如果\d后面不是么, 则不满足条件
const reg2 = /(?<=么)\d+/
const result2 = reg2.exec(str)
console.log(result2[0])