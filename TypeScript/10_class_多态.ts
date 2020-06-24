class Animal_1 {
    eat() {/*...*/}
}
class Rhino_1 extends Animal_1 { // extends关键字继承父类所有方法
    // 类的多态, 每个类都有一样的方法, 不一样的行为
    // 如果子类没有方法, 则使用当前继承类的方法
    eat() {/*...*/}
}