"use strict";
var City = /** @class */ (function () {
    function City(cName, cLevel) {
        // 成员属性
        this.cName = ''; // 私有属性, 类外部不可访问
        this.cName = cName;
    }
    // 私有方法, 类外部不可访问
    City.prototype.about = function () {
        console.log("\u60A8\u8981\u8DF3" + this.cName + ", \u96BE\u5EA6\u7CFB\u6570\u4E3A" + this.cLevel);
    };
    return City;
}());
var citv = new City('p城', 5);
// console.log(citv.cName) // 属性“cName”为私有属性，只能在类“City”中访问。
console.log(citv.cLevel); // 5
// citv.about() // 属性“about”为z私有属性，只能在类“City”中访问。
