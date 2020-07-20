// TS 函数中单函数约束
function printLabel (label:string):void {
    console.log('')
}
printLabel('hahaha') // 必须传入参数

// TS 函数中对对象传参中的约束
function printLabel_1 (labelInfo:{label:string}):void {
    console.log(labelInfo)
}
printLabel_1({label: 'hahaha'}) // 必须传入对象, 对象中存在label参数, 并且是字符串