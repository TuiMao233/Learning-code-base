/* 微信自动回复 */

// 引入sha1加密模块
const sha1 = require('sha1')
// 引入token数据模块
const { token } = require('../config')

// 引入工具模块
const {getUserDataAsync, parseXMLAsync, formatJsMsg} = require('../utils')
// 引入处理发送数据模块
const parseSend = require('./parse_send')

const xmlTemplate = require('./xml_template')

module.exports = () => async (req, res, next) => {
    // 获取请求参数：加密签名、随机字符串、请求时间戳、随机数字
    const { signature, echostr, timestamp, nonce } = req.query
    // 进行字典排序, 并进行拼串、在进行sha1加密
    const sha1Str = sha1([timestamp, nonce, token].sort().join(''))
    console.log(`服务器验证:计算加密值:${sha1Str};对方加密签名:${signature}`)

    // 微信服务器会发送两种类型消息给开发者服务器
    if (req.method === 'GET') {
        // GET:验证服务器有效性
        if (sha1Str === signature) {
            res.send(echostr)
        } else { res.send('error') }
    } else if (req.method === 'POST') {
        // POST:将用户发送的数据以POST请求转发到开发者服务器上
        //  - 如果开发者服务器没有返回响应，微信服务器会发送多三次响应
        //  - 接收请求  体中的数据，是流体数据，不能直接拿到数据
        if (sha1Str === signature) {
            // 返回的数据除了signature,timestamp,nonce 还会多出一个openid 这是用户的微信ID

            // 流体接收数据
            const xmlMessageData = await getUserDataAsync(req)
            // 将数据转换为js对象
            const jsMessageData = await parseXMLAsync(xmlMessageData)
            // 代码进行格式化
            const formatJsMessageData = formatJsMsg(jsMessageData)
            // 判断该消息是否存在:不存在返回错误
            if (!formatJsMessageData.MsgId) { res.send('error');return }


            // 获取处理后需要发送的数据
            const sendOptions = parseSend(formatJsMessageData)
            // 将数据转换为xml模板
            const sendXml = xmlTemplate(sendOptions)

            // 返回响应
            res.send(sendXml)

        } else { res.send('error') }
    } else { res.send('error') }
}
