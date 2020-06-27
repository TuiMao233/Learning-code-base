"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 抽象类不能直接实例化, 抽象类是给予子类的一个基类
var Animal_2 = /** @class */ (function () {
    function Animal_2() {
    }
    return Animal_2;
}());
// new Animal() // 报错
var Rhino_2 = /** @class */ (function (_super) {
    __extends(Rhino_2, _super);
    function Rhino_2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 抽象类的子类必须实现抽象类里面的抽象方法
    Rhino_2.prototype.eat = function () { };
    return Rhino_2;
}(Animal_2));
