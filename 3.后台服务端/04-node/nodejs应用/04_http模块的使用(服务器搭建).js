// 引入本地服务器API
const http = require('http')
// 创建服务器实例
const server = http.createServer()
// 绑定接收请求事件
server.on('request', (req, res)=>{
  console.log(req.url)
  if(req.url == '/'){
    res.end('hello world')
  }else { res.end('404') }
  
})

// 绑定监听端口号, 开启服务器
server.listen(3000, ()=> console.log('服务器开启成功, 端口号为:3000'))