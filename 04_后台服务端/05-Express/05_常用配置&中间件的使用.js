const express = require('express')
const app = express()


// 配置模板资源目录的绝对路径 与 模板引擎为ejs
// 通常配合res.render使用, 返回渲染页面
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')

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


// 创建一个路由器, 该路由器有use/get/post...等方法
// router通常用来构建模块化, 需要最后app.use(router)引入
const router = express.Router()


app.use(router)
app.listen(3000, () => console.log('服务器启动成功'))