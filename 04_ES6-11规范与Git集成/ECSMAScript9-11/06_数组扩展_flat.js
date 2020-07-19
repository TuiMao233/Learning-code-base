// flat: 将多维数组转换为低维数组
const arr = [1, 2, 3, 4, [5, 6, [7, 8, 9]]]
// 参数为转换深度, 是一个数字
console.log(arr.flat(2))

// flatMap: 遍历如果返回的是多维数组, 转换为低维数组
const arr = [1,2,3,4]
const result = arr.flatMap(item=> [item*10])