var express = require('express');
var router = express.Router();
// 引入MD5加密包
const md5 = require('blueimp-md5')
// 引入集合操作构造函数
const { UserModel } = require('../db/models')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

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
          // 生成一个cookie(userid: doc._id), maxAge(cookie存活时间)(毫秒单位)
          res.cookie('userid', doc._id, { maxAge: 1000 * 60 * 60 * 24 })
          // 返回成功响应
          res.send({ code: 0, data: { username, type, _id: doc._id } })
        }
      )
    } else {
      // 如果用户存在, 返回失败响应, 该用户已存在
      res.send({ code: 1, msg: '该用户已存在' })
    }
  })
})
module.exports = router;
