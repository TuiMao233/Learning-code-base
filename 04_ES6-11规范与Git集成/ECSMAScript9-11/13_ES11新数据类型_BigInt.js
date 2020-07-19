// 大整型
let n = 521n
console.log(n) // 521n
console.log(typeof n) // bigint

// 函数
n = 123
console.log(BigInt(n))
// console.log(BigInt(1.2)) // 报错：不是整数

console.log('-------------------')

// 大数值运算
let max = Number.MAX_SAFE_INTEGER;
console.log(max)
console.log(max + 1)
console.log(max + 2)

console.log(BigInt(max))
console.log(BigInt(max)+ BigInt(1))
console.log(BigInt(max)+ BigInt(2))