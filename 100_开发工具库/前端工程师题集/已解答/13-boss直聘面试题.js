// 1.下面代码运行结果是什么？
function printing() { // 函数提升上级定义, 这时函数体内容不会执行
  console.log(1); // 立即执行, 顺序为一, 执行结果为1

  // 推入任务队列中, 该代码会保留 -->将任务推出栈执行, 顺序为四, 执行结果为3
  setTimeout(function () { console.log(2); }, 1000);

  // 推入任务队列中, 该代码会保留 -->同步代码执行完毕, 将任务推出栈执行, 顺序为三, 执行结果为3
  // 事件循环模型会轮询检查任务队列, 查看是否还有任务需被执行
  setTimeout(function () { console.log(3); }, 0);

  console.log(4); //  同步立即执行, 顺序为二, 执行结果为4
}
printing(); // 函数体执行


// 2.请写出输出的结果
var a = { n: 10, m: 20 }; // 堆栈中创建对象, a引用该对象的地址
var b = a; // b引入a的引用地址, 
b.n = 30;  // 由于b引用的是a的地址, 所以更改b.n 等同于 a.n
console.log(a.n); // 输出 30
console.log(b); // 输出 {n:30, m:20}


// 3. 输出下面6组的值
// 由于js特性, 定义函数与变量时具有提升, 函数优先级比变量高,
// 但let定义的变量不存在提升, 这是ES6的新特性, 所以以下执行顺序为
let a = function () { console.log(this) }
let b = () => { console.log(this) }
function A() {
  this.a = a;
}
function B() {
  this.b = b;
}
// 执行window.a() --> () { console.log(this) }
a() // 普通函数的this由上级对象组成, a定义在全局中, 对象是widnow, 所以输出window
b() // 箭头函数并没有自己的this, 箭头函数会捕捉当前的上下文对象, 当前函数体作用域为空, 所以是{}

// new A和new B构造函数创建了一个对象, 对象中引用全局的a与b
new A().a() // 对象中执行普通函数, this为当前全局对象, 所以输出 {a:[Funciton]}
new B().b() // 对象中执行箭头函数, this为上下文对象, 当前函数的上下文对象为widnow, 所以输出window
document.onclick = a(); // document.onclick --> widnow
document.body.onclick = b(); // document.body.onclick --> {}
  // 箭头函数通常运用在定时器中, 因为箭头函数的this永远指定着当前上下文, 这样可以直接访问对象的this
  // 如果不使用箭头函数, 但又需要绑定this, 这时候需要函数的bind方法绑定该函数, bind可以指定函数的this指针
  // 具体使用为setTimeout(function () { }.bind(object), timeout);