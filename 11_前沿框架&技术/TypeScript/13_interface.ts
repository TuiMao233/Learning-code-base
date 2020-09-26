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
