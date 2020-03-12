# ECMAScript6 常用语法

## let关键字

与var类似， 用于声明一个变量。在块级作用域内有效，不能重复声明，不会预处理，不存在提升

~~~javascript
for (let i=0; i<btns.length; i++) {
	btns[i].onclick = function () {
		console.log(i) 			// 因为是块级作用域，所以事件能拿到for循环i的值
}}
~~~

## const关键字

定义常量，不能修改，其它特点同let，可以原来保存一些不用改变的数据

~~~javascript
const KEY = 'CBA'
KEY = 'DB' // 报错
~~~

## 变量解析赋值

从对象或数组中提取数据, 并赋值给变量(多个)

~~~javascript
// 对象的解构赋值
let {n, a} = {n:'tom', a:12} // n = tom 	a = 12 
// 数组的解构赋值
 let [a,b] = [1, 'atguigu']; // a = 1   	b = atguigu
~~~

## 模板字符串

简化字符串的拼接

~~~javascript
let a = 900
let str = `这个月消费了${a}元` // 这个月消费了900元
~~~

## 简化对象属性写法

~~~javascript
let username = '弟兄姐妹'
let age = 410
let obj = {username,age}
// obj.username = 弟兄姐妹
// obj.age = 410
~~~

## 简化对象方法写法

~~~javascript
let obj = {
	getName() {console.log('函数1执行')},
  getName2() {console.log('函数2执行')}
}
~~~

## 箭头函数

简洁定义方法`()=>{}`，箭头函数没有自己的this，箭头函数的this不是调用的时候决定的，而是在定义的时候处在的对象就是它的this，箭头函数的this看外层的是否有函数，如果有，外层函数的this就是内部箭头函数的this，如果没有，则this是window。

**形参的情况**

~~~javascript
// 1.没有形参的情况
let fun1 = () => console.log('我是箭头函数')
fun1()
// 2.只有一个形参的情况,()可以省略
let fun2 = a => console.log(a)
fun2('xxx')
// 3.两个,或两个以上的情况,()不可以省略
let fun3 = (x, y) => console.log(x, y)
fun3(31,56)
~~~

**函数体的情况**

~~~javascript
// 1.函数体只有一条语句或是表达式的时候,{}可以省略---->会自动返回执行结果
let fun4 = (x, y) => x + y;
console.log(fun4(36, 64))
// 2.函数体不止有一条语句或是表达式的时候,{}不可以省略
let fun5 = (x, y) => {
		console.log(x, y)
		return x + y
	}
console.log(fun5(36, 64))
~~~

## 扩展运算符

**取代arguments** ，比 arguments 灵活,只能是最后部分形参参数

~~~javascript
function fun(...values) {console.log(values)} // values = [6,7,8,9,1,6,3,5]
fun(6,7,8,9,1,6,3,5)
~~~

**数组中插入另一个数组的元素**

~~~javascript
let arr1 = [1,3,5];
let arr2 = [2,...arr1,6]; // [2,1,3,5,6]
arr2.push(...arr1);	// [2,1,3,5,6,1,3,5]
~~~

## 形参默认值

~~~javascript
function point(x=0, y=0) {
		console.log(x,y)
};point() // 0 0
~~~

# ECMAScript6 高级语法

## Promise 对象

代表了未来某个将要发生的事件(通常是一个异步操作)，有了promise对象, 可以将异步操作以同步的流程表达出来, 避免了层层嵌套的回调函数(俗称'回调地狱')

ES6的Promise是一个构造函数, 用来生成promise实例

~~~javascript
// 创建promise对象
let promise = new Promise((resolve, reject) => {
	if(异步操作成功) {	//执行异步操作
		resolve(value);//修改promise的状态为fullfilled
	} else {
		reject(errMsg);//修改promise的状态为rejected
	}
})
// 调用promise的then()
promise.then(function(
	result => console.log(result), // 异步成功时函数
	errorMsg => alert(errorMsg)		// 异步失败时函数
))
~~~

promise对象的3个状态
	`pending: `初始化状态
	`fullfilled: `成功状态
	`rejected: `失败状态

**使用promise封装处理ajax链式请求**

