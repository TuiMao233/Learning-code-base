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
    header: String, // 头像
    post: String, // 职位
    info: String, // 个人或职位简介
    company: String, // 公司名称
    salary: String // 月薪
})
// 定义Model集合操作构造函数
const UserModel = mongoose.model('users', userSchema)

// 定义chats集合的文档结构
const chatSchema = mongoose.Schema({
    from: {type:String, required: true}, // 发送用户的id
    to: {type: String, required: true},  // 接收用户的id
    chat_id: {type: String, required: true}, // from和to组成的聊天标识
    content: {type: String, required: true}, // 一条消息的内容
    read: {type:Boolean, default: false}, // 标识是否已读(只有接受者才需要的数据)
    create_time: Number // 创建这条聊天的时间
})
const ChatsModel = mongoose.model('chats', chatSchema)
// 向外暴露集合操作构造函数
module.exports = {
    UserModel, ChatsModel
}
