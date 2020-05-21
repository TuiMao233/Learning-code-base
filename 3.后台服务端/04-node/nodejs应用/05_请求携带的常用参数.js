const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
    // 请求路径 (请求路径永远以 "/" 开头)
    console.log(req.url)
    // 请求头对象
    console.log(req.headers)
    // 请求类型
    console.log(req.method)

    res.end('hello world')
})
server.listen(3000, () => console.log('服务器开启成功, 端口号为:3000'))