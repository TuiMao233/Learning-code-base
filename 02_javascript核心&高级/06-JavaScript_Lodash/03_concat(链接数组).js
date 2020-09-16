const _ = require('./lib/lodash.min')
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

// console.log(other);
// => [1, 2, 3, [4]]

function concat(...args) {
  const newArray = []
  args.forEach(item => {
    if (Array.isArray(item)) {
      newArray.push(...item)
    }else {
      newArray.push(item)
    }
  })
  return newArray
}

console.log(concat(array, 2, [3], [[4]]))