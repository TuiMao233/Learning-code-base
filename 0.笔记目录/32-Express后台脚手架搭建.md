# Express 简述

基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架

# 后台脚手架构建

## 全局安装Express脚手架

`cnpm i express express-generator -g`

## 创建运行脚手架

**创建项目架构：**`express 项目名` 	或项目文件目录下	`express -ejs`

~~~
$ express -h
  Usage: express [options] [dir]
  Options:
    -h, --help          输出使用方法
        --version       输出版本号
    -e, --ejs           添加对 ejs 模板引擎的支持
        --hbs           添加对 handlebars 模板引擎的支持
        --pug           添加对 pug 模板引擎的支持
    -H, --hogan         添加对 hogan.js 模板引擎的支持
        --no-view       创建不带视图引擎的项目
    -v, --view <engine> 添加对视图引擎（view） <engine> 的支持 (ejs|hbs|hjs|jade|pug|twig|vash) （默认是 jade 模板引擎）
    -c, --css <engine>  添加样式表引擎 <engine> 的支持 (less|stylus|compass|sass) （默认是 css 引擎）
        --git           添加 .gitignore
    -f, --force         强制在非空目录下创建
~~~

**进入项目架构安装依赖项：**`cnpm i`

**项目目录运行后台：**`npm start`

## 更改后台端口号

~~~js
var port = normalizePort(process.env.PORT || '3000'); // 3000则是端口号
~~~

## 提供一个注册账号的接口

~~~js
// gzhipin-server/routes/index.js
// req 请求 res 响应
router.post('/register', (req, res) => {
  const { username, password } = req.body
  if (username !== 'admin') {// 注册成功
    // 返回响应
    res.send({ code: 0, data: { _id: 'abc', username: 'xxx', password: '123' } })
  } else { // 注册失败
    // 返回响应
    res.send({code: 1, msg: '此用户已存在'})
  }
})
~~~

## 后台应用自动重运行

安装：`cnpm i nodemon --save`

**配置`package.json/scripts`**

~~~json
"scripts": { "start": "nodemon ./bin/www" },
~~~

# 创建数据库&MD5加密

**后端脚手架安装：**`cnpm i mongoose blueimp-md5 --save`

## 创建模型集合

`db/models.js`

~~~js
/* 包含n个操作数据库集合数据的Model模块 */
// 连接数据库
mongoose.connect('mongodb://localhost/gzhipin_test', {useMongoClient: true})
mongoose.connection.once("open", ()=> console.log('数据库连接成功'))
mongoose.connection.once("close", ()=> console.log('数据库连接断开'))
// 引入MD5加密包
const md5 = require('blueimp-md5')
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
~~~

# 定义注册的后台路由

~~~js
// routes/index.js
...
// 引入MD5加密包
const md5 = require('blueimp-md5')
// 引入集合操作构造函数
const { UserModel } = require('../db/models')
// 注册路由	
router.post('/register', (req, res) => {
  // 读取请求参数->处理->返回响应->
  const { username, password, type } = req.body
  // 对用户名查询
  UserModel.findOne({ username }, (error, doc) => {
    // 查询该用户
    if (!error && !doc) {// 不存在, 保存用户
      UserModel.create({ username, password: md5(password), type },
        (error, doc) => {
          // 生成一个cookie(userid: doc._id), maxAge(cookie存活时间)(毫秒单位)
          res.cookie('userid', doc._id, { maxAge: 1000 * 60 * 60 * 24 })
          // 返回注册成功响应
          res.send({ code: 0, data: { username, type, _id: doc._id } })
       })
    } else { // 如果用户存在, 返回失败响应, 该用户已存在
      res.send({ code: 1, msg: '该用户已存在' })
    }
  })
})
~~~

###### ###### 

# Exproess 静态文件接口

~~~js
router.static('public')
// localhost:4000/a.mp3 --> public/a.mp3
// localhost:4000/static/a.mp3 --> public/a.html
// localhost:4000/static/a.mp3 --> public/a.js
~~~

为该`express.static`功能所服务的文件创建虚拟路径前缀（文件系统中实际上不存在该路径），请为静态目录[指定安装路径](http://expressjs.com/en/4x/api.html#app.use)，如下所示

~~~js
app.use('/static', express.static('public'))
// localhost:4000/static/a.mp3 --> public/a.mp3
// localhost:4000/static/a.mp3 --> public/a.html
// localhost:4000/static/a.mp3 --> public/a.js
~~~

# Exproess 定义下载数据

<img src=".\img\express\a标签模拟下载.png" alt="a标签模拟下载"  />

# Exproess 反向代理

~~~js
var express = require('express');
var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://192.168.0.48:9005";//目标后端服务地址(公司同事电脑地址)
var proxyOption ={target:proxyPath,changeOrigoin:true};
var app = express();

app.use("/",proxyMiddleWare(proxyOption))// 代理匹配路由
app.listen(8000);
module.exports = router;
~~~

