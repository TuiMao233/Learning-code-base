---
title: Express Web服务开发
date: 2020-11-01
categories:
  - 
tags: 
  - express
---
## Express 简述

Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架，为 Web 和移动应用程序提供一组强大的功能。

####### ###

## Express 的基本使用

### 服务器的基本实现

~~~js
// 引入express模块
const express = require('express')
// 创建app应用对象
const app = express()
// 添加中间件, 该中间件所有请求都会通过(可选)
app.use((req, res, next)=>{})
// 监听端口号, 启动服务器
app.listen(3000, ()=> console.log('服务器启动成功'))
~~~

### 后台路由的基本特性

~~~js
const express = require('express')
const app = express()

// 创建一个get请求, 路径是/search
app.get('/search', (req, res) => {
    //处理并返回数据.....
    res.send({ code: 1, msg: "请求成功" })
})
// 创建一个post请求, 路径是/search
app.post('login', (req, res) => {
    //处理并返回数据.....
    res.send({ code: 1, msg: "请求成功" })
})

app.listen(3000, () => console.log('服务器启动成功'))
~~~

### req (请求) 携带的常用参数

~~~js
const express = require('express')
const app = express()

app.get('/search', (req, res) => {
    // 查询字符串组成的对象 通常在get请求中使用
    console.log(req.query) // => {...}

    // 请求体中携带的对象 通常在post请求中使用
    console.log(req.body) // => {...}

    // 请求中的占位符 如/search:id中, id是占位符, 则可以获取params.id的值
    console.log(req.params) // => {...}
    // 当使用正则表达式来定义路由占位符规则时, req.params通常是一个数组
    console.log(req.params[0])

    // 使用cookie-parser中间件后, 则是请求中携带的cookies, 如果没有则为{}
    console.log(req.cookies) // => {...}
    // 请求中发送过来的签名cookies(加密) 如不是签名的cookies, 则是空对象
    console.log(req.signedCookies) // => {...}

    // 接收流体数据使用req.on方法(可promise封装)
    let data = ''
    req.on('data', (buffer_data) => data+=buffer_data.toString() )
    // 接收完毕, 此时数据是完整的
    .on('end', ()=> console.log(data) )

    res.send({ code: 1, msg: "请求成功" })
})

app.listen(3000, () => console.log('服务器启动成功'))
~~~

### res (响应) 携带的常用参数

~~~js
const express = require('express')
const app = express()

app.get('/search', (req, res) => {

    // 将cookie设置name为value, 后面还可以跟一个配置对象
    res.cookie('name', 'value', {
        domain: '.example.com', // Cookie的域名. 默认为应用程序的域名
        path: '/admin', // Cookie的路径. 默认为/
        expires: new Date(Date.now() + 900000), // cookies的过期时间, 未指定或设置为0, 则创建会话cookie. 
        secure: true,  // 将cookie标记为仅与HTTPS一起使用. 
        httpOnly: true, // 将Cookie标记为只能由Web服务器访问. 
      	signed: true // 设置cookie为加密(引入中间件函数参数为secret)
    })
    // 清除由指定的Cookie name, 后面还可以跟着一个配置对象, 该配置对象与 res.cookie基本一致
    res.clearCookie('name', {})

    // path以attachment(附件)的方式传输文件(相对路径, 全路径)
    // 通常浏览器会提示下载, 底层代码通过res.sendFile实现
    res.download('/report-12345.pdf')
    res.download('/report-12345.pdf', 'report.pdf')
    res.download('/report-12345.pdf', 'report.pdf', (err) => { })

    // 用于快速结束响应 而无需任何数据
    res.end()
    res.status(404).end()

    // 返回一个json格式的响应数据
    res.json({ code: 1, msg: "请求成功" })
    // 返回一个支持jsonp的响应数据
    res.jsonp({ code: 1, msg: "请求成功" })
    // 返回一个http响应数据, body参数可以是对象, 字符串, Buffer对象或一个Array
    res.send({ code: 1, msg: "请求成功" })
    // path以attachment(附件)的方式传输文件(全路径)
    res.sendFile(__dirname + '/download/download.txt');
    
    // 根路径重定向
    res.redirect('/admin')
    // 相对当前路径URL 如当前路径是/admin/home那么重定向后就是/admin/home/post/new
    res.redirect('post/new')
    // 重定向其他站点URL
    res.redirect('http://example.com')
    // 重定向路径后退, 如当前路径是/admin/home那么重定向后就是/admin
    res.redirect('..')

    // views中的模板资源渲染为html并返回响应
    // 后面可传入数据对象供模板使用
    res.render('search', { name: '孙悟空' })
})

app.listen(3000, () => console.log('服务器启动成功'))
~~~

