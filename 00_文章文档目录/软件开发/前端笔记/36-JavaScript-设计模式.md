---
title: JavaScript 设计模式
date: 2020-11-01
categories:
  - 前端学习笔记
tags: 
  - javascript
---
## JavaScript 设计模式简述

JavaScript 是多模式混合的代码编程，面向对象的，以原型为基础的，拥有动态数据类型，一方面将函数看做是一等公民，允许函数是编程的风格，另一方面，不排斥传统的面向对象方式进行开发。

## 面向对象

~~~js
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
~~~

面向对象注重于抽象事物,而面向过程注重于叙述事物。

面向对象逻辑清晰有条理,而面向过程比较方面。

Js通过函数和原型,模拟了传统面向对象编程中类的概念实现了面向对象的编程模式。

面向对象的编程思想,主要为了实现3件事,封装,继承和多态。

## 工厂模式

所谓工厂模式就是像工厂一样重复的产生类似的产品，工厂模式只需要我们传入正确的参数，就能生产类似的产品；工厂模式根据抽象程度依次分为简单工厂模式、工厂方法模式、抽象工厂模式；

~~~js
(function(window){
	function Lyric () {
		return new Lyric.prototype.init(path)
	}
	Lyric.prototype = {
		init: function () {
		}
	}
	Lyric.prototype.init.prototype = Lyric.prototype;
	window.Lyric = Lyric;
})(window)
~~~

## 建造者模式

建造者模式可以将一个复杂的对象的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。也就是说如果我们用了建造者模式，那么用户就需要指定需要建造的类型就可以得到它们，而具体建造的过程和细节就不需要知道了。建造者模式实际就是一个指挥者，一个建造者，一个使用指挥者调用具体建造者工作得出结果的客户。

建造者模式主要用于“分步骤构建一个复杂的对象”，在这其中“分步骤”是一个稳定的算法，而复杂对象的各个部分则经常变化。

通俗的说：就是一个白富美需要建一个别墅，然后直接找包工头，包工头再找工人把别墅建好。这其中白富美不用直接一个一个工人的去找。而且包工头知道白富美的需求，知道哪里可以找到工人，工人可以干活，中间节省了白富美的和工人之间沟通的成本，白富美也不需要知道房子具体怎么建，最后能拿到房就可以了。

~~~js
//1.产出东西是房子
//2.包工头调用工人进行开工 而且他要很清楚工人们具体的某一个大项
//3.工人是盖房子的 工人可以建卧室 建客厅 建厨房
//4.包工头只是一个接口而已 他不干活 他只对外说我能建房子
function Fangzi() {//Fangzi可以理解为单例模式
  if (!(this instanceof Fangzi)) {
    return new Fangzi();
  }
  this.woshi = "";
  this.keting = "";
  this.chufang = "";
}
function Baogongtou() {
  if (!(this instanceof Baogongtou)) {
    return new Baogongtou();
  }
  this.jianfangzi = function (gongren) {
    gongren.jian_chufang();
    gongren.jian_keting();
    gongren.jian_woshi();
  }
}
function Gongren() {
  if (!(this instanceof Gongren)) {
    return new Gongren();
  }
  this.jian_woshi = function () {
    console.log("建卧室");
  }
  this.jian_keting = function () {
    console.log("建客厅");
  }
  this.jian_chufang = function () {
    console.log("建厨房");
  }
  this.jiaofang = function () {
    var _fangzi = new Fangzi();
    _fangzi.woshi = "ok";
    _fangzi.keting = "ok";
    _fangzi.chufang = "ok";
    return _fangzi;
  }
}
// 创建工人实例
var gongren = new Gongren();
// 创建包工头实例
var baogongtou = new Baogongtou();
// 包工头调用工人进行建房子
baogongtou.jianfangzi(gongren);
// 工人返回一个房子
var myfangzi = gongren.jiaofang();
~~~

