# javascript分析理解

## 数据类型的分类和判断

**基本(值)类型**
`Number ----- 任意数值 -------- typeof == Number` 
`String ----- 任意字符串 ------ typeof == String` 
`Boolean ---- true/false ----- typeof == Boolean`
`undefined --- undefined ----- typeof == undefined`
`null -------- null ----------  typeof == Object`

**对象(引用)类型**
`Object ----- typeof/instanceof == Object/true`
`Array ------ instanceof == true`
`Function ---- typeof == function`

## 数据,变量, 内存的理解

**数据：**在内存中可读的, 可传递的保存了特定信息的'东东'
			一切皆数据, 函数也是数据
			在内存中的所有操作的目标： 数据

**变量：**在程序运行过程中它的值是允许改变的量
			一个变量对应一块小内存, 它的值保存在此内存中  

**内存：**内存条通电后产生的存储空间(临时的)
			一块内存包含内部存储的数据，地址值数据

**`javascript`内存空间的分类**
**栈空间：** 全局变量和局部变量
**堆空间：** 对象 

**内存,数据, 变量三者之间的关系**
内存是容器, 用来存储不同数据
变量是内存的标识, 通过变量我们可以操作(读/写)内存中的数据  

## 对象的理解

**对象：**多个数据(属性)的集合，用来保存多个数据(属性)的容器

**变量属性的组成**
	**属性名 ：** 字符串(标识)
	**属性值 ：** 任意类型

**属性的分类**
	**一般 ：** 属性值不是function  描述对象的状态
	**方法 ：** 属性值为function的属性  描述对象的行为

**特别的对象**
	**数组：** 属性名是0,1,2,3之类的索引
	**函数：** 可以执行的

**如何操作内部属性(方法)**
	通过操作原型链添加和运行方法

## 函数的理解

用来实现特定功能的, n条语句的封装体
只有函数类型的数据是可以执行的, 其它的都不可以

**为什么要用函数?**
	提高复用性
	便于阅读交流

**函数也是对象**
`instanceof Object===true`
函数有属性： `prototype`
函数有方法： `call()/apply()`
可以对函数的原型进行操作和添加方法

**函数的3种不同角色**
	**一般函数 ：** 直接调用
	**构造函数 ：** 通过new调用
	**对象 ：** 通过.调用内部的属性/方法

**函数中的this**
	显式指定谁： `obj.xxx()`
	通过call/apply指定谁调用：` xxx.call(obj)`
	不指定谁调用： `xxx() `： `window`
	回调函数： 看背后是通过谁来调用的通常有`window`或者其它

**回调函数的理解**
你定义的，你没有调用，但它最终执行了(在一定条件下或某个时刻)
**常用的回调函数**
dom事件回调函数，定时器回调函数，ajax请求回调函数，生命周期回调函数

# 作用域链和执行上下文栈

## 执行上下文栈

**执行上下文：** 由js引擎自动创建的对象, 包含对应作用域中的所有变量属性
**执行上下文栈：** 用来管理产生的多个执行上下文

**变量提升：** 在变量定义语句之前, 就可以访问到这个变量(undefined)
**函数提升：** 在函数定义语句之前, 就执行该函数
一般是先有变量提升, 再有函数提升

**全局作用域和函数的生命周期**
**全局 ：**准备执行全局代码前产生, 当页面刷新/关闭页面时死亡
**全局的属性：**`var`定义的全局变量，使用`function`声明的函数，`this`
**函数 ：** 调用函数时产生, 函数执行完时死亡
**函数的属性：**`var`定义的局部变量，`function`声明的函数，`this`，形参变量，`arguments`

**执行上下文创建和初始化全局的过程**
在全局代码执行前最先创建一个全局执行上下文(window)
收集一些全局变量, 并初始化
将这些变量设置为window的属性
**执行上下文创建和初始化函数的过程**
调用函数时, 在执行函数体之前先创建一个函数执行上下文
收集一些局部变量, 并初始化
将这些变量设置为执行上下文的属性

## 作用域链

**作用域：** 一块代码区域, 在编码时就确定了, 不会再变化
	作用域可以隔离变量, 可以在不同作用域定义同名的变量不冲突
