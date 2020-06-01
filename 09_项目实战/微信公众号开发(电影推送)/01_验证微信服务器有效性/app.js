// 引入express模块
const express = require('express')
// 引入sha1加密模块
const sha1 = require('sha1')
// 创建app应用对象
const app = express()

/* 验证服务器有效性(接收处理所有参数) */
// 配置官网提供的参数
const token = 'mrMaoHTML15106'
const appID = 'wxa2a6b98bb1a339d6'
const appsecret = 'd0896af5e43a366558cb05e68f6ce7c8'
// 添加默认根路径中间件请求路由
app.use((req, res, next)=>{
    // 获取请求参数：加密签名、随机字符串、请求时间戳、随机数字
    const {signature, echostr, timestamp, nonce} = req.query
    // 进行字典排序, 并进行拼串
    const str = [timestamp, nonce, token].sort().join('')
    // 进行sha1加密
    const sha1Str = sha1(str)
    // 加密字符串进行微信服务器比较。比较成功返回随机字符串，比较失败返回error。
    if(sha1Str === signature) {
        res.send(echostr)
    }else { res.send('error') }
})
// 监听端口号
app.listen(3000, ()=> console.log('服务器启动成功'))
