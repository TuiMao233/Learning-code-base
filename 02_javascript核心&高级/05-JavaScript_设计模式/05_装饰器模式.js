/*
为了不改变原有的对象，我们可以把原对象放入到一个新的对象中以形成一个聚合对象。
并且这些对象都有相同的接口。当我们使用这个装饰器对象时，
会顺着请求链请求到上一个对象。对于用户来说，这个装饰器对象是透明的，
用户可以依照这种方式一层一层的递归下去。
装饰器模式将现有对象和装饰器进行分离，两者独立存在，符合开放封闭原则。
*/
function Car() {
  this.price = 10
}
function carWithHeatSeat(carClass) {
  carClass.hasHeatSeat = true
  carClass.price += 2
}
function carWithAutoMirror(carClass) {
  carClass.hasHeatSeat = true
  carClass.price += 0.8
}
// 创建car构造对象
const car = new Car()
console.log(car.price)
// 装饰器对car对象进行改造
carWithHeatSeat(car)
carWithAutoMirror(car)
// 输出新的car价格
console.log(car.price)