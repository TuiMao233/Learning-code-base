const _ = require('./lib/lodash.min')

_.difference([3, 2, 1], [4, 2])

function difference(array, filterArray = []) {
  return array.filter(item => {
    return typeof filterArray.find(filterItem => filterItem === item) === 'undefined'
  })
}
console.log(difference([3, 2, 1], [4, 2]))