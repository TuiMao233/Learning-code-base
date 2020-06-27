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
var arr = ['123213213213', '12312321321'];
var Dow = /** @class */ (function () {
    function Dow(myName) {
        this.myName = myName;
    }
    Dow.prototype.eat = function (str) {
    };
    return Dow;
}());
var Web = /** @class */ (function () {
    function Web() {
    }
    Web.prototype.eat = function () { };
    Web.prototype.work = function () { };
    return Web;
}());
var Prog = /** @class */ (function (_super) {
    __extends(Prog, _super);
    function Prog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Prog;
}(Web));
