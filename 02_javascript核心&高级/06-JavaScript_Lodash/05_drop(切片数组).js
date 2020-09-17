const _ = require('./lib/lodash.min')

_.drop([1, 2, 3]);
// => [2, 3]

_.drop([1, 2, 3], 2);
// => [3]

_.drop([1, 2, 3], 5);
// => []

_.drop([1, 2, 3], 0);
// => [1, 2, 3]

function drop(array = [], index = 1) {
  return array.slice(index)
}
console.log(drop([1, 2, 3], 2))