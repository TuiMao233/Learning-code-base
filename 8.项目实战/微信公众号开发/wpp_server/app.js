// 引入express并创建app应用对象
const app = require('express')()
// 引入路由
const router = require('./router')

// 配置模板资源目录的绝对路径
app.set('views', `${__dirname}/views`)
// 配置模板引擎
app.set('view engine', 'ejs')

app.use(router)
// 开启监听端口号
app.listen(3000, () => console.log('start_server:http://localhost:3000/'))

