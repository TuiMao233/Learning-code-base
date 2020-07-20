// 第一种定义泛型的方法
interface ConfigFn<Type> {
    <Type>(value: Type): Type
}
const getData = function<Type>(value:Type):Type {
    return value
}
const myGetData:ConfigFn<string> = getData