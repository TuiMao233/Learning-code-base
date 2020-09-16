const _ = require('./lib/lodash.min')
console.log("lodash-chunk: ", _.chunk(['a', 'b', 'c', 'd', 'f'], 2))

// 拆分数组
function chunk(array, length) {
  // 新增数组
  const newArray = []
  // 判断循环的长度
  const maxLength = array.length % length ? array.length+length : array.length
  let count = 0
  for (let index = length; index <= maxLength; index += length) {
    newArray.push(array.slice(count, index))
    count = index
  }
  return newArray
}
console.log("my-chunk: ", chunk(['a', 'b', 'c', 'd'], 2))