~~~javascript
// 兼容XMLHttpRequest请求方法
function getHTTPObject(){....}
function getNews (method, url) {
	let promise = new Promise((resolve, reject)=>{// 创建promise实例
		let request = getHTTPObject();// 创建一个XMLHttpRequest 对象
		request.open(method,url); // 规定发送格式
		request.send(null); // 发送请求
		request.onreadystatechange = () => { // 响应函数
		if(request.readyState == 4 && request.status == 200 || request.status == 304) { 
				resolve(request.responseText)
		}else{reject('暂时不存在此信息')}// 响应不可用,将数据传入promise的回调函数reject中
	})
	return promise // promise定义好ajax后返回
}}
getNews('GET', 'http://localhost:3000/news?id=2')
			.then((data)=>{		// 接收第一个数据
				console.log(JSON.parse(data)) 
				let url = JSON.parse(data).commentsUrl // 接收下一个ajax
				return getNews('GET', `http://localhost:3000${url}`) // 定义下一个请求，并将其返回
			}, (error)=>{console.log(error)})
			.then((data)=>{		// 返回值是一个promise对象，这样就可以接收第二个数据
				console.log(JSON.parse(data))
			},(error)=>{console.log(error)})
~~~

## symbol 原始数据类型

Symbol属性对应的值是唯一的
Symbol值不能与其他数据进行计算，包括同字符串拼串
for in, for of遍历时不会遍历symbol属性。

~~~javascript
// symbol可以添加标识Symbol([标识]),number,string
let key = Symbol('key')
let obj = {
	[key]: 60, // ES6语法
	username: '徐晓东',
	age: 60
}
console.log(obj[key])	// obj[sym] = 60
// 获取对象中的sym属性，ES6有特定方法
console.log(Object.getOwnPropertySymbols(obj))
// Symbol的for方法声明Symbol
let s5 = Symbol.for('test') // 没有这个变量则声明一个 
let s6 = Symbol.for('test') // 如果已经存在了.则获取这个sym
~~~

## symbol.iterator 遍历器

iterator是一种接口机制，为各种不同的数据结构提供统一的访问机制，使得数据结构的成员能够按某种自定义次序排列

```
工作原理：
  - 创建一个指针对象(遍历器对象)，指向数据结构的起始位置。
  - 第一次调用next方法，指针自动指向数据结构的第一个成员
  - 接下来不断调用next方法，指针会一直往后移动，直到指向最后一个成员
  - 每调用next方法返回的是一个包含value和done的对象，{value: 当前成员的值,done: 布尔值}
    * value表示当前成员的值，done对应的布尔值表示当前的数据的结构是否遍历结束。
    * 当遍历结束的时候返回的value值是undefined，done值为false
```
**自定义送代器**

~~~javascript
var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}
[...myIterable] // [1, 2, 3]

~~~

## generator 状态机函数

~~~javascript
function* myGenerator () {
		console.log('开始执行')
		let result = yield 'hello'
		console.log(result) 
		console.log('暂停后,继续执行')
		yield 'gener'
		console.log('执行完毕')
		return '返回的结果'
}
let MG = myGenerator()
console.log(MG.next())
console.log(MG.next('aaaaaaaaaaaaaaaaaaaaa'))
console.log(MG.next())
~~~

## async 同步流程表达异步操作函数

~~~javascript
function foo() {return new Promise(resolve => {setTimeout(resolve, 2000)})}
async function test() {
	console.log('开始执行', new Date().toTimeString())
	await foo() // 当前的异步操作完成就往下执行
	console.log('执行结束', new Date().toTimeString())
};test()

~~~

## class 类定义构造方法

~~~javascript
class Person {
	// 类的构造方法
	constructor(name, age) {
	    this.name = name
			this.age = age
	}
	// 类的一般方法
	showName() {console.log(this.name, this.age)}
}
let person = new Person('大学生', 60)
~~~

**class继承父类属性与方法**

~~~javascript
// 继承父类属性与方法
class StarPerson extends Person {
	constructor(name, age, salary){
		super(name, age) 		// 调用父类的构造函数
		this.salary = salary	// 在父类的元素上新添加salary元素
	}
	showName() {
		console.log('调用子类方法')
		console.log(this.name, this.age, this.salary)
	}
}
let p1 = new StarPerson('小学生', 70, 3000000000)
~~~

**class static 定义静态方法**

~~~js
class ClassWithStaticMethod {
  static staticMethod() {
    return 'static method has been called.';
  }
}

console.log(ClassWithStaticMethod.staticMethod());
// expected output: "static method has been called."
~~~

