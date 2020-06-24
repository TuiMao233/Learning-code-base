
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
class MinClass<Type> {
    public list: Type[] = [];
    add(num: Type) {
        this.list.push(num)
    }
    min(): Type {
        var minNum = this.list[0]
        this.list.forEach(item => {
            if (minNum > item) minNum = item
        });
        return minNum
    }
}
const m = new MinClass<number|string>()
m.add(34214)
m.add(312)
m.add(33)
console.log(m.min);
