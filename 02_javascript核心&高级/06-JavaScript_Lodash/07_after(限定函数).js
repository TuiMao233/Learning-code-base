const _ = require('./lib/lodash.min')

// n次后调用
var saves = ['profile', 'settings'];
var afterDone = _.after(saves.length, function() {
  console.log('afterDone');
});
// afterDone()
// afterDone()

// 不超n次后调用
var beforeDone =_.before(5, function() {
  console.log('beforeDone')
})
beforeDone()
beforeDone()
beforeDone()
beforeDone()
beforeDone()
