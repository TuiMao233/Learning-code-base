"use strict";
// 同时返回string类型和number类型 (代码多余)
function getData1(value) {
    return value;
}
function getData2(value) {
    return value;
}
// 同时返回string类型和number类型 (放弃了类型检查)
function getData3(value) {
    return value;
}
// 泛型支持不特定的数据类型, 要求:传入的参数和返回的参数一致
function getData4(value) {
    return value;
}
getData4(123456);
// 泛型类
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = []; // 创建一个泛型数组, 元素类型为泛型中的类型
    }
    MinClass.prototype.add = function (num) {
        this.list.push(num);
    };
    MinClass.prototype.min = function () {
        return this.list.reduce(function (total, item) { return (total > item ? item : total); }, this.list[0]);
    };
    return MinClass;
}());
var m = new MinClass();
m.add(34214), m.add(312), m.add(33);
console.log(m.min);
