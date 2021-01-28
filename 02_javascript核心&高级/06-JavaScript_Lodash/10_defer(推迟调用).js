const _ = require('./lib/lodash.min')
// _.defer(function (text) {
//   console.log(text);
// }, 'deferred');

const outStatistics = (a, b) => {
  return a + b
}

const done = _.memoize(outStatistics)

console.log(done(1, 2))
console.log(done(1, 4))