**作用域链：** 多个嵌套的作用域形成的由内向外的结构, 用于向上查找变量
	作用域分布在全局和函数中，作用域链分布在函数中，`javascript`没有块作用域(在ES6之前)

**作用域与执行上下文的区别**
	作用域是静态的, 编码时就确定了(不是在运行时), 一旦确定就不会变化了
	执行上下文是动态的, 执行代码时动态创建, 当执行结束消失
	执行上下文环境是在对应的作用域中的

<img src="./图形资料/执行上下文.jpg" alt="prototype的constructor指向对象"  />

# 闭包

当嵌套的内部函数引用了外部函数的变量时就产生了闭包
通过chrome工具得知： 闭包本质是内部函数中的一个对象, 这个对象中包含引用的变量属性
**作用：**延长局部变量的生命周期，并且让函数外部能操作内部的局部变量
**闭包可以：**封装一些数据以及操作数据的函数, 向外暴露一些行为
**闭包可以：**循环遍历加监听，保存循环索引的值
`JS框架(jQuery)`大量使用了闭包
**缺点：**变量占用内存的时间可能会过长，可能导致内存泄露
**解决：**及时释放 ： f = null; //让内部函数对象成为垃圾对象

~~~javascript
function fn1() {
  var a = 2; // a并没有销毁
  function fn2() { 
    a++;
    console.log(a);
  }
  return fn2;
}
var f = fn1();
f();f();
~~~

## 闭包会导致内存溢出与内存泄露

**内存溢出：**一种程序运行出现的错误，当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误
**内存泄露：**占用的内存没有及时释放，内存泄露积累多了就容易导致内存溢出

**常见的内存泄露：**
	意外的全局变量
	没有及时清理的计时器或回调函数
	闭包

## IIFE 匿名函数

匿名函数专业术语为： `IIFE (Immediately Invoked Function Expression) `立即调用函数表达式
匿名函数通常用来封装一些方法然后向外暴露全局对象

```javascript
(function(window){
  function a(){...}
  window.a = a
})(window)
```

# 原型与原型链和原型继承与方法

所有函数都有一个特别的属性：`prototype` ： 显式原型属性
所有实例对象都有一个特别的属性：`__proto__` ： 隐式原型属性

**显式原型与隐式原型的关系**

* 函数的`prototype`： 定义函数时被自动赋值, 值默认为{}, 即用为原型对象
* 实例对象的`proto`： 在创建实例对象时被自动添加, 并赋值为构造函数的prototype值
* 原型对象即为当前实例对象的父对象

**原型链**

* 所有的实例对象都有`proto`属性, 它指向的就是原型对象
* 这样通过`proto`属性就形成了一个链的结构---->原型链
* 当查找对象内部的属性/方法时, js引擎自动沿着这个原型链查找
* 当给对象属性赋值时不会使用原型链, 而只是在当前对象中进行操作

![](./图形资料/原型链.png)

## 对象的创建模式

**Object构造函数模式**

```javascript
var obj = {};
obj.name = 'Tom'
obj.setName = function(name){this.name=name}
```

**对象字面量模式**

```javascript
var obj = {
  name ： 'Tom',
  setName ： function(name){this.name = name}
}
```

**构造函数模式**

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.setName = function(name){this.name=name;};
}
new Person('tom', 12);
```

**构造函数+原型的组合模式**

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.setName = function(name){this.name=name;};
new Person('tom', 12);
```

**new一个对象背后做了些什么?**

* 创建一个空对象
* 给对象设置__proto__, 值为构造函数对象的prototype属性值   this.__proto__ = Fn.prototype
* 执行构造函数体(给对象添加属性/方法)

## 构造函数继承(得到属性)

**关键：**在子类型构造函数中通用super()调用父类型构造函数
**实例：**让子函数使用父函数的属性

```javascript
function Parent(xxx){this.xxx = xxx}
Parent.prototype.test = function(){};
function Child(xxx,yyy){
    Parent.call(this, xxx);//借用构造函数   this.Parent(xxx)
}
var child = new Child('a', 'b');  //child.xxx为'a', 但child没有test()
```

## 原型链继承(得到方法)

