// 引入链接模块
const mongoose = require('./conn_mongo')
// 引入MD5加密包
const md5 = require('blueimp-md5')
// 创建Schema(模式)对象
const userSchema = new mongoose.Schema({
    username: {type: String, required: true },
    password: {type: String, required: true},
    type: {type: String,  required: true},// dashen/laoban
    heander: String
})

// 定义Model集合操作构造函数
const UserModel = mongoose.model('users', userSchema)

// 创建一个doc对象函数并保存进数据库
function testSave(username, password, type) {
    const userDoc = new UserModel({
        username, password: md5(password), type
    })
    userDoc.save((error, doc) => {
        if (!error) {
            console.log('成功', doc)
        } else {
            // console.log('失败',error)
        }
    })
}
// testSave('usx', '123', 'dashen')

// 查询集合中的所有或者单个doc(find/findOne)
function testFind() {
    UserModel.findOne((error, doc) => {
        if (!error) {
            console.log('成功', doc)
        } else {
            console.log('失败', error)
        }
    })
}
// testFind()

// 通过model的findByIdAndUpdate() 更新某个数据
function testUpdata(find, updata) {
    UserModel.findByIdAndUpdate(find, updata, (error, oldDoc) => {
        if (!error) {
            console.log('修改成功', oldDoc)
        } else {
            console.log('修改失败', error)
        }
    })
}
// testUpdata(
//     {_id: '5e7a20ad838ef40b04839531'},
//     {username: '劳尔'}
// )

// 删除莫个文档
function testDelete(find) {
    UserModel.remove(find, (error, doc) => {
        if (!error) {
            // {n: 删除的数量, ok: 删除成功(1)/删除失败(0)}
            console.log('删除成功', doc)
        } else {
            console.log('删除失败', error)
        }
    })
}
testDelete({_id: '5e7a20ad838ef40b04839531'})