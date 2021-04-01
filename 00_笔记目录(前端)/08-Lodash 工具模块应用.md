## Lodash 简介

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

Lodash 遵循 MIT 开源协议发布，并且支持最新的运行环境。 查看各个构件版本的区别并选择一个适合你的版本。

该笔记为记录比较常用的方法，一些可通过 ES6 方式实现的，以及不是很重要的都进行了跳过和筛选，为个人使用记录文档。

### 安装

浏览器环境：

~~~html
<script src="lodash.js"></script>
~~~

通过 npm：

~~~makefile
$ npm i -g npm
$ npm i --save lodash
~~~

Node.js：

~~~js
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
~~~

### 为什么是 Lodash ？

Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。 Lodash 的模块化方法 非常适用于：

- 遍历 array、object 和 string
- 对值进行操作和检测
- 创建符合功能的函数

### 补充工具

- [futil-js](https://github.com/smartprocure/futil-js) 是一套用来补足 lodash 的实用工具集。

## 数组类方法 

### 数组分割（chunk）

将数组（array）拆分成多个 `size` 长度的区块，并将这些区块组成一个新数组。 如果`array` 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

~~~js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
~~~

### 过滤非真值（compact）

创建一个新数组，包含原数组中所有的非假值元素。例如`false`, `null`,`0`, `""`, `undefined`, 和 `NaN` 都是被认为是“假值”。

~~~js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
~~~

### 值与数组链接（concat）

创建一个新数组，将`array`与任何数组 或 值连接在一起。

~~~js
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]
~~~

### 对数组值进行过滤（difference）

创建一个具有唯一`array`值的数组，每个值不包含在其他给定的数组中。

~~~js
_.difference([3, 2, 1], [4, 2]);
// => [3, 1]
~~~

接收接受一个 `iteratee` （注：迭代器），调用`array` 和 `values` 中的每个元素以比较产生值。

~~~js
_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
// => [3.1, 1.3]
 
// The `_.property` iteratee shorthand.
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]
~~~

接受一个 `comparator` （注：比较器），调用比较`array`，`values`中的元素。 结果值是从第一数组中选择。

~~~js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 
_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]
~~~

### 数组切片（drop）

创建一个切片数组，去除`array`前面的`n`个元素。（`n`默认值为1。）

~~~js
_.drop([1, 2, 3]);
// => [2, 3]
 
_.drop([1, 2, 3], 2);
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
~~~

创建一个切片数组，去除`array`尾部的`n`个元素。（`n`默认值为1。）

~~~js
_.dropRight([1, 2, 3]);
// => [1, 2]
 
_.dropRight([1, 2, 3], 2);
// => [1]
 
_.dropRight([1, 2, 3], 5);
// => []
 
_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
~~~

### 数组填充（fill）

使用 `value` 值来填充（替换） `array`，从`start`位置开始, 到`end`位置结束（但不包含`end`位置）。

~~~js
var array = [1, 2, 3];
 
_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']
~~~

代替方法（array.fill）

~~~js
var array = [1, 2, 3].fill('a')
console.log(array);
// => ['a', 'a', 'a']
~~~

### 数组降维（flatten）

减少一级`array`嵌套深度。

~~~js
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
~~~

将`array`递归为一维数组。

~~~js
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
~~~

根据 `depth` 递归减少 `array` 的嵌套层级

~~~js
var array = [1, [2, [3, [4]], 5]];
 
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
 
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
~~~

替代方案（flat or flatMap）

~~~js
// flat: 将多维数组转换为低维数组
const arr = [1, 2, 3, 4, [5, 6, [7, 8, 9]]]
// 参数为转换深度, 是一个数字
console.log(arr.flat(2))

// flatMap: 遍历如果返回的是多维数组, 转换为低维数组
const arr = [1,2,3,4]
const result = arr.flatMap(item=> [item*10])
~~~

### 二维数组转换为对象（fromPairs）

根据二维数组返回一个由键值对`pairs`构成的对象。