~~~js
function Candidate(param){
	const _candidate = new Person(param)
    _candidate.name = new CreateName(param.name)
    _candidate.work = new CreateWork(param.work)
    return _candidate
}
function Person (param) {
    this.name = param.name
    this.age = param.age
}
function CreateName (name) {
    this.wholeName = name
    this.firstName = name.split('  ')[0]
    this.secondName = name.split('  ')[1]
}
function CreateWork(work) {
    switch (work) {
        case 'engineer':
            this.name = '工程师';
            this.description = '热爱编程';
        case 'teacher':
            this.name = '老师';
            this.description = '乐于分享';
        default :
            this.name = work;
            this.description = '无';
    }
}
CreateWork.prototype.changeWork = function (work) {
    this.name = work
}
CreateWork.prototype.changeDes = function (des) {
    this.description = des
}
~~~

## 单例模式

在传统开发工程师眼里，单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

~~~js
const createSingle = (function () {
    let _unique = null;
    function single () {
        return { a: 1}
    }
    return function () {
        if (_unique == null){
            _unique = single()
        }
        return _unique
    }
})()
// 创建a对象和b对象
const a = createSingle()
const b = createSingle()
console.log(a === b) // 相等
~~~

## 装饰器模式

为了不改变原有的对象，我们可以把原对象放入到一个新的对象中以形成一个聚合对象。并且这些对象都有相同的接口。当我们使用这个装饰器对象时，会顺着请求链请求到上一个对象。对于用户来说，这个装饰器对象是透明的，用户可以依照这种方式一层一层的递归下去。

装饰器模式将现有对象和装饰器进行分离，两者独立存在，符合开放封闭原则。

~~~js
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
~~~

~~~js
function Car() {
  this.price = 10
}
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
~~~

## 组合模式

~~~js
// 创建一个宏命令
var MacroCommand = function () {
  return {
    // 宏命令的子命令列表
    commandsList: [],
    // 添加命令到子命令列表
    add: function (command) {
      this.commandsList.push(command);
    },
    // 依次执行子命令列表里面的命令
    execute: function () {
      for (var i = 0, command; command = this.commandsList[i++];) {
        command.execute();
      }
    }
  }
};

// <!--打开空调命令--> //
var openAcCommand = {
  execute: function () { console.log('打开空调') }
};

// <!--打开电视和音响--> //
var openTvCommand = {
  execute: function () { console.log('打开电视') }
};
var openSoundCommand = {
  execute: function () { console.log('打开音响') }
};
//创建一个宏命令
var macroCommand1 = MacroCommand();
//把打开电视装进这个宏命令里
macroCommand1.add(openTvCommand)
//把打开音响装进这个宏命令里
macroCommand1.add(openSoundCommand)

// <!--关门、打开电脑和打登录QQ的命令--> // 
var closeDoorCommand = {
  execute: function () { console.log('关门') }
};
var openPcCommand = {
  execute: function () { console.log('开电脑') }
};
var openQQCommand = {
  execute: function () { console.log('登录QQ') }
};
//创建一个宏命令
var macroCommand2 = MacroCommand();
//把关门命令装进这个宏命令里
macroCommand2.add(closeDoorCommand);
//把开电脑命令装进这个宏命令里
macroCommand2.add(openPcCommand);
//把登录QQ命令装进这个宏命令里
macroCommand2.add(openQQCommand);

// <!--把各宏命令装进一个超级命令中去--> //
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

macroCommand.execute()
~~~

## 观察者模式

观察者模式又叫发布订阅和消息模式。是设计模式中非常著名也是非常重要的一种模式。这种模式一般会定义一个主题和众多个个体，这里主题可以想象为一个消息中心，里面有各种各样的消息，众多个体可以订阅不同的消息，当未来消息中心发布某条消息的时候，订阅过他的个体就会得到通知。

~~~js
/** 观察者构造函数; author: Mr_Mao
  * 观察者模式又叫发布订阅和消息模式。是设计模式中非常著名也是非常重要的一种模式。
  * 这种模式一般会定义一个主题和众多个个体，这里主题可以想象为一个消息中心，里面有各种各样的消息，
  * 众多个体可以订阅不同的消息，当未来消息中心发布某条消息的时候，订阅过他的个体就会得到通知。
  * 使用方式: 
  * 订阅消息-> $watcher.subscribe(type, execute)
  * @param {string} type -> 消息名称
  * @param {Function} execute -> 接受消息的回调函数
  * @param {Boolean} _isInit -> 当消息存在时, 是否初始化执行(默认执行)
  * @returns {observe} 返回订阅者实例, 用于取消订阅
  * 
  * 发布消息-> $watcher.publish(type, value, _isSave)
  * @param {string} type 消息名称
  * @param {any} value 消息数据
  * @param {boolean} _isSava 是否保存消息(占用内存)
  * 
  * 取消订阅 -> $watcher.unsubscribe(_observe)
  * @param {observe} 订阅消息返回的订阅者实例(销毁数据，清除缓存)
  */
