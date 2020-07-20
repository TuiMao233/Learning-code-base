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
var Animal_1 = /** @class */ (function () {
    function Animal_1() {
    }
    Animal_1.prototype.eat = function () { };
    return Animal_1;
}());
var Rhino_1 = /** @class */ (function (_super) {
    __extends(Rhino_1, _super);
    function Rhino_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 类的多态, 每个类都有一样的方法, 不一样的行为
    // 如果子类没有方法, 则使用当前继承类的方法
    Rhino_1.prototype.eat = function () { };
    return Rhino_1;
}(Animal_1));
