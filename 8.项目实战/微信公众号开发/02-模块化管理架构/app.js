// 引入express并创建app应用对象
const app = require('express')()

// 引入auth中间件函数
const auth = require('./wechat/auth')

// 添加默认根路径请求路由
app.use(auth())

// 开启监听端口号
app.listen(3000, ()=> console.log('服务器启动成功'))