class Watcher {
  constructor(config = { debugging: false }) {
    this.observes = {} // 订阅者对象集合
    this.message = {} // 消息对象结合
    this.debugging = config.debugging // 是否开启调试模式
  }
  // 发布消息
  publish(type, value, _isSave) {
    // 是否保存该消息(有一次保存消息, 那么之后都会保存消息)
    if (_isSave || this.message[type] !== null) {
      this.message[type] = value
    }
    if (this.debugging) {
      console.log(`观察者发布消息, 共有${this.observes[type] && this.observes[type].length || 0}个订阅者接收消息 ↓`)
      console.log(`消息名称为: `, type, '消息为: ', value)
    }
    // 如果该类型订阅者不存在, 不进行forEach
    if (!Array.isArray(this.observes[type])) { return }
    
    this.observes[type].forEach(_observe => _observe.execute(value))
  }
  // 订阅消息, 返回订阅者
  subscribe(type, execute, _isInit = true) {
    if (!type || !typeof execute == 'function') {
      return
    }
    const _observe = new this.Observe(type, execute)
    // 添加到消息列表对象中
    if (this.observes[type]) {
      this.observes[type].push(_observe)
    } else {
      this.observes[type] = [_observe]
    }
    // 如果该消息存在, 初始化执行
    if (!this.message[_observe.type] && _isInit) {
      _observe.execute(this.message[_observe.type])
    }
    if (this.debugging) {
      console.log(`订阅者订阅消息, 消息名称为: `, type, '订阅者ID: ', _observe.id)
    }
    return _observe
  }
  // 取消订阅
  unsubscribe(_observe) {
    if (this.debugging) {
      console.log('观察者取消该订阅者: ', _observe.id)
    }
    if (!Array.isArray(this.observes[_observe.type])) { return }
    // 查找消息列表, 删除对应订阅者
    for (const i in this.observes[_observe.type]) {
      if (this.observes[_observe.type][i].id === _observe.id) {
        this.observes[_observe.type].splice(i, 1)
        // 如果该类型订阅者数组为空，删除数组和消息
        if (!this.observes[_observe.type].length) {
          delete this.observes[_observe.type]
          delete this.message[_observe.type]
        }
        break;
      }
    }
  }
  // 订阅者构造函数
  Observe = class {
    constructor(type, execute) {
      this.type = type
      this.id = this.Guid()
      if (typeof execute == 'function') {
        this.execute = execute
      }
    }
    execute(message) {
      console.log(`id: ${this.id}, value: ${message}`)
    }
    Guid() {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
  }
}


// 创建观察者实例, 开启调试模式
const watcher = new Watcher({ debugging: true })

// 创建多个订阅者
const observe_1 = watcher.subscribe('user_info', user_info => { })
const observe_2 = watcher.subscribe('user_info', user_info => { })
const observe_3 = watcher.subscribe('user_info', user_info => { })

console.log('----------------分割线----------------')

// 发布消息
watcher.publish('user_info', { name: '毛先生', age: 18 })

console.log('----------------分割线----------------')

// 取消一个订阅
watcher.unsubscribe(observe_2)

console.log('----------------分割线----------------')

// 发布新的消息
watcher.publish('user_info', { name: '鄧脂龍', age: 80 })
~~~

## 策略者模式

~~~js
const fromStrategu = (function (){
  const strategy = {
    notEmpty: val => val.length ? '' : '请填写内容',
    isNumber: val => /^[0-9]+(\.[0-9]+)$/.test(val) ? '' : '请填写一个数字',
    isPhone: val => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(val) ? '' : '手机号格式不正确',
  }
  return {
    validate: function (type, value) {
      value = value.trim()
      return strategy[type] ? strategy[type](value) : '没有该检测方法, 请手动添加'
    },
    addStrategy: function (type, fn) {
      if (strategy[type]){
        return '该方法已存在'
      }
      strategy[type] = fn
    }
  }
})()
~~~



