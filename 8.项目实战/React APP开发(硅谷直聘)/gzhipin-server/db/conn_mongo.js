const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/gzhipin_test', {useMongoClient: true})
mongoose.connection.once("open", ()=> console.log('数据库连接成功'))
mongoose.connection.once("close", ()=> console.log('数据库连接断开'))

module.exports = mongoose