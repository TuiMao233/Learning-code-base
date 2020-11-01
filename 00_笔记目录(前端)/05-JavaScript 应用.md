---
title: JavaScript 应用
date: 2020-11-01
categories:
  - 
tags: 
  - javascript
---
## javaScript 的基本语法

### 数据类型

~~~js
// 基本数据类型
"你妈的"; // 字符串（String）
110; // 数字(Number)
true; false; // 布尔(Boolean)
null; // 对空（Null）
undefined; // 未定义（Undefined）
Symbol(66) // 独一无二的值(Symbol)

// 引用数据类型
{day:110} // 对象(Object) 通常对应着key与val值
[110, 110] // 数组(Array) 通常放置元素值, 多个值与逗号分隔
function fun_name() {} // 函数(Function) 通常用于特定场合执行大括号内的代码块
~~~

### 赋值操作

定义数据的引用名称。

~~~js
// 代码块作用域: 在花括号内的变量代表花括号内特有的变量
// 函数内作用域: 在函数内部的变量代表函数内特有的变量
const num = 110   // 定义一个不可修改的常量 (代码块作用域)
let bool = false  // 定义一个可修改的变量 (代码块作用域)
var str = "你妈的" // 定义一个可修改的变量 (函数内作用域)
~~~

### 条件判断

~~~js
// if:当条件为成功时, 执行特定代码块内代码, ifElse:当条件为失败时, 执行特定代码块内代码
if(true){
  // ....
}else{
  // ....
}
// switch: 该值等于特定值时, 执行对应的caseBreak内的代码, 当都不满足条件时, 执行defaultBreak内的代码
switch (key) {
	case "666":
    // ...
		break;
  default:
    // ...
		break;
}
~~~

### 函数的语法API

**定义函数**

~~~js
function fun_name (){
  // ...
}
// 当函数执行时, 会调用执行函数内部代码块
fun_name()
~~~

**函数具有提升**

~~~js
fun_name() // 不会报错
function fun_name (){
  // ...
}
~~~

**匿名函数(自调用函数)**

~~~js
(function(){
	document.write('wo hao');
})();
~~~

## 强制数值类型转换

### 强制转换Boolean值

~~~js
var a = 123;
//a = Boolean(a);  true
a = -123; //true
a = 0; //false
a = Infinity; //true
a = NaN; //false
~~~

### 强制转换Number值

**转换方式一： 使用Number()函数**

~~~nginx
- 字符串 --> 数字
	1_如果是纯数字的字符串，则直接将其转换为数字
	2_如果字符串中有非数字的内容，则转换为NaN
	3_如果字符串是一个空串或者是一个全是空格的字符串，则转换为0
- 布尔值 --> 数字
	1_true 转为 1
	2_false 转为 0
- null --> 转为数值 0
- undefined --> 转为数值 NaN
~~~

**转换方式二：使用parseInt(),parseFloat()函数**

~~~nginx
- parseInt() 把一个字符串转换为一个整数
- parseFloat() 把一个字符串转换为一个浮点数
~~~

### 强制转换String值

~~~js
var num = 10;
num.toString();   //十进制(默认): "10"
num.toString(2);  //二进制: "1010"
num.toString(8);  //八进制: "12"
num.toString(16);  //十六进制: "a"

(1231421.1231412).toFixed(1) // 1231421.1

var value1 = 10;
var value2 = true;
var value3 = null;
var value4;    //只定义未初始化的变量，自动赋值为undefined
String(value1);   // 10"
String(value2);   //"true"
String(value3);   // "null"
String(value4);   // "undefined"
~~~

## javaScript的内置方法

~~~js
// 判断是否是有限大的数
console.log(isFinite(Infinity))
// 判断是否是NaN
console.log(isNaN(NaN))
// 将字符串转换为对应的数值
console.log(parseInt('60441sdad'))

// 返回值的类型字符串(null不适用)
console.log(typeof '600') // 'string'

// 判断构造函数的prototype是否出现在某个实例对象的原型链上
console.log({} instanceof Object)
~~~

####### ###

## javaScript的内置对象

### Date 对象

Date 对象用于处理日期和时间。

