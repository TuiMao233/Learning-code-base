class City {
    // 成员属性
    private cName: string = '' // 私有属性, 类外部不可访问
    cLevel!: number // 属性值!:number 代表值可以为空(undefined)

    constructor(cName: string, cLevel: number) {
        this.cName = cName
    }
    // 私有方法, 类外部不可访问
    private about(): void {
        console.log(`您要跳${this.cName}, 难度系数为${this.cLevel}`);
    }
    
}
const citv = new City('p城', 5)

// console.log(citv.cName) // 属性“cName”为私有属性，只能在类“City”中访问。
console.log(citv.cLevel) // 5
// citv.about() // 属性“about”为z私有属性，只能在类“City”中访问。
