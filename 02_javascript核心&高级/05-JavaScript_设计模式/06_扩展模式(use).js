/* 
在传统开发工程师眼里，单例就是保证一个类只有一个实例，
实现的方法一般是先判断实例存在与否，如果存在直接返回，
如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
在JavaScript里，单例作为一个命名空间提供者，
从全局命名空间里提供一个唯一的访问点来访问该对象。
*/

function Car() {
  this.price = 10
}
// 向原型专门添加一个添加扩展方法的方法
Car.prototype.use = function (plugin) {
   if (typeof plugin !== 'function'){
       throw new Error('该扩展插件不是方法!');
   }
   this[plugin.name] = plugin
}
function carWithHeatSeat() {
  this.hasHeatSeat = true
  this.price += 2
}
function carWithAutoMirror() {
  this.hasHeatSeat = true
  this.price += 0.8
}
// 创建car构造对象
const car = new Car()
// 使用car原型上的use方法添加装饰器
car.use(carWithHeatSeat)
car.use(carWithAutoMirror)
// car原型就带有了两个方法
car.carWithHeatSeat()
car.carWithAutoMirror()
// 输出新的car价格
console.log(car.price)