~~~js
const dateObj = new Date(); 	// 创建date对象, 默认将当前时间日期当做初始值
const fullYear = dateObj.getFullYear()	// 年
const mont = dateObj.getMonth() + 1;	// 月, 1~31 从0开始算 所以0=1
const day = dateObj.getDate(); 			// 日
const week = dateObj.getDay(); 			// 星期, 1~7 从1开始算
const hours = dateObj.getHours(); 		// 小时
const minutes = dateObj.getMinutes();	// 分钟
const seconds = dateObj.getSeconds(); 	// 秒

dateObj.setDate(day)  // 设置date对象 一个月中的一天的一个数值（1 ~ 31）。
dateObj.setMinutes(min,[,sec],[,millisec]) // 设置date对象 分钟, 秒, 毫秒
dateObj.setSeconds(sec,[,millisec]) // 设置date对象 秒, 毫秒
dateObj.setMilliseconds(millisec) // 设置date对象毫秒

Date.now() // 当前时间戳
~~~

### Math 对象

Math 对象用于执行数学任务。

~~~js
/*----------------Math 常用方法----------------*/
// 数的绝对值
Math.abs(-5)
Math.abs(5)
// 最高值与最低值
Math.max(0,5)
Math.min(0,5)

// 取整和随机数
Math.ceil(0.5)		//向上取整。1
Math.floor(0.5)		//向下取整。0
Math.round(0.5)		//四舍五入。0.5
Math.random()		//0.0 ~ 1.0 之间的一个伪随机数。

// 取随机值
Math.ceil(Math.random()*10) // 获取从1到10的随机整数 ，取0的概率极小。
Math.round(Math.random());   //可均衡获取0到1的随机整数。
Math.floor(Math.random()*10);  //可均衡获取0到9的随机整数。
Math.round(Math.random()*10);  //基本均衡获取0到10的随机整数，其中获取最小值0和最大值10的几率少一半

// 对象初始值
Math.valueOf()

// 直接去除小数部分
Math.trunc(5136.3312312123132123)
// 判断是否是整数 负数 还是零
Math.sign(66)
~~~

### Error 对象

~~~js
// 错误进行处理
try{
    // 可能发生错误的代码
}catch(err){
    // 只有发生错误时才执行的代码
}finally{
    // 无论是否出错，肯定都要执行的代码
}
// 抛出自定义错误
function round(num, d){
    if(!isNaN(num) && !isNaN(d)){
        num *= Math.pow(10, d);
        return num;
    }else{
        // 抛出自定义错误
        throw new Error("参数必须是数字");  
    }
}
~~~

## 各元素值的常用方法

### 数值原型/对象方法

~~~js
// 判断是否是整数
console.log(Number.isInteger(60.30))
console.log(Number.isInteger(60.0))
~~~

### 数组原型/对象方法

~~~js
//? 查找一个值在不在数组里,若是存在则返回true,不存在返回false
Array.prototype.includes()

//? 向数组末尾添加一个或多个元素，并返回数组的新的长度
Array.prototype.push() 
//? 删除数组最后一个元素，并将被删除的元素作为返回值返回
Array.prototype.pop()
//? 开头添加一个或更多元素，并返回新的长度。
Array.prototype.unshift()
//? 删除并返回数组的第一个元素
Array.prototype.shift()


//! 截取返回指定长度的数组(不会改变原数组)
Array.prototype.slice(start, [,End])
//! 方法向/从数组中添加/删除项目(改变原数组)，然后返回被删除的项目。
//! 第一个参数是项的索引, 第二个参数是删除的个数(0表示不删), 第三个参数是插入的元素(可不选)
Array.prototype.splice(index, howmany, item1, ...)
//! 将数组反转
['1','2','3'].reverse() // '3', '2', '1'

//? 从前面搜索数组中的元素，并返回它所在的位置。
Array.prototype.indexOf('xxx')
//? 从后面搜索数组中的元素，并返回它所在的位置。
Array.prototype.lastIndexOf('xxx')
//? 遍历所有元素的值和下标
Array.prototype.forEach(function(item, index){})
//? 遍历所有元素的值和下标，并返回处理后的数组。
Array.prototype.map(function(item, index){return item})
//! 遍历所有元素的值和下标, 返回符合规则的元素组成的数组
Array.prototype.filter(function(item, index){return Boolen})
//! 遍历所有元素的值和下标, 返回符合规则的一个数组元素。
Array.prototype.find()
//! 遍历所有元素的值和下标, 返回符合规则的元素的下标
Array.prototype.findIndex()
//! 将数组合并为一个任意值, 函数传参为 (total 计算后的值, item 当前数组元素), 第二个参数为初始值, 返回累加的值
Array.prototype.docs.reduce((total,item)=>{}, {})
//! 数据进行排序, a->b为从小到大, b->a为从大到小(该方法对字母, 单词也有效)
// 默认不传参数则为字典排序 a->b
Array.prototype.sort((a,b)=> a-b)
//! 将数组进行字符串拼接参数可传拼接的字符串
Array.prototype.join('')

