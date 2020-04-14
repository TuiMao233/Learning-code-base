// 创建router实例
const router = new require('express').Router()

// 引入sha1加密
const sha1 = require('sha1')
// 引入reply中间件函数
const reply = require('../reply')
// 引入创建wechat_api实例对象
const wechat = require('../wechat')
// 引入热门电影集合, 预告片集合
const { MoviesModel, TrailerModel, DanmakuModel } = require('../db')
// 异步获取请求体数据
const { getBodyAsync } = require('../utils')

// 访问后台链接
const { url } = require('../config')

// 电影搜索页面, 将渲染好的页面返回给用户
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
    console.log('js-skd签名:' + signature)
    // 渲染页面, 传入签名, 随机字符串, 当前时间戳
    res.render('search', { signature, noncestr, timestamp })
})

// 电影详情页面
router.get('/detail/:doban_id', async (req, res) => {
    const { doban_id } = req.params
    // 如果值为空, 返回错误
    if (!doban_id) { return res.send('error'); }

    // 获取详情页数据
    const findResult = await MoviesModel.findOne({ doban_id }, { _id: 0, __v: 0, createTime: 0 })
    console.log('---------访问电影详情页, 返回数据---------')
    if (!findResult) { return res.send('error'); }
    // 渲染页面
    res.render('detail', findResult)
})

// 电影预告片页面
router.get('/trailer', async (req, res) => {
    const findResult = await TrailerModel.find({}, { _id: 0, __v: 0 })
    res.render('trailer', { findResult, url })
})

// 接收弹幕请求
router.get('/v3', async (req, res) => {
    const { id } = req.query
    // 验证数据完整性
    if (!id) { res.send({ code: 1 }) }
    // 查询弹幕池
    const findResult = await DanmakuModel.find({ id }, { __v: 0, _id: 0 })

    // 验证查询完整性
    if (findResult) { }
    const data = findResult.map(item => [
        // [弹幕发送时间, 弹幕的类型, 弹幕的颜色, 弹幕的发送者, 弹幕的内容]
        item.time, item.type, item.color, "testuser", item.text
    ])

    // 返回数据
    res.send({ code: 0, data })
    console.log('弹幕池查询成功, 返回该弹幕池数据')
})
// 接收发送弹幕请求
router.post('/v3', async (req, res) => {
    
    // 接收用户弹幕
    const body_json_str = await getBodyAsync(req)
    const body = JSON.parse(body_json_str)
    console.log(body)
    // 验证完整性
    if (body) { }
    // 保存到数据库中
    const createResult = await DanmakuModel.create(body)
    // 验证保存成功数据
    if (createResult) { }
    // 返回数据
    res.send({ code: 0, data: {} })
    console.log('弹幕保存数据库:',body_json_str)
})
// 添加所有请求都会携带,并经过的路由
router.use(reply())


// 暴露router
module.exports = router