~~~js
_.fromPairs([['fred', 30], ['barney', 40]]);
// => { 'fred': 30, 'barney': 40 }
~~~

代替方案（Object.fromEntries）

~~~js
const result = Object.fromEntries([
  ['name', '尚硅谷'],
  ['xueke', 'Java,大数据,前端,云计算']
])
console.log(result) // 0> {name:xueke, 尚硅谷:Java...}

const m = new Map()
m.set('name', 'ATGUIGU')
const result2 = Object.fromEntries(m)
console.log(result2) // -> name:ATGUIGU

// Object.entries (ES8)
const arr = Object.entries({
  name: '尚硅谷'
})
console.log(arr)
~~~

### 相等性比较唯一数组（intersection）

创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)进行相等性比较。（注：可以理解为给定数组的交集）

~~~js
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
~~~

### 移除指定元素值（pull）

移除数组`array`中所有和给定值相等的元素，使用[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 进行全等比较。

~~~js
var array = [1, 2, 3, 1, 2, 3];
_.pull(array, 2, 3);
console.log(array);
// => [1, 1]
~~~

这个方法类似[`_.pull`](https://www.lodashjs.com/docs/lodash.pullAll#pull)，区别是这个方法接收一个要移除值的数组。

~~~js
var array = [1, 2, 3, 1, 2, 3];
_.pullAll(array, [2, 3]);
console.log(array);
// => [1, 1]
~~~

### 根据索引移除元素（pullAt）

根据索引 `indexes`，移除`array`中对应的元素，并返回被移除元素的数组。

~~~js
var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);
 
console.log(array);
// => [5, 15]
 
console.log(evens);
// => [10, 20]
~~~

替代方案（array.splice）

### 排序并去重（sortedUniq）

这个方法类似[`_.uniq`](https://www.lodashjs.com/docs/lodash.sortedUniq#uniq)，除了它会优化排序数组。

~~~js
_.sortedUniq([1, 1, 2]);
// => [1, 2]
~~~

### 数组去重（uniq）

创建一个去重后的`array`数组副本。使用了[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 做等值比较。只有第一次出现的元素才会被保留。

~~~js
_.uniq([2, 1, 2]);
// => [2, 1]
~~~

## 集合类方法

### 检测是否都为真（every）

通过 `predicate`（断言函数） 检查 `collection`（集合）中的 **所有** 元素是否都返回真值。一旦 `predicate`（断言函数） 返回假值，迭代就马上停止。`predicate`（断言函数）调用三个参数： *(value, index|key, collection)*。

~~~js
_.every([true, 1, null, 'yes'], Boolean);
// => false
 
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false
 
// The `_.matchesProperty` iteratee shorthand.
_.every(users, ['active', false]);
// => true
 
// The `_.property` iteratee shorthand.
_.every(users, 'active');
// => false
~~~

### 过滤集合（filter）

~~~js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
~~~

### 遍历集合（forEach）

~~~js
_([1, 2]).forEach(function(value) {
  console.log(value);
});
// => Logs `1` then `2`.
 
_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
~~~

### 检测元素是否存在（includes）

检查 `value`(值) 是否在 `collection`(集合) 中。如果 `collection`(集合)是一个字符串，那么检查 `value`（值，子字符串） 是否在字符串中， 否则使用[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 做等值比较。 如果指定 `fromIndex` 是负数，那么从 `collection`(集合) 的结尾开始检索。

~~~js
_.includes([1, 2, 3], 1);
// => true
 
_.includes([1, 2, 3], 1, 2);
// => false
 
_.includes({ 'user': 'fred', 'age': 40 }, 'fred');
// => true
 
_.includes('pebbles', 'eb');
// => true
~~~

### 遍历并返回映射（map）

创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。 iteratee（迭代函数）调用3个参数：
(value, index|key, collection).

~~~js
function square(n) {
  return n * n;
}
 
_.map([4, 8], square);
// => [16, 64]
 
_.map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (iteration order is not guaranteed)
 
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
 
// The `_.property` iteratee shorthand.
_.map(users, 'user');
// => ['barney', 'fred']
~~~

### 遍历并返回统计（reduce）

压缩 `collection`（集合）为一个值，通过 `iteratee`（迭代函数）遍历 `collection`（集合）中的每个元素，每次返回的值会作为下一次迭代使用(注：作为`iteratee`（迭代函数）的第一个参数使用)。 如果没有提供 `accumulator`，则 `collection`（集合）中的第一个元素作为初始值。(注：`accumulator`参数在第一次迭代的时候作为`iteratee`（迭代函数）第一个参数使用。) iteratee 调用4个参数：
*(accumulator, value, index|key, collection)*.

~~~js
_.reduce([1, 2], function(sum, n) {
  return sum + n;
}, 0);
// => 3
 
_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
  (result[value] || (result[value] = [])).push(key);
  return result;
}, {});
// => { '1': ['a', 'c'], '2': ['b'] } (无法保证遍历的顺序)
~~~

### 返回随机元素值（sample）

从`collection`（集合）中获得一个随机元素。

~~~js
_.sample([1, 2, 3, 4]);
// => 2
~~~

### 打乱元素顺序（shuffle）

创建一个被打乱值的集合。 使用[Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle) 版本。

~~~js
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
~~~

### 返回集合长度（size）

返回`collection`（集合）的长度，如果集合是类数组或字符串，返回其 length ；如果集合是对象，返回其可枚举属性的个数。

~~~js
_.size([1, 2, 3]);
// => 3
 
_.size({ 'a': 1, 'b': 2 });
// => 2
 
_.size('pebbles');
// => 7
~~~

## 函数类方法

### 限定：n次后调用（after）

[`_.before`](https://www.lodashjs.com/docs/lodash.after#before)的反向函数;此方法创建一个函数，当他被调用`n`或更多次之后将马上触发`func` 。

~~~js
var saves = ['profile', 'settings'];
 
var done = _.after(saves.length, function() {
  console.log('done saving!');
});
 
_.forEach(saves, function(type) {
  asyncSave({ 'type': type, 'complete': done });
});
~~~

### 限制参数（ary）

创建一个调用`func`的函数。调用`func`时最多接受 `n`个参数，忽略多出的参数。

~~~js
_.map(['6', '8', '10'], _.ary(parseInt, 1));
// => [6, 8, 10]
~~~

### 限定：超n次后不调用（before）

创建一个调用`func`的函数，通过`this`绑定和创建函数的参数调用`func`，调用次数不超过 `n` 次。 之后再调用这个函数，将返回一次最后调用`func`的结果。

~~~js
jQuery(element).on('click', _.before(5, addContactToList));
// => 允许将最多4个联系人添加到列表中
~~~

### 参数量返回结果或函数（curry）

创建一个函数，该函数接收 `func` 的参数，要么调用`func`返回的结果，如果 `func` 所需参数已经提供，则直接返回 `func` 所执行的结果。或返回一个函数，接受余下的`func` 参数的函数，可以使用 `func.length` 强制需要累积的参数个数。

~~~js
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curry(abc);
 
curried(1)(2)(3);
// => [1, 2, 3]
 
curried(1, 2)(3);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
~~~

### 防抖动函数（debounce）

创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `func` 方法。 debounced（防抖动）函数提供一个 `cancel` 方法取消延迟的函数调用以及 `flush` 方法立即调用。 可以提供一个 options（选项） 对象决定如何调用 `func` 方法，`options.leading` 与|或 `options.trailing` 决定延迟前后如何触发（注：是 先调用后等待 还是 先等待后调用）。 `func` 调用时会传入最后一次提供给 debounced（防抖动）函数 的参数。 后续调用的 debounced（防抖动）函数返回是最后一次 `func` 调用的结果。

~~~js
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 
// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
 
// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
 
// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
~~~

### 限定：堆栈清空后（defer）

推迟调用`func`，直到当前堆栈清理完毕。 调用时，任何附加的参数会传给`func`。

~~~js
_.defer(function(text) {
  console.log(text);
}, 'deferred');
// => 一毫秒或更久一些输出 'deferred'。
~~~

### 缓存返回内容（memoize）

创建一个会缓存 `func` 结果的函数。 如果提供了 `resolver` ，就用 resolver 的返回值作为 key 缓存函数的结果。 默认情况下用第一个参数作为缓存的 key。 `func` 在调用时 `this` 会绑定在缓存函数上。

~~~js
var object = { 'a': 1, 'b': 2 };
var other = { 'c': 3, 'd': 4 };
 
var values = _.memoize(_.values);
values(object);
// => [1, 2]
 
values(other);
// => [3, 4]
 
object.a = 2;
values(object);
// => [1, 2]
 
// 修改结果缓存。
values.cache.set(object, ['a', 'b']);
values(object);
// => ['a', 'b']
 
// 替换 `_.memoize.Cache`。
_.memoize.Cache = WeakMap;
~~~

### 函数结果取反（negate）

创建一个针对断言函数 `func` 结果取反的函数。 `func` 断言函数被调用的时候，`this` 绑定到创建的函数，并传入对应参数。

~~~js
function isEven(n) {
  return n % 2 == 0;
}
 
_.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
// => [1, 3, 5]
~~~

### 仅调用一次（once）

创建一个只能调用 `func` 一次的函数。 重复调用返回第一次调用的结果。 `func` 调用时， `this` 绑定到创建的函数，并传入对应参数。

~~~js
var initialize = _.once(createApplication);
initialize();
initialize();
// `initialize` 只能调用 `createApplication` 一次。
~~~

### 频率节流函数（throttle）

创建一个节流函数，在 wait 秒内最多执行 `func` 一次的函数。 该函数提供一个 `cancel` 方法取消延迟的函数调用以及 `flush` 方法立即调用。 可以提供一个 options 对象决定如何调用 `func` 方法， options.leading 与|或 options.trailing 决定 wait 前后如何触发。 `func` 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 `func` 调用的结果。

~~~js
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 
// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);
 
// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
~~~

## 语言类方法

### 强制转换数组（castArray）

如果 `value` 不是数组, 那么强制转为数组。

~~~js
_.castArray(1);
// => [1]
 
_.castArray({ 'a': 1 });
// => [{ 'a': 1 }]
 
_.castArray('abc');
// => ['abc']
 
_.castArray(null);
// => [null]
 
_.castArray(undefined);
// => [undefined]
 
_.castArray();
// => []
 
var array = [1, 2, 3];
console.log(_.castArray(array) === array);
// => true
~~~

### 数值浅拷贝（clone）

创建一个 `value` 的浅拷贝。

~~~js
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true
~~~

### 数值深拷贝（cloneDeep）

这个方法类似[`_.clone`](https://www.lodashjs.com/docs/lodash.cloneDeep#clone)，除了它会递归拷贝 `value`。（注：也叫深拷贝）。

~~~js
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
~~~

### 断言检测值（conformsTo）

~~~js
var object = { 'a': 1, 'b': 2 };
 
_.conformsTo(object, { 'b': function(n) { return n > 1; } });
// => true
 
_.conformsTo(object, { 'b': function(n) { return n > 2; } });
// => false
~~~

### 数值检测（is[type]）

检查 `value` 是否是 `Array` 类对象。

~~~js
_.isArray([1, 2, 3]);
// => true
~~~

检查 `value` 是否是 `ArrayBuffer` 对象。

~~~js
_.isArrayBuffer(new ArrayBuffer(2));
// => true
~~~

检查 `value` 是否是原始 `boolean` 类型或者对象。

~~~js
_.isBoolean(false);
// => true
~~~

检查 `value` 是否是个 `buffer`。

~~~js
_.isBuffer(new Buffer(2));
// => true
~~~

检查 `value` 是否是 `Date` 对象。

~~~js
_.isDate(new Date); 
// => true
~~~

检查 `value` 是否是可能是 DOM 元素。

~~~js
_.isElement(document.body);
// => true
~~~

检查 `value` 是否是 `Function` 对象。

~~~js
_.isFunction(_);
// => true
~~~

检查 `value` 是否为一个整数。

~~~js
_.isInteger(3);
// => true
~~~

检查 `value` 是否是 `NaN`。

**注意:** 这个方法基于[`Number.isNaN`](https://mdn.io/Number/isNaN)，和全局的[`isNaN`](https://mdn.io/isNaN) 不同之处在于，全局的[`isNaN`](https://mdn.io/isNaN)对 于 `undefined` 和其他非数字的值返回 `true`。

~~~js
_.isNaN(NaN);
// => true
~~~

检查 `value` 是否是 `null` 或者 `undefined`。

~~~js
_.isNil(null);
// => true
~~~

检查 `value`alue 是否是 `null`。

~~~js
_.isNull(null);
// => true
~~~

检查 `value` 是否是原始`Number`数值型 或者 对象。

~~~js
_.isNumber(3);
// => true
~~~

检查 `value` 是否为`RegExp`对象。

~~~js
_.isRegExp(/abc/);
// => true
~~~

### 深比较值相等（isEqual）

~~~js
var object = { 'a': 1 };
var other = { 'a': 1 };
_.isEqual(object, other);
// => true
~~~

## 数学类方法

### 向上取整（ceil）

根据 `precision`（精度） 向上舍入 `number`。（注： `precision`（精度）可以理解为保留几位小数。）

~~~js
_.ceil(4.006);
// => 5
 
_.ceil(6.004, 2);
// => 6.01
 
_.ceil(6040, -2);
// => 6100
~~~

### 向下取整（floor）

根据 `precision`（精度） 向下舍入 `number`。（注： `precision`（精度）可以理解为保留几位小数。）

~~~js
_.floor(4.006);
// => 4
 
_.floor(0.046, 2);
// => 0.04
 
_.floor(4060, -2);
// => 4000
~~~

### 数组最大值（max）

计算 `array` 中的最大值。 如果 `array` 是 空的或者假值将会返回 `undefined`。

~~~js
_.max([4, 2, 8, 6]);
// => 8
 
_.max([]);
// => undefined
~~~

### 数组平均值（mean）

计算 `array` 的平均值。

~~~js
_.mean([4, 2, 8, 6]);
// => 5
~~~

### 数组最小值（min）

计算 `array` 中的最小值。 如果 `array` 是 空的或者假值将会返回 `undefined`。

~~~js
_.min([4, 2, 8, 6]);
// => 2
 
_.min([]);
// => undefined
~~~

### 四舍五入（round）

~~~js
_.round(4.006);
// => 4
 
_.round(4.006, 2);
// => 4.01
 
_.round(4060, -2);
// => 4100
~~~

### 数组总值（sum）

~~~js
_.sum([4, 2, 8, 6]);
// => 20
~~~

## 数字类方法

### 限制区间值（clamp）

返回限制在 `lower` 和 `upper` 之间的值。

~~~js
_.clamp(-10, -5, 5);
// => -5
 
_.clamp(10, -5, 5);
// => 5
~~~

### 随机区间值（random）

产生一个包括 `lower` 与 `upper` 之间的数。 如果只提供一个参数返回一个`0`到提供数之间的数。 如果 `floating` 设为 `true`，或者 `lower` 或 `upper` 是浮点数，结果返回浮点数。

~~~js
_.random(0, 5);
// => an integer between 0 and 5
 
_.random(5);
// => also an integer between 0 and 5
 
_.random(5, true);
// => a floating-point number between 0 and 5
 
_.random(1.2, 5.2);
// => a floating-point number between 1.2 and 5.2
~~~

## 对象类方法

### 取路径值为数组（at）

创建一个数组，值来自 `object` 的`paths`路径相应的值。

~~~js
var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
_.at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]
~~~

### 分配并合并（defaults）

~~~js
_.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
// => { 'a': 1, 'b': 2 }
_.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
// => { 'a': { 'b': 2, 'c': 3 } }
~~~

### 遍历对象（forIn）

使用 `iteratee` 遍历对象的自身和继承的可枚举属性。 `iteratee` 会传入3个参数：*(value, key, object)*。 如果返回 `false`，`iteratee` 会提前退出遍历。

~~~js
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.forIn(new Foo, function(value, key) {
  console.log(key);
});
// => Logs 'a', 'b', then 'c' (无法保证遍历的顺序)。
~~~

### 取路径值（get）

根据 `object`对象的`path`路径获取值。 如果解析 value 是 `undefined` 会以 `defaultValue` 取代。

~~~js
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'
~~~

### 是否存在路径（has）

检查 `path` 是否是`object`对象的直接属性。

~~~js
var object = { 'a': { 'b': 2 } };
var other = _.create({ 'a': _.create({ 'b': 2 }) });
 
_.has(object, 'a');
// => true
 
_.has(object, 'a.b');
// => true
 
_.has(object, ['a', 'b']);
// => true
 
_.has(other, 'a');
// => false
~~~

### 移除路径（unset）

移除`object`对象 `path` 路径上的属性。

~~~js
var object = { 'a': [{ 'b': { 'c': 7 } }] };
_.unset(object, 'a[0].b.c');
// => true
 
console.log(object);
// => { 'a': [{ 'b': {} }] };
 
_.unset(object, ['a', '0', 'b', 'c']);
// => true
 
console.log(object);
// => { 'a': [{ 'b': {} }] };
~~~

### 创建过滤对象（pickBy）

创建一个对象，这个对象组成为从 `object` 中经 `predicate` 判断为真值的属性。 `predicate`调用2个参数：*(value, key)*。

~~~js
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pickBy(object, _.isNumber);
// => { 'a': 1, 'c': 3 }
~~~

### 返回第一个参数（identity）

这个方法返回首个提供的参数。

~~~js
var object = { 'a': 1 };
 
console.log(_.identity(object) === object);
// => true
~~~

## 字符串类方法

### 转换驼峰（camelCase）

转换字符串`string`为[驼峰写法](https://en.wikipedia.org/wiki/CamelCase)。

~~~js
_.camelCase('Foo Bar');
// => 'fooBar'
 
_.camelCase('--foo-bar--');
// => 'fooBar'
 
_.camelCase('__FOO_BAR__');
// => 'fooBar'
~~~

### 首字母大写（capitalize）

转换字符串`string`首字母为大写，剩下为小写。

~~~js
_.capitalize('FRED');
// => 'Fred'
~~~

### 检测尾部字符（endsWith）

检查字符串`string`是否以给定的`target`字符串结尾。

~~~js
_.endsWith('abc', 'c');
// => true
 
_.endsWith('abc', 'b');
// => false
 
_.endsWith('abc', 'b', 2);
// => true
~~~

###  转换中划线分开（kebabCase）

转换字符串`string`为[kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).

~~~js
_.kebabCase('Foo Bar');
// => 'foo-bar'
 
_.kebabCase('fooBar');
// => 'foo-bar'
 
_.kebabCase('__FOO_BAR__');
// => 'foo-bar'
~~~

### 转换空格分开（lowerCase）

转换字符串`string`以空格分开单词，并转换为小写。

~~~js
_.lowerCase('--Foo-Bar--');
// => 'foo bar'
 
_.lowerCase('fooBar');
// => 'foo bar'
 
_.lowerCase('__FOO_BAR__');
// => 'foo bar'
~~~

### 转换下划线分开（snakeCase）

~~~js
_.snakeCase('Foo Bar');
// => 'foo_bar'
 
_.snakeCase('fooBar');
// => 'foo_bar'
 
_.snakeCase('--FOO-BAR--');
// => 'foo_bar'
~~~

### 首字母小写（lowerFirst）

转换字符串`string`的首字母为小写。

~~~js
_.lowerFirst('Fred');
// => 'fred'
 
_.lowerFirst('FRED');
// => 'fRED'
~~~

### 小于长度则左右填充（pad）

如果`string`字符串长度小于 `length` 则从左侧和右侧填充字符。 如果没法平均分配，则截断超出的长度。

~~~js
_.pad('abc', 8);
// => '  abc   '
 
_.pad('abc', 8, '_-');
// => '_-abc_-_'
 
_.pad('abc', 3);
// => 'abc'

_.padEnd('abc', 6);
// => 'abc   '

_.padStart('abc', 6);
// => '   abc'
~~~

### 重复 N 次字符串（repeat）

~~~js
_.repeat('*', 3);
// => '***'
 
_.repeat('abc', 2);
// => 'abcabc'
 
_.repeat('abc', 0);
// => ''
~~~

### 预编译模板（template）

创建一个预编译模板方法，可以插入数据到模板中 "interpolate" 分隔符相应的位置。 HTML会在 "escape" 分隔符中转换为相应实体。 在 "evaluate" 分隔符中允许执行JavaScript代码。 在模板中可以自由访问变量。 如果设置了选项对象，则会优先覆盖[`_.templateSettings`](https://www.lodashjs.com/docs/lodash.template#templateSettings) 的值。

~~~js
// 使用 "interpolate" 分隔符创建编译模板
var compiled = _.template('hello <%= user %>!');
compiled({ 'user': 'fred' });
// => 'hello fred!'
 
// 使用 HTML "escape" 转义数据的值
var compiled = _.template('<b><%- value %></b>');
compiled({ 'value': '<script>' });
// => '<b><script></b>'
 
// 使用 "evaluate" 分隔符执行 JavaScript 和 生成HTML代码
var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 在 "evaluate" 分隔符中使用内部的 `print` 函数
var compiled = _.template('<% print("hello " + user); %>!');
compiled({ 'user': 'barney' });
// => 'hello barney!'
 
// 使用 ES 分隔符代替默认的 "interpolate" 分隔符
var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'
 
// 使用自定义的模板分隔符
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = _.template('hello {{ user }}!');
compiled({ 'user': 'mustache' });
// => 'hello mustache!'
 
// 使用反斜杠符号作为纯文本处理
var compiled = _.template('<%= "\\<%- value %\\>" %>');
compiled({ 'value': 'ignored' });
// => '<%- value %>'
 
// 使用 `imports` 选项导入 `jq` 作为 `jQuery` 的别名
var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 使用 `sourceURL` 选项指定模板的来源URL
var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
compiled(data);
// => 在开发工具的 Sources 选项卡 或 Resources 面板中找到 "greeting.jst"
 
// 使用 `variable` 选项确保在编译模板中不声明变量
var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
compiled.source;
// => function(data) {
//   var __t, __p = '';
//   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
//   return __p;
// }
 
// 使用 `source` 特性内联编译模板
// 便以查看行号、错误信息、堆栈
fs.writeFileSync(path.join(cwd, 'jst.js'), '\
  var JST = {\
    "main": ' + _.template(mainText).source + '\
  };\
');
~~~

### 截断字符串且指定后缀（truncate）

截断`string`字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."。

~~~js
_.truncate('hi-diddly-ho there, neighborino');
// => 'hi-diddly-ho there, neighbo...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': ' '
});
// => 'hi-diddly-ho there,...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': /,? +/
});
// => 'hi-diddly-ho there...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'omission': ' [...]'
});
// => 'hi-diddly-ho there, neig [...]'
~~~

### 拆分词语为数组（words）

拆分字符串`string`中的词为数组 。

~~~js
_.words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']
 
_.words('fred, barney, & pebbles', /[^, ]+/g);
// => ['fred', 'barney', '&', 'pebbles']
~~~

