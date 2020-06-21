"use strict";
var City = /** @class */ (function () {
    function City(cName, cLevel) {
        this.cName = '';
        this.cName = cName;
        this.cLevel = cLevel;
    }
    City.prototype.about = function () {
        console.log("\u5144\u561A\uFF0C\u4F60\u8DF3\u3010" + this.cName + "\u3011~\u6B64\u5730\u5371\u9669\u7CFB\u6570\u4E3A: \u3010" + this.cLevel + "\u3011");
    };
    return City;
}());
var citv = new City('p城', 5);
