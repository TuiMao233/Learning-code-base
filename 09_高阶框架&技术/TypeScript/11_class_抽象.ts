// 抽象类不能直接实例化, 抽象类是给予子类的一个基类
abstract class Animal_2 {
    // 定义一个抽象方法, 继承该类时该方法必须定义
    abstract eat():any;
}
// new Animal() // 报错
class Rhino_2 extends Animal_2 {
    // 抽象类的子类必须实现抽象类里面的抽象方法
    eat() {/*...*/}
}