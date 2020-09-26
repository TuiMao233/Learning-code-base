class Animal {
    protected name: string; // 类与子类私有属性, 外部不可访问
    constructor(theName: string) {
        this.name = theName;
    }
    about (){
        console.log(this.name);
    }
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