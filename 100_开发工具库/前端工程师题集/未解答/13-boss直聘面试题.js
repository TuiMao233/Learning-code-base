// 1.下面代码运行结果是什么？
function printing() {
  console.log(1);
  setTimeout(function () { console.log(2); }, 1000);
  setTimeout(function () { console.log(3); }, 0);
  console.log(4);
}
printing();


// 2.请写出输出的结果
var a = { n: 10, m: 20 };
var b = a;
b.n = 30;
console.log(a.n);
console.log(b);


// 3. 输出下面6组的值
let a = function () { console.log(this) }
let b = () => { console.log(this) }
function A() {
  this.a = a;
}
function B() {
  this.b = b;
}
a()
b()

new A().a()
new B().b()
document.onclick = a();
document.body.onclick = b();