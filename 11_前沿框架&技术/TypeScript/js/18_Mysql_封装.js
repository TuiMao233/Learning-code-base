"use strict";
/*
    功能：定义一个操作数据库的库 支持Mysql Mssql MongoDB
    要求：Mysql MsSql MongoDb功能一样 都有add、update、delete、get方法
    注意：约束统一的规范、以及代码重用
    解决方案：需要约束规范所以要定义接口，需要代码重用所以要用到泛型
        1. 接口：在面向对象的编程中，接口是一种规范的定义，他定义了行为和动作的规范
        2. 泛型：泛型就是解决类 接口 方法的重用性
*/
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
        console.log('--数据库建立连接--');
    }
    MysqlDb.prototype.add = function (info) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.update = function (info) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MysqlDb;
}());
// 定义一个操作mssql数据库的类
var MssqlDb = /** @class */ (function () {
    function MssqlDb() {
        console.log('--数据库建立连接--');
    }
    MssqlDb.prototype.add = function (info) {
        throw new Error("Method not implemented.");
    };
    MssqlDb.prototype.update = function (info) {
        throw new Error("Method not implemented.");
    };
    MssqlDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MssqlDb.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MssqlDb;
}());
// 操作用户表 定义一个User类和数据表做映射
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var u = new User();
u.username = '张山';
u.username = '123456';
var oMysql = new MysqlDb();
oMysql.add(u);
var oMssql = new MssqlDb();
oMssql.add(u);
