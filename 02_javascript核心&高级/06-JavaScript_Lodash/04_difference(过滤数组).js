const _ = require('./lib/lodash.min')

_.difference([3, 2, 1], [4, 2])

function difference(array, filterArray = []) {
  return array.filter(item => {
    return typeof filterArray.find(filterItem => filterItem === item) === 'undefined'
  })
}
console.log(difference([3, 2, 1], [4, 2]))

// 其他扩展

_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
// => [3.1, 1.3]
 
// The `_.property` iteratee shorthand.
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]


var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];

console.log(_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual))
// => [{ 'x': 2, 'y': 1 }]