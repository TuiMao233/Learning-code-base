var module1 = require('./src/module1')
var module2 = require('./src/module2')
var module3 = require('./src/module3')

var uniq = require('uniq')

console.log(uniq([module1,module2,module3]))
