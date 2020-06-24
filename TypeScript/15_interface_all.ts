// 可索引接口对数组的约束
interface UserArr {
    [index: number]: string // 定义索引值必须得是number, 元素值必须得是string
}
const arr: UserArr = ['123213213213', '12312321321']
// 可索引接口对对象的约束
interface UserObj {
    [index: string]: string // 定义索引值必须得是number, 元素值必须得是string
}
// const obj: UserObj = {key: 'value', name: 123} // 报错


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
    eat(str:number) {

    }
}

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
