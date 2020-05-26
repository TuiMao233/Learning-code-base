var express = require('express');
var router = express.Router();
// 引入MD5加密包
const md5 = require('blueimp-md5')
// 引入集合操作构造函数
const { UserModel, ChatsModel } = require('../db/models')
/* GET home page. */
router.get('/', (res) => res.render('index', { title: 'Express' }))

// 注册静态资源 loaclhost:4000/....
router.use(express.static('public'))





// 注册路由
router.post('/register', (req, res) => {
  // 读取请求参数->处理->返回响应->
  const { username, password, type } = req.body
  UserModel.findOne({ username }, (error, doc) => {
    // 查询该用户
    if (!error && !doc) {
      // 不存在, 保存用户
      UserModel.create(
        { username, password: md5(password), type },
        (error, doc) => {
          if (!error) {
            // 生成一个cookie(userid: doc._id), maxAge(cookie存活时间)(毫秒单位)
            res.cookie('userid', doc._id, { maxAge: 1000 * 60 * 60 * 24 })
            // 返回成功响应
            res.send({ code: 0, data: { username, type, _id: doc._id } })
          }
        }
      )
    } else {
      // 如果用户存在, 返回失败响应, 该用户已存在
      res.send({ code: 1, msg: '该用户已存在' })
    }
  })
})

// 登录路由
router.post('/login', (req, res) => {
  const { username, password } = req.body
  // 根据username，password查询数据库
  // 如果没有, 返回错误信息, 如果有, 返回登录信息

  UserModel.findOne({ username, password: md5(password) }, { password: 0, _v: 0 }, (error, doc) => {
    if (doc) { // 登录成功
      // 生成一个cookie(userid: doc._id), maxAge(cookie存活时间)(毫秒单位)
      res.cookie('userid', doc._id, { maxAge: 1000 * 60 * 60 * 24 })
      // 返回成功响应
      res.send({ code: 0, data: doc })
    } else {
      res.send({ code: 1, msg: '用户名或密码不正确!' })
    }
  })
})
// 完善信息路由
router.post('/updata', (req, res) => {
  const _id = req.cookies.userid
  if (!_id) { // 如果没登录返回错误响应
    return res.send({ code: 1, msg: '请先登录!' })
  }
  const user = req.body
  UserModel.findByIdAndUpdate(
    { _id },  // 查询条件
    { ...user },  // 修改的key=val
    { "fields": { password: 0, __v: 0 } }, // 返回数据筛选
    (error, oldDoc) => { // 状态回调
      if (!error && oldDoc) {
        res.send({ code: 0, data: { ...oldDoc.toObject(), ...user } })
      } else {
        // 未查询到用户, 代表cookis的userid有误, 需要提示浏览器删除
        res.clearCookie('userid')
        res.send({ code: 1, msg: '完善信息失败' })
      }
    }
  )
})
// _id登录路由
router.get('/user', (req, res) => {
  const _id = req.cookies.userid
  if (!_id) { // 如果没登录返回错误响应
    return res.send({ code: 1, msg: '请先登录!' })
  }
  UserModel.findOne({ _id }, { __v: 0, password: 0 }, (error, doc) => {
    if (!error && doc) {
      res.send({ code: 0, data: doc })
    } else {
      // 未查询到用户, 代表cookis的userid有误, 需要提示浏览器删除
      res.clearCookie('userid')
      res.send({ code: 1, msg: '登录失败' })
    }
  })
})
// 获取用户类型对应的用户列表
router.get('/userlist', (req, res) => {
  const { type } = req.query
  console.log(type)
  UserModel.find(
    { type, "header": { $type: "string" } }, // 判断类型, 并且有头像的
    { __v: 0, password: 0 }, // 筛选数据
    (error, doc) => {
      if (!error && doc) { // 返回数据
        res.send({ code: 0, data: doc })
      } else {
        res.send({ code: 1, msg: '查询失败' })
      }
    })
})
// 获取聊天信息, 与对应的用户信息
router.get('/msglist', (req, res) => {
  const _id = req.cookies.userid
  if (!_id) { res.send({ code: 1, msg: '请先登录' }) }
  ChatsModel.find( // 查询用户对应的聊天记录
    { '$or': [{ from: _id }, { to: _id }] },
    (error, chats) => {
      if (!error && chats) {
        let chatsUserList = [...new Set( // 利用Set构造函数对两个数组的元素去重并组成新的数组
          [...chats.map(item => item.from), ...chats.map(item => item.to)]
        )]
        chatsUserList = chatsUserList.map(item => ({_id:item}))
        UserModel.find( // 查询聊天记录from/to用户的消息(_id, username, header)
          { "$or": chatsUserList },
          { __v: 0, password: 0 }, // 筛选数据
          (error, doc) => {
            if (!error && doc) {
              const users = doc.reduce((total, item) =>  { // 将数组元素叠加上一个对象中,每个keyVal对应着一个聊天用户的消息
                total[item._id] = { username: item.username, header: item.header }
                return total
              }, {})
              res.send({ code: 0, data: { users, chats } })
            }
          }
        )
      }
    }
  )
})
// 修改当前聊天信息为已读
router.post('/readmsg', (req, res) => {
  const from = req.cookies.userid // 我的id
  const to = req.body.from // 接收消息的id
  if (!to) { res.send({ code: 1, msg: '请先登录' }) }
  ChatsModel.updateMany({ from, to, read: false }, { read: true },
    (error, chats) => {
      if (!error && chats) {
        res.send({ code: 0, data: chats.nModified })
      }
    }
  )
})
module.exports = router;
