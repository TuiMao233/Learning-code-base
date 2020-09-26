// TS函数中必须指定返回值类型, 如果不指定, 默认会自动指定类型
function fun_1(): string {
    return '讨厌~~'
}
let content_1: string = fun_1()

// TS函数中形参指定必选类型, 且与实参参数与数量必须一致
function fun_2(u_name: string, u_age: number): string {
    return `您的名称是:${u_name}, 年龄是:${u_age}`
}
let content_2: string = fun_2('毛先生', 15)

// TS函数中指定可选类型, 可选参数可传, 也可不传
function fun_3(u_name?: string) { console.log(u_name) }
fun_3()
// 当指定了初始值, 也可不需要传入参数
function fun_4(u_name: string = '毛先生') { console.log(u_name) }
fun_4()

// TS中剩余参数的写法
function fun_5(a: number, b: number, ...allNum: number[]) {
    let num = a + b
    for (const ele of allNum) {
        num += ele
    }
    console.log(num);
}
fun_5(6, 8, 456, 4561, 123);