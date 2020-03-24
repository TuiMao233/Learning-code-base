/* 包含n个操作数据库集合数据的Model模块 */
// 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gzhipin_test', {useMongoClient: true})
mongoose.connection.once("open", ()=> console.log('数据库连接成功'))
mongoose.connection.once("close", ()=> console.log('数据库连接断开'))
// 创建Schema(模式)对象
// 创建Schema(模式)对象
const userSchema = new mongoose.Schema({
    username: {type: String, required: true },
    password: {type: String, required: true},
    type: {type: String,  required: true},// dashen/laoban
    heander: String, // 头像
    post: String, // 职位
    info: String, // 个人或职位简介
    company: String, // 公司名称
    salary: String // 月薪
})
// 定义Model集合操作构造函数
const UserModel = mongoose.model('users', userSchema)


// 向外暴露集合操作构造函数
module.exports = {
    UserModel
}
