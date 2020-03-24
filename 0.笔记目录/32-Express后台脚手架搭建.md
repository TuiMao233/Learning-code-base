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
