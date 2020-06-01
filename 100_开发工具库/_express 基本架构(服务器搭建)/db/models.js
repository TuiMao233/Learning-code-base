/* 包含n个操作数据库集合数据的Model模块 */
// 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gzhipin_test', {useMongoClient: true})
mongoose.connection.once("open", ()=> console.log('数据库连接成功'))
mongoose.connection.once("close", ()=> console.log('数据库连接断开'))

// 向外暴露集合操作构造函数
module.exports = {
   // Model....
}
