// 2. 枚举(enum): 用一组标识来代替数值, 方便程序员调用理解
// 枚举项 一般用英文和数字, 而枚举值 用整型数字
enum GunType_1 {
    M416 = 1,
    AK47 = 2,
    Goza = 3
}
// 枚举值不指定默认赋值枚举值
enum GunType_2 {
    M416, // --> 1
    AK47, // --> 2
    Goza  // --> 3
}

// 使用场景：判断性别类型男, 女, 未知
// 声明性别枚举
enum Gender {
    Boy, // 男孩 --> 0
    Girl, // 女孩 --> 1
    Unknow // 未知 --> 2
}
// 创建用户性别变量
// let usrSex: Gender = Gender.Boy
let usrSex = Gender.Boy
// 判断变量中的性别是否为 Boy
if(usrSex == Gender.Boy){
    console.log(usrSex) // 0
}else {
    console.log(usrSex) // 1 or 2
}