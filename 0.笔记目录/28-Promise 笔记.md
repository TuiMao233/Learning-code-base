# 基本知识

## 区别实例对象与函数对象

1. 实例对象: new 函数产生的对象, 称为实例对象, 简称为对象
2. 函数对象: 将函数作为对象使用时, 简称为函

~~~js
/*
1. 函数对象与实例对象
函数对象: 将函数作为对象使用时, 简称为函数对象
实例对象: new 函数产生的对象, 简称为对象
*/
function Fn() {   // Fn函数 
}
const fn = new Fn() // Fn是构造函数 fn是实例对象(简称为对象)
console.log(Fn.prototype) // Fn是函数对象
Fn.call({}) // Fn是函数对象
$('#test') // jQuery函数
$.get('/test') // jQuery函数对象
~~~

## 二种类型的回调函数

### 同步回调

立即执行, 完全执行完了才结束, 不会放入回调队列中
**例子:** 数组遍历相关的回调函数 / Promise 的 excutor 函数

### 异步回调

不会立即执行, 会放入回调队列中将来执行
**例子:** 定时器回调 / ajax 回调 / Promise 的成功|失败的回调

## error 错误对象

### 常见的内置错误

~~~js
//! 1. ReferenceError: 引用的变量不存在
console.log(a);  
//? ReferenceError: a is not defined 错误 a 没有被定义

//! 2. TypeError: 数据类型不正确
let b = null
console.log(b.xxx);
b = {}
b.xxx()
//? Cannot read property 'xxx' of null 你不能在null里读取xxx

//! 3. RangeError: 数据不在其所允许的范围
function fn() {fn()}
fn()
//? ReferenceError: a is not defined  超出了函数递归次数

