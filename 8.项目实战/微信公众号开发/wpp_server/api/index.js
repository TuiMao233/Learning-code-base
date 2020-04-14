
// 引入对数据对象进行拼接为字符串的模块
const { stringify } = require('querystring');
const { get, post } = require('./ajax')
const prefix = 'https://api.weixin.qq.com/cgi-bin'

{/* 请求获取access_token唯一接口调用凭据
请求地址(get):https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
请求携带参数: 
    grant_type:'client_credential'
    appid: 第三方用户唯一凭证
    secret: 第三方用户唯一凭证密钥 
*/}
exports.reqAccessToken = (appid, secret) => get(`${prefix}/token`, { grant_type: 'client_credential', appid, secret })
{/* 请求删除自定义菜单 
请求地址(get):https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN
请求携带参数:
    access_token: 唯一接口调用凭据
*/}
exports.reqDelMenu = (access_token) => get(`${prefix}/menu/delete`, { access_token })
{/* 请求删除自定义菜单 
请求地址(post):https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
请求携带参数: 
    access_token: 唯一接口调用凭据
请求体携带参数:
    menu: 菜单数据
*/}
exports.reqCreateMenu = (access_token, menu) => post(`${prefix}/menu/create`, { ...menu }, { access_token })
{/* 请求JS-SDK签名 
请求地址(get):https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
请求携带参数: 
    access_token: 唯一接口调用凭据
    type: jsapi
*/}
exports.reqJsapiTicket = (access_token) => get(`${prefix}/ticket/getticket`, { access_token, type: "jsapi" })
{/* 请求上传临时素材
请求地址(post/from):https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE
请求参数: 
    access_token: 唯一接口调用凭据
    type: 媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
    media: form-data中媒体文件标识，有filename、filelength、content-type等信息
返回结果: {"type":"TYPE","media_id":"MEDIA_ID","created_at":123456789}
*/}
exports.reqUploadTempMedia = (access_token, from_data) => post(`${prefix}/media/upload`, stringify(from_data), { access_token })
{/*  请求获取临时素材
请求地址(get):https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID
请求携带参数: 
    access_token: 唯一接口调用凭据
    media_id: MEDIA_ID
返回参数:...
*/}

exports.reqTempMedia = (access_token, media_id) => get(`${prefix}/media/upload`, { access_token, media_id })
{/* 请求上传永久图文素材
请求地址(post): https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=ACCESS_TOKEN
请求参数: ->articles->数组->单个/多个图文素材
{"articles": [
    {
        author: 作者
        digest: 图文消息的摘要
        need_open_comment: Uint32 是否打开评论，0不打开，1打开
        nly_fans_can_comment: Uint32 是否粉丝才可评论，0所有人可评论，1粉丝才可评论
        title: 标题(必须)
        thumb_media_id: 图文消息的封面图片素材id(必须)
        show_cover_pic: 是否显示封面，0为false，即不显示，1为true，即显示(必须)
        content: 图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M(必须)
        content_source_url: 图文消息的原文地址，即点击“阅读原文”后的URL(必须)
    },
    //.........
]}
返回: { "media_id":MEDIA_ID }
 */}
exports.reqUploadMedia = (access_token, req_body) => post(`${prefix}/material/add_news`, req_body, {access_token})
{/* 请求获取永久图文素材
请求地址(post): https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=ACCESS_TOKEN
请求携带参数: "media_id":MEDIA_ID
返回结果:
{"news_item":[
     {
     "title":TITLE,
     "thumb_media_id"::THUMB_MEDIA_ID,
     "show_cover_pic":SHOW_COVER_PIC(0/1),
     "author":AUTHOR,
     "digest":DIGEST,
     "content":CONTENT,
     "url":URL,
     "content_source_url":CONTENT_SOURCE_URL
     },
     //多图文消息有多篇文章
]}
*/}
exports.reqMedia = (access_token, media_id) => post(`${media_id}/material/get_material`, {media_id}, {access_token})
{/* 请求删除永久图文素材
请求地址(post): https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=ACCESS_TOKEN
请求携带参数: "media_id":MEDIA_ID
返回说明: {"errcode": 0, "errmsg": "ok"}
*/}
exports.reqdelMedia = (access_token, media_id) => post(`${media_id}/material/del_material`, {media_id}, {access_token})