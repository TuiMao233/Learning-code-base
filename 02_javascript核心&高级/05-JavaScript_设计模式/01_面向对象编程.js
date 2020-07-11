/* 
面向对象注重于抽象事物,而面向过程注重于叙述事物。
面向对象逻辑清晰有条理,而面向过程比较方面。
Js通过函数和原型,模拟了传统面向对象编程中类的概念实现了面向对象的编程模式。
面向对象的编程思想,主要为了实现3件事,封装,继承和多态。
*/

// 面向过程
function xiaoAEatApple(){}
function xiaoAEatFish(){}
function xiaoBEatBanana(){}
xiaoAEatApple()
xiaoAEatFish()
xiaoBEatBanana()
// 面向对象
function Cat (name) {
    this.name = name
}
Cat.prototype.eat = function (se) {}
var xiaoA = new Cat('xiaoA')
var xiaoB = new Cat('xiaoB')
xiaoA.eat('apple')
xiaoA.eat('fish')
xiaoB.eat('banana')