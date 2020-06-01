const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
    // 设置状态码和响应头
    res.writeHead(200, {'Content-Type':'text/plain'})
    // 设置响应头
    res.setHeader('Content-Type', 'text/plain')
    // 写入内容
    res.write(fileData)
    // 结束响应
    res.end('hello word')
})
server.listen(3000, () => console.log('服务器开启成功, 端口号为:3000'))