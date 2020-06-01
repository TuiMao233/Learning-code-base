// 引入express模块
const express = require('express')
// 创建app应用对象
const app = express()
// 添加中间件, 该中间件所有请求都会通过(可选)
app.use((req, res, next)=>{})
// 监听端口号, 启动服务器
app.listen(3000, ()=> console.log('服务器启动成功'))