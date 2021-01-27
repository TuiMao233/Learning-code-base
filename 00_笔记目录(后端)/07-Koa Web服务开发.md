---
title: Koa Web服务开发
date: 2020-11-01
categories:
  - 后端学习笔记
tags: 
  - koa
---
## Koa 简述

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

####### ###

## Koa 的基本使用

### 服务器的基本实现

~~~js
// 引入Koa模块
const Koa = require('koa');
// 创建app应用对象
const app = new Koa();
// 添加中间件, 该中间件所有请求都会通过
app.use(async (ctx, next)=>{})
// 监听端口号, 启动服务器
app.listen(3000, ()=> console.log('服务器启动成功'))
~~~

### 后台路由的基本特性

**安装：**`npm i koa-router --save`

~~~js
const Koa = require('koa');
const app = new Koa();
// 由于Koa本身并没有内置路由, 需要引入路由器
const router = require('koa-router')()

// 创建一个get请求, 路径是/search
router.get('/search',async ctx => {
    //处理并返回数据.....
    ctx.body = { code: 1, msg: "请求成功" }
})
// 创建一个post请求, 路径是/search
router.post('login',async ctx => {
    //处理并返回数据.....
    ctx.body = { code: 1, msg: "请求成功" }
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('服务器启动成功'))
~~~

### Koa 中间件的运行流程

~~~js
app.use(async (ctx, next) => {
  console.log(1)
  next(); // next不写会报错
  console.log(5)
});
app.use(async (ctx, next) => {
  console.log(2)
  next();
  console.log(4)
});

app.use(async (ctx, next) => {
  console.log(3)
  ctx.body = 'Hello World';
});

app.listen(3000, () => console.log('服务器启动成功'))
// 打印出1、2、3、4、5
~~~

### ctx (请求) 携带的常用参数

~~~js
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')()
router.get('/search',async ctx => {
    // 查询字符串组成的对象 通常在get请求中使用
    console.log(ctx.query) // => {...}

    // 请求体中携带的对象 通常在post请求中使用
    console.log(ctx.request.body) // => {...}

    // 请求中的占位符 如/search:id中, id是占位符, 则可以获取params.id的值
    console.log(ctx.params) // => {...}
    // 当使用正则表达式来定义路由占位符规则时, req.params通常是一个数组
    console.log(ctx.params[0])

    // 请求中携带的cookies, 如果没有则为{}
    console.log(ctx.cookies.get) // => {...}
		
  	ctx.body = { code: 1, msg: "请求成功" }
})
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('服务器启动成功'))
~~~

### ctx (响应) 携带的常用参数

~~~js
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')()

