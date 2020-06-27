
// 同时返回string类型和number类型 (代码多余)
function getData1(value: string): string {
    return value
}
function getData2(value: number): number {
    return value
}
// 同时返回string类型和number类型 (放弃了类型检查)
function getData3(value: any): any {
    return value
}
// 泛型支持不特定的数据类型, 要求:传入的参数和返回的参数一致
function getData4<T>(value: T): T {
    return value
}
getData4<number>(123456)


// 泛型类
class MinClass<Type> { // 接收一个泛型类型
    public list: Type[] = []; // 创建一个泛型数组, 元素类型为泛型中的类型
    add(num: Type) { // 创建一个函数, num类型为泛型中的类型
        this.list.push(num)
    }
    min(): Type { // 返回一个属性, 返回类型为泛型中的类型
        return this.list.reduce(
            (total, item) => (total > item ? item : total),
            this.list[0]
        )
    }
}
const m = new MinClass<number | string>()
m.add(34214), m.add(312), m.add(33)
console.log(m.min);
