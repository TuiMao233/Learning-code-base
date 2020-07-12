/* 
缺点：
主要是对DOM元素的操作，只需要改变DOM元素的表现或者不需要返回值，所以适合链式操作。
优点：
编程的流程更加清晰，不会像回调函数一样相互耦合，难以分辨函数的执行顺序且维护困难
*/

// 创建一个链模式
const obj = {
  a () {
    console.log('aaa')
    return this
  },
  b (){
    console.log('bbb')
    return this
  }
}
obj.a().b().a()