//! 4. SyntaxError: 语法错误
const c = """"
~~~

### 捕获异常

~~~js
try {
  let a
console.log(a.xxx);
} catch (error) {
  console.log(error.message);
  console.log(error.stack);
}
console.log('出错之后'); // 可以执行
~~~

### 抛出异常

~~~js
throw new Error('自定义错误文本')
~~~

# Promise 基本概念

## Promise 基本理解

**抽象表达:** Promise 是 JS 中进行异步编程的新的解决方案(

**具体表达:** 从语法上来说 `Promise` 是一个构造函数，
			 	从功能上来说 `Promise` 对象用来封装一个异步操作并可以获取其结果

## Promise 状态改变

Promise 有三种状态

1. pending 变为 resolved
2. pending 变为 rejected

说明: 只有这 2 种, 且一个 promise 对象只能改变一次无论变为成功还是失败, 都会有一个结果数据成功的结果数据一般称为 vlaue 失败的结果数据一般称为 reas

## Promise 流程

![批注](.\img\promise\批注.png)

## Promise 基本架构

~~~js
//! 1. 创建一个新的promise对象
const p = new Promise((resolve, reject) => {
	//! 2. 执行异步任务
	setTimeout(() => {
		const time = Date.now() // 如果当前时间是偶数代表成功，否则失败
		if (time % 2 === 0) {
			//? 如果成功，调用resolve(value)
			resolve('成功' + time)
		} else {
			//? 如果失败，调用reject(reason)
			reject('失败' + time)
		}
	}, 1000);
})
package.then(
	value => { // onResolved
		//! 接受得到成功的value数据
		console.log(value);
	},
	reason => { // onRejected
		//! 接受得到失败的reason数据
		console.log(reason);
	}
)
~~~

## 为什么要用 Promise

~~~js
/* 
      1. 指定回调函数的方式更加灵活: 
        旧的: 必须在启动异步任务前指定
        promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定)
    
      2. 支持链式调用, 可以解决回调地狱问题
        什么是回调地狱? 回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调函数执行的条件
        回调地狱的缺点?  不便于阅读 / 不便于异常处理
        解决方案? promise链式调用
        终极解决方案? async/await
*/

// 成功的回调函数
function successCallback(result) {
    console.log("声音文件创建成功: " + result);
}
// 失败的回调函数
function failureCallback(error) {
    console.log("声音文件创建失败: " + error);
}

/* 1.1 使用纯回调函数 */
createAudioFileAsync(audioSettings, successCallback, failureCallback)

/* 1.2. 使用Promise */
const promise = createAudioFileAsync(audioSettings); // 2
setTimeout(() => {
    promise.then(successCallback, failureCallback);
}, 3000);

/* 2.1. 回调地狱*/
doSomething(function (result) {
    doSomethingElse(result, function (newResult) {
        doThirdThing(newResult, function (finalResult) {
            console.log('Got the final result: ' + finalResult)
        }, failureCallback)
    }, failureCallback)
}, failureCallback)

/* 2.2. 使用promise的链式调用解决回调地狱*/
doSomething()
    .then(function (result) {
        return doSomethingElse(result)
    })
    .then(function (newResult) {
        return doThirdThing(newResult)
    })
    .then(function (finalResult) {
        console.log('Got the final result: ' + finalResult)
    })
    .catch(failureCallback)

/* 2.3. async/await: 回调地狱的终极解决方案*/
async function request() {
    try {
        const result = await doSomething()
        const newResult = await doSomethingElse(result)
        const finalResult = await doThirdThing(newResult)
        console.log('Got the final result: ' + finalResult)
    } catch (error) {
        failureCallback(error)
    }
}
~~~

# Promise API

## Promise.resolve

~~~js
// 产生一个成功值为1的promise对象(基本写法)
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
     resolve(1)
    }, 100);
})
// Promise.resolve
const p2 = Promise.resolve(2)
~~~

## Promise.reject

~~~js
// 产生一个一个失败值为3的promise对象
const p3 = Promise.reject(3)
~~~

## Promise.all(promiseArray)

~~~js
const pAll = Promise.all([p1,p2])
pAll.then(
    // 当传入的所有promise实例对象成功时,返回一个结果数组
	values => {},
    // 当有一个promise失败时
    reason => {}
)
~~~

## Promise.race(promiseArray)

~~~js
const pAll = Promise.race([p1,p2])
pAll.then(
    // 当传入的所有promise实例对象成功时,返回第一个获取到的结果
	value => {},
    // 当有一个promise失败时
    reason => {}
)
~~~

## Promise.reject 抛出异常

~~~js
const p = new Promise((resolve, reject) => {
  // resolve(1) // promise变为resolved成功状态
  // reject(2) // promise变为rejected失败状态
  // throw new Error('出错了') // 抛出异常, promse变为rejected失败状态, reason为 抛出的error
  throw 3 // 抛出异常, promse变为rejected失败状态, reason为 抛出的3
})
~~~

## 单个Promise指定多个成功 / 失败回调

~~~js
p.then(
  value => {},
  reason => {console.log('reason', reason)}
)
p.then(
  value => {},
  reason => {console.log('reason2', reason)} )
)
~~~

# async 函数

## async返回值

async函数的返回值是一个promise对象，async函数返回的promise的结果由函数执行的结果决定

~~~js
async function fn1() {
    // return 1
    // throw 2
    return new Promise(resolve=>setTimeout(() => resolve(6), 1000))
  }
  const result = fn1()
  // console.log(result)
  result.then(
    value => console.log(value),
    reason => console.log(reason)
  )
~~~

## await 表达式

await右侧的表达式一般为promise对象, 但也可以是其它的值
如果表达式是promise对象, await返回的是promise成功的值
如果表达式是其它值, 直接将此值作为await的返回值

~~~js
function fn2 () {
  return new Promise(resolve=>setTimeout(() => resolve(100), 1000))
}
async function fn3 () {
  const value = await fn2()
  console.log(value);
}
fn3()
~~~

### await 得到promise失败值

await不能得到promise失败值，得用异常捕获语法得到

~~~js
function fn2 () {
  return new Promise((resolve,reject)=>setTimeout(() => reject(100), 1000))
}
async function fn3 () {
  try {
      const value = await fn2()
  } catch (error) {
      console.log(error);
  }
}
fn3()
~~~

# 宏任务和微任务

![752194-20191231011056020-520920255](D:\web学习库\0.笔记目录\img\promise\752194-20191231011056020-520920255.png)

JS 中用来存储待执行回调函数的队列包含 2 个不同特定的列队

**宏列队:** 用来保存待执行的宏任务(回调), 比如 定时器回调/DOM 事件回调 /ajax 回调
**微列队 :** 用来保存待执行的微任务(回 调), 比如 promise的回调 /MutationObserver 的回调