//! 连接两个或更多的数组，并返回结果。
Array.prototype.concat()
//?* 返回数组的可迭代对象。
Array.prototype.entries()

// 判断数组中是否包含指定value
Array.prototype.includes(value)
// 判断value是否是数组
Array.isArray(value)
~~~

### 函数原型/对象方法

~~~js
// 需求：我想执行函数的this不是window,而是上方的obj
var obj = {username: '魏大勋'}
function fun (data) { console.log(this, data) }

// 执行该函数, 并将this指针指向obj, 带参数时: 参数放在对象的后面
fun.call(obj, 60)
// 执行该函数, 并将this指针指向obj, 带参数时: ,参数放在对象的后面的数组,或者伪数组
fun.apply(obj, [60])
// 将this指针指向obj, 并作为新的函数返回(拷贝)
var bindFun = fun.bind(obj)

// bind常用场景: 需要改变类似setInterval中的回调函数的this指向时
setInterval(function(){ console.log(this) }.bind(obj),1000)

// bind()与call()和apply()的区别
// 都能指定函数中的this
// call()/apply()是立即调用函数, 但参数传入的方式不一样
// bind()是将函数拷贝返回, 并不会执行
~~~

### 字符串原型/对象方法

~~~js
//删除字符串两端的空白符
String.prototype.trim()
// 将字符串以','分隔为数组, 可接收正则
String.prototype.split(',')
// 从前面搜索字符串中的每个值，并返回它所在的位置。
String.prototype.indexOf('str')
// 从后面搜索字符串中的每个值，并返回它所在的位置。
String.prototype.lastIndexOf('str')
// 搜索指定字符串 返回匹配的位置
String.prototype.search('str')


//? 替换字符串, a为替换的RegExp格式, b是替换的字符串
String.prototype.replace(a,b)
//? 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
String.prototype.slice(a,[,b])
//? 截取并返回字符串, 范围是从下标为a的字符开始，截取长度为b, 如果省略第二个参数 将裁剪a开始的剩余部分。
String.prototype.substring(a,[,b])


// 把字符串转换为大写
String.prototype.toUpperCase()
// 把字符串转换为小写
String.prototype.toLowerCase()
// 获取字符串的长度
String.prototype.length 
// 连接两个或多个字符串
String.prototype.concat()
// 判断是否有对应字符
String.prototype.match('www')
// 获取字符串第*位字符串值(字符串数组查询操作)
String.prototype.charAt(0)

// 判断是否包含指定的字符串
String.prototype.includes('str')
// 判断是否以指定字符串开头
String.prototype.startsWith('str')
// 判断是否以指定字符串结尾
String.prototype.endsWith('str')
// 重复指定次数字符串并返回
String.prototype.repeat(3)
~~~

### 对象原型/对象方法

~~~js
const obj1 = { name: 66, age: 77 }
const obj2 = { name: 66, age: 77 }
const fakeArr = { 0: 66, 1: 77, length: 2 }
// 将对象的key转换为数组
Object.keys(obj1) // ['name','age']
// 将对象的val转换为数组
Object.values(obj1) // [66, 77]
// 合并返回新对象
Object.assign(obj1, obj2)
// 直接操作 __proto__ 隐式原型属性
let obj3 = {}
let obj4 = {qian: 5000000000}
obj3.__proto__ = obj4
console.log(obj3.qian)

// ES5 转换为真数组	[0:li, 1:li....]
const lisAll = Array.prototype.slice.call(fakeArr)
// ES6 转换为真数组	[0:li, 1:li....]
const lisAll2 = Array.from(fakeArr)
~~~

## javaScript的常用技巧

### 利用数组填充赋值

~~~js
new Array(5).fill("1"); // 创建数组, 5个子元素, 填充为字符串1
~~~