router.get('/search',async ctx => {

    // 将cookie设置name为value, 后面还可以跟一个配置对象
    ctx.cookies.set('name', 'value', {
        signed: true, // 是否使用加密签名(默认false)
        domain: '.example.com', // Cookie的域名(默认为应用程序的域名)
        path: '/admin', // Cookie的路径(默认为/)
        maxAge: new Date(Date.now() + 900000), // cookies的过期时间(未指定或设置为0, 则创建会话cookie)
        secure: true,  // 将cookie标记为仅与HTTPS一起使用(默认为false)
        httpOnly: true, // 将Cookie标记为只能由Web服务器访问(默认为true) 
    })
    // 清除由指定的Cookie name
    ctx.cookies.set('name', '', {signed:false,maxAge:0})

    // 返回一个响应数据, 该格式可以是字符串, Buffer对象, 流数据, 对象(转换为JOSN字符串), null(无内容响应)
	  ctx.body = {code:1, msg: '数据'}
    
    // 根路径重定向
    ctx.redirect('/admin')
    // 相对当前路径URL 如当前路径是/admin/home那么重定向后就是/admin/home/post/new
    ctx.redirect('post/new')
    // 重定向其他站点URL
    ctx.redirect('http://example.com')
    // 重定向路径后退, 如当前路径是/admin/home那么重定向后就是/admin
    ctx.redirect('..')
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('服务器启动成功'))
~~~

## 常用配置&中间件的使用

### session 会话(服务器储存)

**安装：**`npm i koa-session --save`

~~~js
const Koa = require('koa');
const app = new Koa();
// 使用session会话储存信息的中间件
const Koa_Session = require('koa-session');

// 这个是配合signed属性的加密签名key
app.keys = ['im a newer secret']
const CONFIG = {
  key: 'koa.sess', // cookie的key(默认是 koa:sess)
  maxAge: 86400000, // 过期时间, 以毫秒ms为单位计算(默认为一天)
  autoCommit: true, // 自动提交到响应头(默认true)
  overwrite: true, // 是否允许重写(默认true)
  httpOnly: true, // 是否设置HttpOnly, 设置了"HttpOnly"属性能有效的防止XSS攻击 (默认true)
  signed: true, // 是否使用加密签名(默认true)
  rolling: false, // 是否每次响应时刷新Session的有效期(默认false)
  renew: false, // 是否在Session快过期时刷新Session的有效期(默认false)
}

// 添加该session中间件
app.use(Koa_Session(session_config, app))

// 请求中使用
app.use(async ctx => {
  // 设置session回话对象中的值
  ctx.session.username = "张山"
  // 获取session对象中的值
  const session = ctx.session.username;
});
app.listen(3000, () => console.log('服务器启动成功'))
~~~

### 静态资源路由(koa-static)

**安装：**`npm i koa-static --save`

~~~js
const static = require('koa-static');
const Koa = require('koa');
const app = new Koa();
// 指定根路径 为 public目录为静态资源目录
app.use(static('public'))
// localhost:4000/a.mp3 --> public/a.mp3

app.listen(3000, () => console.log('服务器启动成功'))
~~~

### 程序指定对应路径(koa-mount)

安装：`npm koa-mount --save`

~~~js
import koaStatic from 'koa-static'
import mount from 'koa-mount'
import Koa from 'koa'
const app = new Koa()
app.use(mount('/public', koaStatic(__dirname + '/public')))
// localhost:4000/public/a.mp3 --> public/a.mp3

app.listen(3000, () => console.log('服务器启动成功'))
~~~

### 解析并渲染ejs模板

**安装：**`npm koa-views ejs --save`

~~~js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板目录(绝对路径), 引擎为ejs
app.use(views(path.join(__dirname, './views'), {extension: 'ejs'}))
app.use( async ( ctx ) => {
    // 渲染/views/index.ejs, 并传入数据供模板使用
    await ctx.render('index', { title:'nmd' })
})

app.listen(3000, () => console.log('服务器启动成功'))
~~~

## 常用扩展插件的基本用途

~~~js
// md5加密, 通常用于用户注册/登录时将密码等重要代码进行加密
const md5 = require('blueimp-md5')

// 引入生成唯一key值库, 通常用于生成新文件的名称
const {nanoid} = require('nanoid')
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

## Koa2 脚手架构建项目

### 基本构建流程

~~~makefile
## 安装脚手架构建工具
cnpm install -g koa2-generator

koa2 '文件名'		## 创建一个默认配置的项目文件夹
koa2		## 创建一个以当前文件夹的项目

## koa2配置方式如下
express -e		#创建一个以ejs模板解析的项目
express -e --css less		#创建一个以ejs模板解析, 样式以less解析的项目

## 构建完成后启动项目
cnpm i		#进入项目架构安装依赖项
npm start		#启动项目

## 构建代码koa2配置帮助
$ koa2 -h
  Usage: koa2 [,options] [,dir]
Options:
	-h, --help          输出使用方法
  -V, --version       输出版本号
  -e, --ejs           添加对 ejs 模板引擎的支持
      --hbs           添加对 handlebars 模板引擎的支持
      --pug           添加对 pug 模板引擎的支持(默认)
  -n, --nunjucks      添加对 nunjucks 模板引擎的支持
  -H, --hogan         添加对 hogan.js 模板引擎的支持
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

## Koa 的深入理解

### 配置反向代理

~~~js

~~~

### 文件上传的具体操作

#### 表单上传(自动展示接收数据)

~~~html
<from action="http://locallhost:8080/" moethod="post", enctype="multipart/form-data"/>
<input type="file" value="指定文件" name="avatar">
<input type="submit", value="上传"/>
</from>
~~~

#### axios上传(接收数据)

~~~html
<from action="http://locallhost:8080/" moethod="post", enctype="multipart/form-data"/>
<input class="file" type="file" value="指定文件" name="avatar">
<div class="submit"/>
</from>
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
const multer = require('@koa/multer')
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
const storage = multer.diskStorage({
  // destination 是确定文件的具体路径
  destination (req, file, cb) { cb(null, '/tmp/my-uploads') }
  filename (req, file, cb) { 
  	// 获取后缀名
  	const ext = path.extname(file.originalname)
    // 设置默认名 
    cb(null, `${Date.now()}${ext}`)
	}
})

// 文件大小相关设置 (可选)
const limits = { 
  fileSize: 5 * 1024, // 文件最大长度, 默认无限	
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
})

// 上传多个文件, 调用upload.array方法, 传入标签name值, 文件数量
app.post('/upload', upload.array('files', 6), (req, res)=>{
  // 会自动添加req.files , 是 `files` 文件数组的信息
})
~~~
