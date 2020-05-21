const express = require('express')
const app = express()

// 创建一个get请求, 路径是/search
app.get('/search', (req, res) => {
    //处理并返回数据.....
    res.send({ code: 1, msg: "请求成功" })
})
// 创建一个post请求, 路径是/search
app.post('login', (req, res) => {
    //处理并返回数据.....
    res.send({ code: 1, msg: "请求成功" })
})

app.listen(3000, () => console.log('服务器启动成功'))