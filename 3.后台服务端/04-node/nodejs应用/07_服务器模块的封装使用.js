// 引入自定义服务器模块
const Server = require('./server')
// 创建一个服务器应用
const app = new Server()

// 静态资源添加
app.static('/public')

// 添加路由
app.on('/', (req, res)=>{
    res.end('path: /')
})
app.on('/search', (req, res)=>{
    res.end('path: /search')
})

// 开启服务
app.listen(3000, ()=>console.log('服务器启动成功'))