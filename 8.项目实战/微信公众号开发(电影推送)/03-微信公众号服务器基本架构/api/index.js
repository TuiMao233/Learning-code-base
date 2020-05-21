const { get, post } = require('./ajax')
const prefix = 'https://api.weixin.qq.com/cgi-bin'
{/* 请求获取access_token唯一接口调用凭据
请求地址(get):https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
请求携带参数: 
    grant_type:'client_credential'
    appid: 第三方用户唯一凭证
    secret: 第三方用户唯一凭证密钥 
*/}
exports.reqAccessToken = (appid, secret) => get(`${prefix}/token`, { grant_type:'client_credential', appid, secret })
{/* 请求删除自定义菜单 
请求地址(get):https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN
请求携带参数:
    access_token: 唯一接口调用凭据
*/}
exports.reqDelMenu = (access_token) => get(`${prefix}/menu/delete`, {access_token})
{/* 请求删除自定义菜单 
请求地址(post):https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
请求携带参数: 
    access_token: 唯一接口调用凭据
请求体携带参数:
    menu: 菜单数据
*/}
exports.reqCreateMenu = (access_token, menu)=> post(`${prefix}/menu/create`, {...menu}, {access_token})
{/* 请求JS-SDK签名 
请求地址(get):https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
请求携带参数: 
    access_token: 唯一接口调用凭据
    type: jsapi
*/}
exports.reqJsapiTicket = (access_token) => get(`${prefix}/ticket/getticket`, {access_token, type:"jsapi"})

