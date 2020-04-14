/* 微信身份验证中间件 */

// 引入sha1加密模块
const sha1 = require('sha1')
// 引入token数据模块
const {token} = require('./config')
module.exports = ()=> (req, res, next)=>{
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
}