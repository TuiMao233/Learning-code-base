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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 普通装饰器(无法传参)
var A;
(function (A) {
    // 定义一个装饰器
    function logClass(params) {
        console.log(params);
        // params 就是当前类
        params.prototype.apiUrl = 'xxx';
        params.prototype.run = function () {
            console.log('--我是run方法--');
        };
    }
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
        }
        HttpClient.prototype.getData = function () { };
        HttpClient = __decorate([
            logClass // 对该构造函数使用装饰器
        ], HttpClient);
        return HttpClient;
    }());
    var http = new HttpClient();
    console.log(http.apiUrl);
})(A || (A = {}));
// 装饰器工厂(可传参)
var B;
(function (B) {
    // 定义一个装饰器
    function logClass(params) {
        return function (target) {
            console.log(target);
            // target 就是当前类
            target.prototype.apiUrl = 'xxx';
            target.prototype.run = function () {
                console.log('--我是run方法--');
            };
        };
    }
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
        }
        HttpClient.prototype.getData = function () { };
        HttpClient = __decorate([
            logClass('hello') // 对该构造函数使用装饰器
        ], HttpClient);
        return HttpClient;
    }());
    var http = new HttpClient();
    console.log(http.apiUrl);
})(B || (B = {}));
// 重载构造函数
var C;
(function (C) {
    function logClass(target) {
        // 继承原类, 重载类中的属性与方法
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.apiUrl = '我是修改后的数据';
                return _this;
            }
            class_1.prototype.getData = function () { console.log(this.apiUrl); };
            return class_1;
        }(target));
    }
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
            this.apiUrl = '我是构造函数里面的apiUrl';
        }
        HttpClient.prototype.getData = function () { console.log(this.apiUrl); };
        HttpClient = __decorate([
            logClass
        ], HttpClient);
        return HttpClient;
    }());
    var http = new HttpClient();
    console.log(http.apiUrl);
})(C || (C = {}));
// 属性装饰器
var D;
(function (D) {
    function logProperty(params) {
        return function (target, attr) {
            // target --> HttpClient.prototype
            // attr --> 'url'
            console.log(target);
            console.log(attr);
            target[attr] = params;
        };
    }
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
        }
        HttpClient.prototype.getData = function () { };
        __decorate([
            logProperty('http:itying.com')
        ], HttpClient.prototype, "url", void 0);
        return HttpClient;
    }());
    var http = new HttpClient();
})(D || (D = {}));
// 方法装饰器
var E;
(function (E) {
    function get(params) {
        /** 方法装饰器
         * @param {string} target  HttpClient.prototype-->方法的原型对象
         * @param {string} methodName  成员的名称
         * @param {object} desc  成员方法的描述信息
         */
        return function (target, methodName, desc) {
            // 方法描述器具备类描述器特征, 可以添加, 修改类
            target.apiUrl = 'xxx';
            target.run = function () { return console.log('run'); };
            // 保存旧方法
            var oldMethod = desc.value;
            // 对方法参数进行封装, 强制转换为String
            desc.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return args.map(function (item) { return String(item); });
                // 执行方法
                oldMethod.apply(this, args);
            };
        };
    }
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
        }
        // 在需要装饰的函数上方添加装饰器
        HttpClient.prototype.getData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('我是getdata方法', args);
        };
        __decorate([
            get('http://www.itying.com')
        ], HttpClient.prototype, "getData", null);
        return HttpClient;
    }());
    var http = new HttpClient();
    http.getData(123, 123, 123);
})(E || (E = {}));
// 方法参数装饰器
var F;
(function (F) {
    function logParams(params) {
        /** 方法装饰器
         * @param {string} target  HttpClient.prototype-->方法的原型对象
         * @param {string} methodName  方法名称
         * @param {object} paramsIndex  参数当前的索引
         */
        return function (target, methodName, paramsIndex) {
            // 方法参数描述器具备类描述器特征, 可以添加, 修改类
            target.apiUrl = 'xxx';
            target.run = function () { return console.log('run'); };
        };
    }
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
        }
        // 在需要装饰的函数上方添加装饰器
        HttpClient.prototype.getData = function (uuid) {
            console.log('我是getdata方法', uuid);
        };
        __decorate([
            __param(0, logParams('xxx'))
        ], HttpClient.prototype, "getData", null);
        return HttpClient;
    }());
    var http = new HttpClient();
})(F || (F = {}));