### 利用数组填充复制字符串

~~~js
new Array(5).fill("1").join(""); // 创建数组, 5个子元素, 填充为1, 组装成字符串
~~~

## 字符串的正则表达式

### 表达式常用方法

~~~js
// 从前面搜索字符串中的每个值，并返回它所在的位置。
String.prototype.search(/RegExp/)
// 用另一个值替换在字符串中指定的值
String.prototype.replace(/RegExp/,'xxx')

//判断串是否符合规则
/RegExp/.test(str)
// 返回符合规则的字符串
/RegExp/.exec(str)
~~~

### 表达式常用语法

~~~js
/*	正则表达式修饰符
		i 	执行对大小写不敏感的匹配
		g 	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
		m 	执行多行匹配。
		s   匹配元字符.(除换行符意外的任意单个字符)
	正则表达式模式
		[abc]	查找方括号之间的任何字符。
		[^xyz] 	不匹配这个集合中的任何一个字符 
		[0-9]	查找任何从 0 至 9 的数字。
		(x|y)	查找由 | 分隔的任何选项
		(x) 	匹配x里面的内容
		{n} 	精确匹配n次 
		{n,} 	匹配n次以上 
		{n,m} 	匹配n-m次 
	元字符
		\d	查找数字。
		\D	查找非数字字符
		\s	查找空白字符。
		\S	查找非空白字符
		\b	匹配单词边界。
		\B	匹配非单词边界
		\n	查找换行符
	定义量词
		n+	匹配任何包含至少一个 n 的字符串。
		n*	匹配任何包含零个或多个 n 的字符串。
		n?	匹配任何包含零个或一个 n 的字符串。
	边界量词
		^	匹配开头，在多行检测中，会匹配一行的开头
		$	匹配结尾，在多行检测中，会匹配一行的结尾
 */
~~~

## 回调函数定时器

### 定义定时器

~~~js
// setInterval, setTimeout: 定义定时器, 返回定时器编号
const id_of_settimeval = setInterval(code, millisec, lang)
const id_of_settimeout = setTimeout(code, millisec, lang)
// code		必需。要调用的函数或要执行的代码串。
// millisec	必须。周期性执行或调用 code 之间的时间间隔，以毫秒计。
// lang		可作为code的参数传入,也可以作为另外一个定时器调用
~~~

### 销毁定时器

~~~js
clearInterval(id_of_settimeval)
// id_of_settimeval	由 setInterval() 返回的 ID 值。该值标识要取消的延迟执行代码块。
clearTimeout(id_of_settimeout)
// id_of_settimeout	由 setTimeout() 返回的 ID 值。该值标识要取消的延迟执行代码块。
~~~

## dom的节点操作

### 获取元素对象

~~~js
//获取body的元素节点
var body = document.body;
//获取html的元素节点
var html = document.documentElement;
//获取全部的元素节点
var all = document.all;
//获取全部的元素节点
var all2 = document.getElementsByTagName("*");
//获取head的元素节点
var head = document.head;
//使用CSS选择器选择节点 但总是单个识别
var calsx = document.querySelector(".box")
//使用CSS选择器选择节点 会封装为数组 注意：一旦元素结构发生改变 querySelectorAll 就会失效
var calsx2 = document.querySelectorAll(".box");
~~~

### 封装获取元素样式函数

~~~js
function getStyle(obj, styleName) {
	if (!window.getComputedStyle) {
		// IE8获取元素宽度样式方法
		return obj.currentStyle[styleName];
	} else {
		// 其他浏览器获取样式方法
		return getComputedStyle(obj, null)[styleName];
	}
}
const domObj = document.getElementById("div");
console.log(getStyle(domObj, 'width')) // "350px"
~~~

### 获取元素参数

~~~js
// 当前元素的定位父元素, 如果父元素都没定位, 则获取body
dom.offsetParent;
// 元素可视区高宽度, 不包括边框
dom.clientHeight;			dom.offsetWidth;
// 当前元素相对其定位元素的水平与垂直的偏移量
dom.offsetLeft;				dom.offsetTop;
// 元素总高宽度, 包括溢出高宽度
dom.scrollWidth;			dom.scrollHeight;
// 溢出的滚动条的偏移值
dom.scrollLeft;				dom.scrollTop;
// 计算滚动条是否到底, 公式: 总高度 - 溢出偏移量 == 可见高度
const isEnd = dom.scrollHeight - dom.scrollTop == dom.clientHeight;
// 浏览器滚动条的偏移值
document.documentElement.scrollLeft || document.body.scrollLeft;
document.documentElement.scrollTop || document.body.scrollTop;
~~~

