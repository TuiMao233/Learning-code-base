"use strict";
// TS函数中必须指定返回值类型, 如果不指定, 默认会自动指定类型
function fun_1() {
    return '讨厌~~';
}
var content_1 = fun_1();
// TS函数中形参指定必选类型, 且与实参参数与数量必须一致
function fun_2(u_name, u_age) {
    return "\u60A8\u7684\u540D\u79F0\u662F:" + u_name + ", \u5E74\u9F84\u662F:" + u_age;
}
var content_2 = fun_2('毛先生', 15);
// TS函数中指定可选类型, 可选参数可传, 也可不传
function fun_3(u_name) { console.log(u_name); }
fun_3();
// 当指定了初始值, 也可不需要传入参数
function fun_4(u_name) {
    if (u_name === void 0) { u_name = '毛先生'; }
    console.log(u_name);
}
fun_4();
// TS中剩余参数的写法
function fun_5(a, b) {
    var allNum = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        allNum[_i - 2] = arguments[_i];
    }
    var num = a + b;
    for (var _a = 0, allNum_1 = allNum; _a < allNum_1.length; _a++) {
        var ele = allNum_1[_a];
        num += ele;
    }
    console.log(num);
}
fun_5(6, 8, 456, 4561, 123);
