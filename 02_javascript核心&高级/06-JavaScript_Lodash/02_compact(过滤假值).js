const _ = require('./lib/lodash.min')
console.log("lodash-compact: ", _.compact([0, 1, true, false, 2, '', undefined, NaN, 3]))

// 过滤为非假值数组
function compact(array) {
  return array.filter(item => {
    let notValue = false
    notValue = (
      !item ||
      typeof item === "undefined" ||
      isNaN(notValue)
    )
    return !notValue
  })
}
console.log("my-compact: ", compact([0, 1, true, false, 2, '', undefined, NaN, 3]))