### dom元素的增换删减

~~~html
<div class="dom"> 
  <span>我是子元素</span> 
  我是普通文本
</div>
~~~

~~~js
const dom = document.querySelector('.dom')
// 创建元素节点对象与元素文本节点对象, 注意: 创建并不会马上渲染到页面
const div = document.createElement("div");
const divText = document.createTextNode("广州");
// 将元素文本对象插入元素对象中
div.appendChild(divText)

// 将元素对象添加到页面元素对象中
dom.appendChild(div)
// 替换子节点元素, 语法：父节点.replaceChild(新节点, 旧节点)
dom.replaceChild(new_dom_obj, old_dom_obj);
// 销毁子节点元素: 两种方式
dom.replaceChild(dom_obj);
dom_obj.parentNode.removeChild(dom_obj);

// 元素的代码字符串与文本字符串 (可读写)
dom.innerHTML;				dom.innerText
// 添加子元素: 添加html代码
dom.innerHTML += "<div>子元素</div>"
// 添加或修改元素文本
dom.innerText += "广州珠海区"
~~~

## dom的元素事件

### dom元素事件列表

~~~js
/*
  元素中点击 click
  元素中双击 dblclick
  元素中右击 contextmenu

  元素中按下 mousedown
  元素中移动 mousemove
  元素中松开 mouseup

  指针进入元素之上 mouseover (当有挡住事件元素，该事件会进行冒泡并触发事件)
  指针移出元素之上 mouseout (当有挡住事件元素，该事件会进行冒泡，不会触发事件)

  指针进入元素 mouseover (当有挡住事件元素，该事件不会进行冒泡，也就是不会触发)
  指针移出元素 mouseenter (当有挡住事件元素，该事件不会进行冒泡，也就是判断已经移出元素，会触发事件)
*/
~~~

### dom元素添加事件回调

~~~js
const dom = document.querySelector('.dom')
function callback () { console.log('事件被触发') }

// 元素添加事件方式一: on, 一次性添加, 再次写入同样的事件会被覆盖
dom.onclick = callback

// 元素添加事件方式二: addEventListener, 可添加多个同样的事件回调
dom.addEventListener('click', callback)
// IE没有addEventListener, 有attachEvent, 事件名需要加on, 并且this执行有问题
dom.attachEvent('onclick', callback.bind(dom), false)

// 销毁eventListener的特定事件: removeEventListener
dom.removeEventListener('click', callback)
// IE没有removeEventListener, 有detachEvent, 事件名需要加on
dom.detachEvent('onclick', callback)
~~~

### event 事件对象

Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。
事件通常与函数结合使用，函数不会在事件发生前被执行！

~~~js
dom.onclick = function (event) {
	event = event || window.event; // 兼容ie8
	// 该元素距离视口的偏移量
  event.clientX;			event.clientY;
  // 触发此事件的元素 (事件的目标节点)
  event.target
  // 当前 Event 对象表示的事件的名称
  event.type
}
~~~

### event.keyCode 编号列表

