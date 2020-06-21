"use strict";
// 2. 枚举(enum): 用一组标识来代替数值, 方便程序员调用理解
// 枚举项 一般用英文和数字, 而枚举值 用整型数字
var GunType_1;
(function (GunType_1) {
    GunType_1[GunType_1["M416"] = 1] = "M416";
    GunType_1[GunType_1["AK47"] = 2] = "AK47";
    GunType_1[GunType_1["Goza"] = 3] = "Goza";
})(GunType_1 || (GunType_1 = {}));
// 枚举值不指定默认赋值枚举值
var GunType_2;
(function (GunType_2) {
    GunType_2[GunType_2["M416"] = 0] = "M416";
    GunType_2[GunType_2["AK47"] = 1] = "AK47";
    GunType_2[GunType_2["Goza"] = 2] = "Goza"; // --> 3
})(GunType_2 || (GunType_2 = {}));
// 使用场景：判断性别类型男, 女, 未知
// 声明性别枚举
var Gender;
(function (Gender) {
    Gender[Gender["Boy"] = 0] = "Boy";
    Gender[Gender["Girl"] = 1] = "Girl";
    Gender[Gender["Unknow"] = 2] = "Unknow"; // 未知 --> 2
})(Gender || (Gender = {}));
// 创建用户性别变量
// let usrSex: Gender = Gender.Boy
var usrSex = Gender.Boy;
// 判断变量中的性别是否为 Boy
if (usrSex == Gender.Boy) {
    console.log(usrSex); // 0
}
else {
    console.log(usrSex); // 1 or 2
}