### 常用配置&中间件的使用

~~~js
const express = require('express')
const app = express()
//.....
app.listen(3000, () => console.log('服务器启动成功'))
~~~

#### 设置模板资源

~~~js
// 配置模板资源目录的绝对路径 与 模板引擎为ejs
// 通常配合res.render使用, 返回渲染页面
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
~~~

#### router 中间件

~~~js
// 创建一个路由器, 该路由器有use/get/post...等方法
// router通常用来构建模块化, 需要最后app.use(router)引入
const router = express.Router()
app.use(router)
~~~

#### cookies 中间件

~~~js
const cookieParser = require('cookie-parser');
// 添加cookie中间件
app.use(cookieParser());
// 中间件可设置为加密
app.use(cookieParser('secret'));
~~~



#### static 中间件

~~~js
// 添加静态资源访问路径, 后面可跟一个配置对象
app.static('public')
// localhost:4000/a.mp3 --> public/a.mp3
// localhost:4000/static/a.mp3 --> public/a.html
// localhost:4000/static/a.mp3 --> public/a.js

// 为`express.static`功能所服务的文件创建虚拟路径前缀(文件系统中实际上不存在该路径)
app.use('/static', express.static('public'))
// localhost:4000/static/a.mp3 --> public/a.mp3
// localhost:4000/static/a.mp3 --> public/a.html
// localhost:4000/static/a.mp3 --> public/a.js
~~~

#### session 中间件

~~~js
const session = require('express-session')
// 添加session, 默认配置
app.use(session())
// 添加session, 更改配置
app.use(session({
	secret: 'asdasdasjop', // 盐值(默认无)
  cookie:{ maxAge:10000 }, // cookie的配置对象
  resave: true, // 是否保存到磁盘
  saveUninitialized: true // 是否保存初始化session
}))
router.get('/session', (req, res)=>{
  // 设置session
  req.session.user_name = '....'
  // 获取session
  req.session.user_name
  // 重置session有效时间(cookies设置)
  req.session.cookie.maxAge = 10000
  // 销毁session
  req.session.destroy(()=> console.log('销毁完毕'))
  res.send('session路由')
})
~~~

## 常用扩展插件的基本用途

~~~js
// md5加密, 通常用于用户注册/登录时将密码等重要代码进行加密
const md5 = require('blueimp-md5')

// 引入生成唯一key值库, 通常用于生成新文件的名称
const nanoid = require('nanoid')
nanoid() // 生成默认长度key值
nanoid(10) // 生成指定长度key值

// 用于七牛服务器生成密匙, 发送请求的库
const qiniu = require('qiniu')

// 用于爬取网页数据的库
const puppeteer = require('puppeteer');

// 用于向其他域名发送请求的库
const axios = require('axios')

// 用于生成json-token加密与解密数据, 可用于登录或其他安全性需求较高的地方
const jwt = require('jsonwebtoken');
// 生成一个token
const token = jwt.sign(
    { foo: 'bar' }, // 储存对象
    'shhhhh', // 加密字段
    { expiresIn: 180 } // 配置对象, expiresIn为过期时间(3分钟)
);
// 解密一个token, 传入token与加密字段
const decoded = jwt.verify(token, 'shhhhh', (err)=>{
    // 如果过期, err则不为空
})
~~~

####### ###

## Express 脚手架构建项目

### 基本构建流程

~~~makefile
## 安装脚手架构建工具
cnpm i express express-generator -g

express '文件名'		## 创建一个默认配置的项目文件夹
express		## 创建一个以当前文件夹的项目

## express配置方式如下
express -e		#创建一个以ejs模板解析的项目
express -e --css less		#创建一个以ejs模板解析, 样式以less解析的项目

## 构建完成后启动项目
cnpm i		#进入项目架构安装依赖项
npm start		#启动项目

## 构建代码express配置帮助
$ express -h
  Usage: express [,options] [,dir]
  Options:
    -h, --help          输出使用方法
        --version       输出版本号
    -e, --ejs           添加对 ejs 模板引擎的支持
        --hbs           添加对 handlebars 模板引擎的支持
        --pug           添加对 pug 模板引擎的支持
    -H, --hogan         添加对 hogan.js 模板引擎的支持
        --no-view       创建不带视图引擎的项目
    -v, --view <engine> 添加对视图引擎（view） (ejs|hbs|hjs|jade|pug|twig|vash) （默认是 jade 模板引擎）
    -c, --css <engine>  添加样式表引擎 <engine> 的支持 (less|stylus|compass|sass) （默认是 css 引擎）
        --git           添加 .gitignore
    -f, --force         强制在非空目录下创建
~~~