**关键：**子类型的原型为父类型的一个实例对象      **实际：**使用子函数能调用父函数的方法
**实例：**让子函数的原型对象指向父元素的实例，在让子函数原型的constructor指向自己

```javascript
function Parent(){}
Parent.prototype.test = function(){};
function Child(){}
Child.prototype = new Parent(); // 子类型的原型指向父类型实例
Child.prototype.constructor = Child
var child = new Child(); //有test()
```

## 原型链+构造函数的组合继承

1. 利用原型链实现对父类型对象的方法继承
2. 利用call()借用父类型构建函数初始化相同属性

**实例：**让子函数的原型对象指向父元素,并且子函数使用父函数的属性

```javascript
function Parent(xxx){this.xxx = xxx}
Parent.prototype.test = function(){};
function Child(xxx,yyy){
    Parent.call(this, xxx);//借用构造函数   this.Parent(xxx)
}
Child.prototype = new Parent() //为了能看到父类型的方法
Child.prototype.constructor = Child //修正constructor属性
var child = new Child(); //child.xxx为'a', 也有test()
```

# 多线程与进程

**进程(process)**
	程序的一次执行, 它占有一片独有的内存空间`
	`可以通过windows任务管理器查看进程

**线程(thread)**
	是进程内的一个独立执行单元`
	`是程序执行的一个完整流程`
	`是CPU的最小的调度单元一个进程至少有一个线程(主)
	程序是在某个进程中的某个线程执行的

![线程图形](./图形资料/线程图形.jpg)

 应用程序必须运行在某个进程的某个线程上一个进程中至少有一个运行的线程： 主线程, 进程启动后自动创建`
`一个进程中也可以同时运行多个线程, 我们会说程序是多线程运行的`
`一个进程内的数据可以供其中的多个线程直接共享`
`多个进程之间的数据是不能直接共享的`
`线程池(thread pool)： 保存多个线程对象的容器, 实现线程对象的反复利用

**多进程：** 一应用程序可以同时启动多个实例运行
**多线程：** 在一个进程内, 同时有多个线程运行
​多线程能有效提升CPU的利用率，但是会创建多线程开销，线程间切换也会有开销，而且还有死锁与状态同步问题，顺序编程简单易懂，但效率比较低

**浏览器运行是单进程还是多进程**?
​		单进程：`firefox，老版IE`
​		多进程：`chrome，新版IE`

**如何查看浏览器是否是多进程运行的呢**?
​		任务管理器-->进程

**浏览器主线程内核模块**
	**js引擎模块 ：** 负责js程序的编译与运行
	**html,css文档解析模块 ：** 负责页面文本的解析
	**DOM/CSS模块 ：** 负责dom/css在内存中的相关处理 
	**布局和渲染模块 ：** 负责页面的布局和效果的绘制(内存中的对象)

**浏览器分线程内核模块**
	**定时器模块 ：** 负责定时器的管理
	**DOM事件模块 ：** 负责事件的管理
	**网络请求模块 ：** 负责Ajax请求

**javascript线程**
js是单线程执行的(回调函数也是在主线程)，H5提出了实现多线程的方案： Web Workers，但只能是主线程更新界面

# 事件循环模型

​	在`Javascript`执行引擎之外，有一个任务队列，当在代码中调用`setTimeout()`方法时，注册的延时方法会交由浏览器内核其他模块（以`webkit`为例，是`webcore`模块）处理，当延时方法到达触发条件，即到达设置的延时时间时，这一延时方法被添加至任务队列里。这一过程由浏览器内核其他模块处理，与执行引擎主线程独立，执行引擎在主线程方法执行完毕，到达空闲状态时，会从任务队列中顺序获取任务来执行，这一过程是一个不断循环的过程，称为事件循环模型。

![事件循环模型01](.\图形资料\事件循环模型01.png)

![事件循环模型02](.\图形资料\事件循环模型02.png)

以图中代码为例，执行引擎开始执行上述代码时，相当于先讲一个main()方法加入执行栈。继续往下开始`console.log('Hi')`时，log('Hi')方法入栈，`console.log`方法是一个`webkit`内核支持的普通方法，而不是前面图中`WebAPIs`涉及的方法，所以这里log('Hi')方法立即出栈被引擎执行。

![事件循环模型03](.\图形资料\事件循环模型03.png)

