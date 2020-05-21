// 创建router实例
const router = new require('express').Router()


// 引入sha1加密
const sha1 = require('sha1')
// 引入reply中间件函数
const reply = require('../reply')
// 引入创建wechat_api实例对象
const wechat = require('../wechat')
// 访问后台链接
const { url } = require('../config')

// 渲染路由页面, 将渲染好的页面返回给用户
router.get('/search', async (req, res) => {
    /* 
        生成js-sdk使用的签名：
        1. 组合参与签名的四个参数: jsapi_ticket(临时票据)、noncestr(随机字符串)、timestamp(时间戳)、url(当前服务器地址)
        2. 将其进行字典序排序, 以'&'拼接在一起
        3. 进行sha1加密, 最终生成js-skd签名
    */
    const { ticket } = await wechat.fetchJsapiTicket()
    const noncestr = Math.round(Math.random() * 100000000000000000)
    const timestamp = Date.now()

    // 组成数组:key=val 在以&拼接成字符串
    const str = [
        `jsapi_ticket=${ticket}`,
        `noncestr=${noncestr}`,
        `timestamp=${timestamp}`,
        `url=${url}/search`
    ].sort().join('&')
    // 进行sha1加密, 生成js-skd签名
    const signature = sha1(str)
    console.log('js-skd签名:'+signature)
    // 渲染页面, 传入签名, 随机字符串, 当前时间戳
    res.render('search', { signature, noncestr, timestamp })
})


// 添加所有请求都会携带,并经过的路由
router.use(reply())


// 暴露router
module.exports = router