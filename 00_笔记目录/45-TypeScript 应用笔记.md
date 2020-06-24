# TypeScript 简介

TypeScript是一种由微软开发的[开源](https://baike.baidu.com/item/开源/246339)、跨平台的编程语言。它是[JavaScript](https://baike.baidu.com/item/JavaScript)的超集，最终会被编译为JavaScript代码。TypeScript添加了可选的静态类型系统、很多尚未正式发布的ECMAScript新特性（如装饰器 [1] ）。2012年10月，微软发布了首个公开版本的TypeScript，2013年6月19日，在经历了一个预览版之后微软正式发布了正式版TypeScript。当前最新版本为TypeScript3.8。 

## TypeScript 安装

**全局安装：**npm install -g typescript
**效验：**tsc -v

## 设置 VSCode 自动编译

运行 tsc --init 创建tsconfig.json文件
修改tsconfig.json，设置js文件夹 "outDir": "./js/"
![1592708340(1)](/img/typescript/1592708340(1).jpg)

# TypeScript 语法

## TS 变量创建指定类型

~~~ts
// ts创建变量时指定变量类型, 当指定特定类型时, 改变为别的类型将会编译错误
let user_name: string = 'dsdasda'
user_name = 0 // 报错
// 当一个变量需要储存多个值时, 需要用到联合类型语法
let somThing: string | number = '112132'
somThing = 0
// 如果变量的声明和初始化是在同一行, 可以省略掉变量类型的声明
let user_name_1 = 'uzi' // --> let user_name_1:string = 'uzi'
~~~

## TS 基本类型

~~~typescript
let aName: string = '貂蝉'
let dAge: number = 18
let isSingLeDog: boolean = true
let undef: undefined = undefined
let nul: null = null
~~~

## TS 数组类型

~~~js
// JS中数组可以放任意值, ts数组需指定元素类型
let arrJS = [1, 'a', true, [], {}]
// ts方式一：let 数组名:类型[] = [值1, 值2]
let arrHeros: string[] = ['安其拉', '亚索', '大乔']
// ts方式二: let 数组名:Array<类型> = [值1, 值2] 该数组为泛型数组
let arrHeroAge: Array<number> = [17, 231, 23]
~~~

## TS 函数类型

~~~typescript
// TS中函数必须指定返回值类型, 如果不指定, 默认会自动指定类型
function fun_1(): string {
    return '讨厌~~'
}
let content_1: string = fun_1()

// TS中形参必须指定类型, 且与实参参数与数量必须一致
function fun_2(u_name: string, u_age: number): string {
    return `您的名称是:${u_name}, 年龄是:${u_age}`
}
let content_2: string = fun_2('毛先生', 15)
~~~

~~~typescript
// TS函数中指定可选类型, 可选参数可传, 也可不传
function fun_3(u_name?:string) { console.log(u_name) }
fun_3()
// 当指定了初始值, 也可不需要传入参数
function fun_4(u_name:string = '毛先生') { console.log(u_name) }
fun_4()
~~~

~~~js
// TS中剩余参数的写法
function fun_5(a: number, b: number, ...allNum: number[]) {
    let num = a + b
    num += allNum.reduce((total, item):number => total += item, 0)
    console.log(num);
}
fun_5(6, 8, 456, 4561, 123);
~~~

~~~typescript
// ts中, 方法的重载, 定义多个方法, 参数统一接受
function getInfo(name:string):string;
function getInfo(age:number):number;
function getInfo(str:any):any{
    if (typeof str === 'string')
        return `我叫：${str}`
    else 
        return `我的年龄是：${str}`
}
~~~

# TypeScript 新增数据类型

## TS 元组(tuple)

tuple元组就是一个规定了元素数量和每个元素类型的数组，而每个元素的类型, 可以不相同

~~~js
let tup1: [string, number, boolean] = ['讨厌', 18, true]
console.log(tup1[0])
console.log(tup1.length)
~~~

## TS 枚举(enum)

~~~js
enum GunType_1 {
    M416 = 1,
    AK47 = 2,
    Goza = 3
}
// 枚举值不指定默认赋值枚举值
enum GunType_2 {
    M416, // --> 1
    AK47, // --> 2
    Goza  // --> 3
}
~~~

**使用场景：判断性别类型男, 女, 未知**

~~~typescript
enum Gender {
    Boy, // 男孩 --> 1
    Girl, // 女孩 --> 2
    Unknow // 未知 --> 3
}
// 创建用户性别变量
// let usrSex: Gender = Gender.Boy
let usrSex = Gender.Boy
// 判断变量中的性别是否为 Boy
if(usrSex == Gender.Boy){
    console.log(usrSex) // 1
}else {
    console.log(usrSex) // 2 or 3
}
~~~

[^注意]:枚举项 一般用英文和数字, 而枚举值 用整型数字

## TS 任意类型(any)

any 代表任意类型, 一般在获取dom时使用

~~~js
// 在接收用户输入 或 第三方代码库时, 还不能确定会返回什么类型的指, 此时也可以使用any类型
let txtName: any = document.getElementById('txtN')
~~~

## TS 无类型(void)

因为TS 函数中必须指定返回值，但有些函数是不需要返回值的，所以无返回值的函数中使用void代表无返回值的函数。

~~~js
// TS 函数中必须指定返回值
function say_hi1(): string { return 'hi, 你好呀~' }
const say_hi2 = (): string => 'hi, 你好呀~'
let re1 = say_hi1()
let re2 = say_hi2()
// TS 函数中不需要返回值时需指定void
function say_hi3(): void { console.log('hi啥, 讨厌, 死鬼~~~~') }
const say_hi4 = (): void => console.log('hi啥, 讨厌, 死鬼~~~~')
~~~

## TS 不存在值(never)

never 代表不存在的值的类型, 常用作为抛出异常或无限循环的 函数返回类型

~~~js
function test_1(): never {
    while (true) { }
}
function test_2(): never {
    throw new Error('讨厌, 死鬼~')
}
// never类型可以赋值给任意类型的变量
let x:never = test_1()
let y:string = test_2()
~~~

[^补充]:never类型是ts中的底部类型, 所有类型都是never类型的父类，所以never类型可以赋值给任意类型的变量

# TypeScript Class类 规范

## TS Class 类基本架构

~~~typescript
class City {
    // 成员属性
    cName: string = ''
    cLevel: number
    constructor(cName: string, cLevel: number) {
        // 初始化构造器
        this.cName = cName
        this.cLevel = cLevel
    }
    about(): void {
        console.log(`您要跳${this.cName}, 难度系数为${this.cLevel}`);
    }
    static count = 50 // 静态属性
    static fun () {/*...*/} // 静态方法
}
// 创建构造对象, 参数未设置默认值或可为空, 默认必传
const citv = new City('p城', 5)
console.log(citv.cName) // 'p城'
console.log(citv.cLevel) // 5
citv.about() // ....
~~~

## TS Class 类修饰符

~~~typescript
class City {
    // 成员属性
    private cName: string = '' // 私有属性, 类外部不可访问
    cLevel!: number // 属性值!:number 代表值可以为空(undefined)

    constructor(cName: string, cLevel: number) {
        this.cName = cName
    }
    // 私有方法, 类外部不可访问
    private about(): void { console.log(`您要跳${this.cName}, 难度系数为${this.cLevel}``); }
    // 共有方法, 类外部可访问
    public about_2(): void {/*...*/}
	// protected, 派生类公共方法, 类外部不可访问, 但继承类可访问
	protected about_3(): void {/*...*/}
}
const citv = new City('p城', 5)

console.log(citv.cName) // 属性“cName”为私有属性，只能在类“City”中访问。
console.log(citv.cLevel) // 5
citv.about() // 属性“about”为私有属性，只能在类“City”中访问。

~~~

## TS Class 继承类

~~~typescript
class Animal {
    protected name: string; // 类与子类私有属性, 外部不可访问
    constructor(theName: string) {
        this.name = theName;
    }
    about (){ console.log(this.name); }
}
class Rhino extends Animal { // extends关键字继承父类所有方法
    constructor() {
        super('Rhino'); // 调用父类的构造器函数, 获取父类的属性与属性值
    }
    getName() {
        console.log(this.name) //此处的name就是Animal类中的name
        this.about()
    }
}
~~~

## TS Class 多态类

~~~typescript
class Animal {
    eat() {/*...*/}
}
class Rhino extends Animal { // extends关键字继承父类所有方法
    // 类的多态, 每个类都有一样的方法, 不一样的行为
    // 如果子类没有方法, 则使用当前继承类的方法
    eat() {/*...*/}
}
~~~

## TS Class 抽象类

~~~typescript
// 抽象类不能直接实例化, 抽象类是给予子类的一个基类
abstract class Animal {
    // 定义一个抽象方法, 继承该类时该方法必须定义
    abstract eat():any;
}
// new Animal() // 报错
class Rhino extends Animal {
    // 抽象类的子类必须实现抽象类里面的抽象方法
    eat() {/*...*/}
}
~~~

# TypeScript 接口 规范

## 对象类型接口

~~~js
// TS 函数中单函数约束
function printLabel (label:string):void {
    console.log('')
}
printLabel('hahaha') // 必须传入参数
~~~

~~~js
// TS 函数中对对象传参中的约束
function printLabel (labelInfo:{label:string}):void {
    console.log('')
}
printLabel({label: 'hahaha'}) // 必须传入对象, 对象中存在label参数, 并且是字符串
~~~

~~~typescript
// 利用接口定义对象参数的约束规范
interface FullName{
    firstName: string; // 定义必须接口
    secondName: string; // 定义必须接口
    age?: number; // 定义可选接口
}
function printName (name:FullName){
    console.log(`${name.firstName}---${name.secondName}`)
}
function printInfo(name:FullName) {
    console.log(`${name.firstName}---${name.secondName}`)
}
printInfo({
    firstName: '张',
    secondName: '三'
})
printName({
    age: 20,
    firstName: '张',
    secondName: '三'
})
~~~

## 函数类型接口

~~~typescript
// 对方法传入的参数以及返回值进行约束 批量约束 
interface encypt{
	(key:string, value:string):string;
}
var md5:encypt = function (key, value):string{
	return key + ' ' + value // 模拟加密操作
}
console.log(md5('李', '二狗'))
var sha1:encypt = function(key, value):string{
	return key + '--' + value
}
console.log(sha1('dog', 'zi'))
~~~

## 索引类型接口

~~~typescript
// 可索引接口对数组的约束
interface UserArr {
    [index: number]: string // 定义索引值必须得是number, 元素值必须得是string
}
const arr: UserArr = ['123213213213', '12312321321']
// 可索引接口对对象的约束
interface UserObj {
    [index: string]: string // 定义索引值必须得是number, 元素值必须得是string
}
const obj: UserObj = {key: 'value', name: 123} // 报错
~~~

## 类类型接口

~~~typescript
// 类类型接口, 与抽象类类似, 但抽象类不可以规范属性, 类接口可以
interface Animal_ {
    myName: string;
    eat(str:number): any;
}
class Dow implements Animal_ {
    myName:string
    constructor(myName:string) {
        this.myName = myName
    }
    eat(str:number) { }
}
~~~

## 接口的继承

~~~typescript
// 接口的继承
interface Animal_gf {
    eat(): void;
}
interface Person extends Animal_gf {
    work(): void;
}
class Web implements Person{
    eat(){}
    work(){}
}
class Prog extends Web implements Person {
    
}
~~~

# TypeScript 泛型 规范



## 泛型规定函数传参

~~~typescript
// 泛型支持不特定的数据类型, 要求传入的参数和返回的参数一致
function getData4<T>(value: T): T {
    return value
}
getData4<number>(123456)
~~~