![事件循环模型04](.\图形资料\事件循环模型04.png)

执行引擎将`setTimeout`出栈执行时，将延时处理方法交由了`webkit timer`模块处理，然后立即继续往下处理后面代码，于是将`log('SJS')`加入执行栈，接下来`log('SJS')`出栈执行，输出`SJS`。而执行引擎在执行完`console.log('SJS')`后，程序处理完毕，`main()`方法也出栈。

![事件循环模型05](.\图形资料\事件循环模型05.png)

![事件循环模型06](.\图形资料\事件循环模型06.png)

![事件循环模型07](.\图形资料\事件循环模型07.png)

这时在在setTimeout方法执行5秒后，timer模块检测到延时处理方法到达触发条件，于是将延时处理方法加入任务队列。而此时执行引擎的执行栈为空，所以引擎开始轮询检查任务队列是否有任务需要被执行，就检查到已经到达执行条件的延时方法，于是将延时方法加入执行栈。引擎发现延时方法调用了log()方法，于是又将log()方法入栈。然后对执行栈依次出栈执行，输出there，清空执行栈。

清空执行栈后，执行引擎会继续去轮询任务队列，检查是否还有任务可执行。

因为是这种执行模式 所以一旦有计算量大的代码就会阻塞定时器的执行

~~~javascript
var arr = []
for(var i=0;i<100000; i++){arr.push(i)}
setTimeout(()=>{console.log('我执行了')},1000) // 远不止1秒
~~~

# H5 Web Workers

Web Workers 是 HTML5 提供的一个javascript多线程解决方案，我们可以将一些大计算量的代码交由web Worker运行而不冻结用户界面，但是子线程完全受主线程控制，且不得操作DOM。，所以，这个新标准并没有改变JavaScript单线程的本质
**不足：**就慢、不能跨域加载JS、worker内代码不能访问DOM(更新UI)、以及不是每个浏览器都支持这个新特性

![Web Workers](/图形资料/Web Workers.jpg)

**应用练习：编程实现斐波那契数列（Fibonacci sequence）的计算**

~~~javascript
// F（0）=0，F（1）=1，..... F（n）=F(n-1)+F(n-2)
function fibonacci(n){//5
	return n<=2 ? 1 ： fibonacci(n-1) + fibonacci(n-2);
}
var ipunt = document.querySelector("input")
document.querySelector("button").onclick = function(){
	var num = ipunt.value
	alert(fibonacci(num))
}
~~~

## 定义分线程

创建在分线程执行的js文件，在主线程中的js中发消息并设置回调·

**分线程定义**

~~~javascript
function fibonacci(n){//5
		return n<=2 ? 1 ： fibonacci(n-1) + fibonacci(n-2);
}
var onmessage = function(event){
	var num = event.data 		//分线程接收主线程发送的数据
	postMessage(fibonacci(num))  	//分线程向主线程返回数据
	//alert(result) 不能再分线程调用,分线程没有window对象
} };
~~~

**主线程引用**

~~~javascript
var ipunt = document.querySelector("input")
document.querySelector("button").onclick = function(){
	var num = ipunt.value
	var worker = new Worker('worker.js')//引用分线程
	worker.postMessage(num) 		//主线程向分线程发送数据
	worker.onmessage = function(event){//主线程接收分线程返回的数据
		alert(event.data)
	}
}
~~~

# 本地储存技术



## sessionStorage

- 声明周期：浏览器打开到关闭的过程
- 大小：5M甚至更大
- 保存的位置：浏览器端
- 设置：`setItem('key',value)`
- 获取：`getItem('key')`
- 删除：`removeItem('key')`

## localStorage

- 声明周期：永久，除非人为删除
- 大小：5M甚至更大
- 保存的位置：浏览器端
- 设置：`setItem('key',value)`
- 获取：`getItem('key')`
- 删除：`removeItem('key')`

[^注意]: sessionStorage和localStorage当设置的时候，value的值必须得是json格式字符串，读取的时候也是josn字符串

## cookie

- 声明周期：如果不设置浏览器关闭则消失
- 大小：4kb
- 每次发送请求都携带，导致占用带宽
- 保存的位置：浏览器端
- cookie容易被截获，不安全