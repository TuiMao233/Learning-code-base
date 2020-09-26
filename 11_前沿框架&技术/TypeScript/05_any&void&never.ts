// 3. any 代表任意类型, 一般在获取dom时使用
// 使用场景: 在接收用户输入 或 第三方代码库时, 还不能确定会返回什么类型的指, 此时也可以使用any类型
let txtName: any = document.getElementById('txtN')

// 4. void 代表无类型, 一般用在无返回值的函数中
// TS 函数中必须指定返回值
function say_hi1(): string { return 'hi, 你好呀~' }
const say_hi2 = (): string => 'hi, 你好呀~'
let re1 = say_hi1()
let re2 = say_hi2()
// TS 函数中不需要返回值时需指定void
function say_hi3(): void { console.log('hi啥, 讨厌, 死鬼~~~~') }
const say_hi4 = (): void => console.log('hi啥, 讨厌, 死鬼~~~~')

// 5. never 代表不存在的值的类型, 常用作为抛出异常或无限循环的 函数返回类型
function test_1(): never {
    while (true) { }
}
function test_2(): never {
    throw new Error('讨厌, 死鬼~')
}
// 补充: never类型是ts中的底部类型, 所有类型都是never类型的父类

// 类型推断, 如果变量的声明和初始化是在同一行, 可以省略掉变量类型的声明
let user_name_1 = 'uzi' // --> let user_name_1:string = 'uzi'