### 脚手架构建配置

~~~makefile
## bin/www的配置(默认端口设置)
var port = normalizePort(process.env.PORT || '3000');

## 配置后台应用保存自动重运行
安装：`cnpm i nodemon --save`
配置：`package.json/scripts`
"scripts": { "start": "nodemon ./bin/www" },
~~~

## Exproess 的深入理解

### 配置反向代理

~~~js
var express = require('express');
var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://192.168.0.48:9005"; // 代理目标服务地址(公司同事电脑地址)
var proxyOption ={target:proxyPath,changeOrigoin:true};
var app = express();

app.use("/",proxyMiddleWare(proxyOption))// 代理匹配路由
app.listen(8000);
module.exports = router;
~~~

### 加密字符串的原理

~~~js

~~~

### 文件上传的具体操作

#### 表单上传(自动展示接收数据)

~~~html
<form action="http://locallhost:8080/" method="post", enctype="multipart/form-data"/>
    <input type="file" value="指定文件" name="avatar">
    <input type="submit", value="上传"/>
</form>
~~~

#### axios上传(接收数据)

~~~html
<form action="http://locallhost:8080/" method="post", enctype="multipart/form-data"/>
<input class="file" type="file" value="指定文件" name="avatar">
<div class="submit"/>
</form>
<img src/>
~~~

~~~js
// 创建formDate对象
const formFile = new FormData()
$('.file').change(function(){
  // 获取file文件信息
  const file = this.files[0]
  
  // 创建本地预览图片地址
  const http_url = window.webkitURL.createObjectURL(file)
  // 将本地图片地址显示
  $('.img').attr('src', http_url)
  
  // 将文件追加到fromDtate对象中, 第一个参数对应着表单的name, 第二个传入file文件
  formFile.append("files", file)
})

const axios_upload_config = {
  // 全局请求头设置
  headers: { "Content-Type": "multipart/form-data" },
  // 添加上传进度监听事件
  onUploadProgress: e => {
    const completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
    this.progress = completeProgress;
  }
}
// 上传文件请求
$('.submit').click(async function (){
  const result = await axios.post('/upload', formFile, axios_upload_config)
})
~~~

#### multer 中间件的使用

~~~js
const express = require('express')
const multer = require('multer')
const fs = require("fs");
const path = require('path')

// 文件过滤器(可选)
function fileFilter (req, file, cb) { 
  // 这个函数应该调用 `cb` 用boolean值来指示是否应接受该文件
  // file有该文件的后缀名 或者其他信息
  // 获取文件后缀名 originalname 属性是名称
  const ext = path.extname(file.originalname)
  // 拒绝这个文件，使用`false`，像这样:
  cb(null, false)
  // 接受这个文件，使用`true`，像这样:
  cb(null, true)
  // 如果有问题，你可以总是这样发送一个错误:
  cb(new Error('I don\'t have a clue!'))
}

// 路径, 名称修改器, 默认随机名称且无后缀 (可选)
// 注意: 添加该属性后, 自动将文件存入该路径, 不会经过路由器访问
const storage = multer.diskStorage({
  // destination 是确定文件的具体路径
  destination (req, file, cb) { cb(null, path.resolve(__dirname, '../public')) }
  filename (req, file, cb) { 
  	// 获取后缀名
  	const ext = path.extname(file.originalname)
    // 设置默认名 
    cb(null, `${Date.now()}${ext}`)
	}
})

// 文件大小相关设置 (可选)
const limits = { 
  fileSize: 1024, // 文件最大长度, 默认无限	
  files: 5, // 文件最大数量
  headerPairs: 2000 // 键值对最大组数, 默认2000
}

// 初始化上传对象
const upload = multer({
  dest: '/upload', // 储存路径
  fileFilter, storage, limits
})

// 上传单个文件, 调用upload.single方法, 并将表单标签的name值传入
app.post('/upload', upload.single('avatar'), (req, res)=>{
  // 会自动添加req.file, 是 `avatar` 文件的信息
  // 如果没有添加storage, 需要自行重命名和写入文件夹最后
  const ext = path.extname(req.file.originalname);
  if(!ext.match(/jpg|png/)) return res.send({code: 1, msg: '上传失败, 文件不是jpg或png'});
  const dir_file = path.resolve(__dirname, `../public/${Date.now()}${ext}`)
  // 使用fs模块上传文件
  fs.writeFile(dir_file, req.file.buffer, {flag:'w'})
})

// 上传多个文件, 调用upload.array方法, 传入标签name值, 文件数量
app.post('/upload', upload.array('files', 6), (req, res)=>{
  // 会自动添加req.files , 是 `files` 文件数组的信息
})
~~~

