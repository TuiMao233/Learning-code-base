'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _module = require('./commt/module1');

var _module2 = require('./commt/module2');

var _module3 = require('./commt/module3');

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _module.fun1)();(0, _module.fun2)();
console.log(_module2.arr);
console.log(_module4.default);

(0, _jquery2.default)('body').append((0, _jquery2.default)('div'));
console.log((0, _jquery2.default)('body'));