![](https://img-blog.csdn.net/20180601153357278)

![](https://img-blog.csdn.net/20180601153406667)

## dom事件的解决方案

### 阻止事件的默认行为

通常事件在执行时，在某些特定元素中，会触发特定的默认行为。例如a标签在点击时会默认进行跳转。当我们并不需要默认行为时，就需要阻止事件的默认行为触发

~~~js
dom.onclick = function (event) {
	event = event || window.event;
	event.preventDefault();
  return false;
}
~~~

### 阻止事件的向上冒泡

所谓的冒泡Bubble 就是指事件的向上传导， 当后代元素上的事件被触发时，其主线元素的相同事件也会被触发
阻止冒泡，则代表不执行主线元素的相同事件

~~~js
dom.onclick = function (event) {
	event = event || window.event;
	event.stopPropagation()
}
~~~

### 子元素事件的委派

当子元素元素过多时，一个一个的添加子元素十分浪费时间和性能。并且在添加新的元素时，新的元素并不具备事件，新的元素也要进行添加事件，这样就会使得业务逻辑十分的繁琐。事件的委派的目的就是为了解决这个问题。

~~~js
// 问题: 性能和效率, 以及新元素不具备事件
var ul = document.getElementById("ulu");
var lil = document.getElementsByClassName("link");
 for(var i=0; i<lil.length; i++){
 	lil[i].onclick = function() {
 		console.log(this)
 	}
}
~~~

~~~js
// 解决方案: 事件委派
ul.onclick = function (event){
	event = event || window.event;
	if(event.target.className == "link"){ //如果触发事件的对象是我们期望的元素，则执行否则不执行
		alert("我是ul的单击响应函数");
	}	
};
~~~

### 封装滚轮事件功能函数(方向)

由于火狐与非火狐的滚轮事件差异很大，所以需要进行兼容封装。

~~~js
function onWheel(el, callback) {
	// 火狐没有onmousewheel 只有addEventListener的DOMMouseScroll
	if(el.addEventListener) { el.addEventListener("DOMMouseScroll",fn); }
	else { el.onmousewheel = fn; }
	function fn (ev){
		ev = ev||event
		// 火狐detail 上:正 下:负; 			非火狐wheelDelta 上:负 下:正
		const wheel = ev.wheelDelta != undefined ? ev.wheelDelta : -ev.detail;
		const dir = wheel > 0 ? "up" : "down"
		callback.call(el, ev , dir)
	}
}
wheel(dom, function (event, dir) {
	// 上则dir="up", 下则dir="down"
})
~~~

### 封装滚轮事件功能函数(数值)

~~~js
function onScroll (el, doSomething) {
    let ticking = false;
    el.addEventListener('scroll', function (e) {
        // 获取滚动值
        const last_known_scroll_position = el.scrollY;
        if (!ticking) {
            el.requestAnimationFrame(function () {
                doSomething(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;
    });
}
~~~

### 元素拖拽的基本实现

实现一个基本拖拽的基本逻辑

~~~js
dom.onmousedown = function (event) {
  dom.setCapture && dom.setCapture();	//当点击时所有事件都捕获为该dom的事件
  // 鼠标在元素内按下时, 记录参数
  // 浏览器鼠标所在位置的偏移量
  // 元素距离父元素的偏移量
  
  // 浏览器鼠标所在位置的偏移量 - 元素距离父元素的偏移量 = 元素内的偏移量
  document.onmousemove = function (event) {
    // 移动时触发此函数, 根据按下时的参数与移动的参数改变元素的偏移量
  }
  document.onmouseup = function (event) {
    // 松开时触发此函数, 销毁document的所有事件
    dom.releaseCapture && dom.releaseCapture();	//释放该dom的事件
  }
  return false; // 兼容谷歌和IE浏览器 清除默认行为
}
~~~

### 键盘事件的语法API

键盘事件一般可用于document于input节点，document为全局的键盘事件，input则是在该元素获取焦点时的键盘事件

~~~js
// 当键盘按下时: keydown, 当键盘一直按下时会一直触发onkeydown事件
// 当键盘松开时: keyup
document.onkeyup = function (event){
	event = event||window.event;
	if(event.keyCode === 86 && event.shiftKey === true)
	console.log("同时按下了shift和v");
}
~~~

## 浏览器对象模型

浏览器对象模型(BOM)可以使我们通过JS来操作浏览器，以及获取浏览器信息。通常BOM对象在浏览器中都是作为window对象的属性保存的，可以通过window对象来使用，也可以直接使用。

### window

代表的是整个浏览器窗口，同时window也是网页中的全局对象。具备所有定义的全局变量和方法。

~~~js
console.log(window);

// 打开一个新窗口
window.open(url, [name], [configuration])
// url， 为要新打开页面的url
// name，为新打开窗口的名字，可以通过此名字获取该窗口对象
// configuration，为新打开窗口的一些配置项，比如是否有菜单栏、滚动条、长高等等信息
~~~

### navigator

代表的当前浏览器的信息，可以通过该对象可以来识别不同的浏览器。

~~~nginx
- 代表的当前浏览器的信息，通过该对象可以来识别不同的浏览器
- 由于历史原因,Navigator对象中的大部分属性都已经不能帮助我们识别浏览器了
  所以一般我们只用userAgent来判断浏览器的信息
- userAgent是一个字符串,这个字符串中包含用来描述浏览器信息的内容

- 不同的浏览器会有不同的userAgent
	-谷歌: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36"
	-火狐: "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:59.0) Gecko/20100101 Firefox/59.0"
	-IE: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3)"

注意: IE11将微软和IE相关的标示都已经去除了
~~~

**根据userAgent以及ActiveXObject判断浏览器是否是IE**

~~~js
const ua = navigator.userAgent;
switch (true) {
	case /firefox/i.test(ua):
		console.log("你是火狐！！");
		break;
	case /Chrome/i.test(ua):
		console.log("你是谷歌！！");
		break;
	case /MSIE/i.test(ua):
		console.log("你是IE！！");
		break;
	// 如果通过UserAgent不能判断,还可以通过一些浏览器特有的对象,来判断浏览器的信息
	// 但IE11此方法转换为布尔值为false, 解决方法: 判断该对象是否是window的属性
	case ("ActiveXObject" in window):
		console.log("你是IE11，我要枪毙了你");
}
~~~

### Location

代表当前浏览器的地址信息栏，通过Location可以获取地址栏信息，或者操作浏览器跳转页面。

~~~js
// 打印location，则返回地址栏的信息（完整的）
alert(location)
// 将location熟悉修改为一个完整的路径，或相对路径
// 则我们页面会自动跳转到该路径，并且生成相应的历史记录
location = "http://www.baidu.com";

// 跳转到其他页面, 作用和直接修改location一样
location.assign("http://www.baidu.com")
// 重新加载, 作用跟页面刷新一样, 并且缓存也不放过
location.reload(true)
// 跳转到其他页面, 但不会存在历史记录
location.replace("http://www.baidu.com")
~~~

### History

代表浏览器的历史记录，可以通过该对象来操作浏览器的历史记录。由于隐私原因，该对象不能获取到具体的历史记录，只能操作浏览器向前或向后翻页，而且该操作只能在当次访问时有效。

~~~js
// 当前访问的链接数量
history.length
// 回退上一个页面，跟浏览器的回退同理
history.back()
// 前进下一个页面，跟浏览器的前进同理
history.forward()
// 跳转指定的页面
// 1: 表示向前跳转一个页面
// -1: 表示向后跳转一个页面
history.go(1)
history.go(-1)
~~~

### Screen

代表用户的屏幕信息，通过该对象可以获取到用户的显示器的相关的信息。

## JSON字符串对象

JavaScript Object Notation JS对象表示法。JSON就是一个特殊格式的字符串，这个字符串可以被任意的语言所识别。并且可以传唤为任意语言中的对象，JSON在开发中主要用来数据的交互。JSON和对象格式一样，只不过JSON字符串中的属性名必须加双引号，其他和JS语法一样。JSON分类通常有对象与数组。

### JSON 转换为 JS 对象

~~~js
const JSON_obj = '{"name":"孙悟空","age":18,"gender":"男"}'
const JS_obj = JSON.parse(obj)
~~~

### JS 对象 转换为 JSON 对象

~~~js
const JS_obj = {"name":"孙悟空","age":18,"gender":"男"}
const JSON_obj = JSON.stringify(JS_obj, null, "\t")
~~~

## ES6 新增数据类型

### Set容器

~~~js
/* Set容器 : 无序不可重复的多个value的集合体
 * new Set(array) -> 创建一个set实例
 * add(value) -> 添加数据
 * delete(value) -> 删除数据
 * has(value) -> 查找数据
 * clear() -> 清除容器
 * size -> 容器长度
 */
// 创建Set数据结构
var set = new Set([1,1,1,1,2,3])
// 添加数据
set.add(4)
console.log(set)
// 是否有该value值
console.log(set.has(4), set.has(5))
// 清除容器
set.clear()
console.log(set)
~~~

### Map容器

~~~js
/* Map容器 : 无序的 key不重复的多个key-value的集合体
 * Map(array) -> 创建map实例
 * set(key, value) -> 塞进数据
 * get(key) -> 获取key对应的val值
 * delete(key) -> 删除数据
 * has(key) -> 查找数据
 * clear() -> 清除数据
 * size -> 容器大小
 */
var map = new Map([['username', '当代大学生'],[60, 'age']])
map.set('key', 'val')
console.log(map)
~~~

