const express = require('express')
const app = express()

app.get('/search', (req, res) => {
    // 查询字符串组成的对象 通常在get请求中使用
    console.log(req.query) // => {...}

    // 请求体中携带的对象 通常在post请求中使用
    console.log(req.body) // => {...}

    // 请求中的占位符 如/search:id中, id是占位符, 则可以获取params.id的值
    console.log(req.params) // => {...}
    // 当使用正则表达式来定义路由占位符规则时, req.params通常是一个数组
    console.log(req.params[0])

    // 使用cookie-parser中间件后, 则是请求中携带的cookies, 如果没有则为{}
    console.log(req.cookies) // => {...}
    // 请求中发送过来的签名cookies 如不是签名的cookies, 则是空对象
    console.log(req.signedCookies) // => {...}

    // 接收流体数据使用req.on方法(可promise封装)
    let data = ''
    req.on('data', (buffer_data) => data+=buffer_data.toString() )
    // 接收完毕, 此时数据是完整的
    .on('end', ()=> console.log(data) )

    // 请求的路径(不包含查询字符串)
    console.log(req.path) // => /search
    // 请求的协议, 一般为http, 当启用TLS加密, 则为https。
    console.log(req.protocol) // => http
    // 远程请求的ip地址
    console.log(req.ip) // => 127.0.0.1
    // 返回指定的HTTP请求标头字段 别名:req.header(field)
    req.get('Content-Type') // => text/plain
    req.get('content-type') // => content-type
    req.get('Something') // => undefined

    res.send({ code: 1, msg: "请求成功" })
})

app.listen(3000, () => console.log('服务器启动成功'))