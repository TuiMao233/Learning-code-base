//=============第1题 作用域===============
var num1 = 55;
var num2 = 66;

function f1(num, num1) {
    num = 100;
    num1 = 100;
    num2 = 100;
    console.log(num);
    console.log(num1);
    console.log(num2);
}
f1(num1, num2);
console.log(num1);
console.log(num2);
console.log(num);
// 该题目的执行结果是什么: 


//===========第2题  值类型和引用类型的传递=============
function Person(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
}
function f1(person) {
    person.name = "ls";
    person = new Person("aa", 18, 10);
}
var p = new Person("zs", 18, 1000);
console.log(p.name);
f1(p);
console.log(p.name);
// 该题目的执行结果是什么: 