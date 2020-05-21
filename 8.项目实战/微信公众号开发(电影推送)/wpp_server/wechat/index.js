
// 获取access_token请求参数
const { appID, appsecret } = require('../config')
// 获取access_token请求封装
const { 
    reqAccessToken, reqDelMenu, reqCreateMenu,
    reqJsapiTicket, reqUploadTempMedia, reqTempMedia,
    reqUploadMedia, reqMedia, reqdelMedia
 } = require('../api')
// 获取fs文件管理(写入与读取)

// 获取读取保存工具
const {readFileAsync, writeFileAsync} = require('../utils')

// 引入流式读取文件方法
const {createReadStream} = require('fs')


const path_resolve = require('path').resolve

// 获取菜单数据
const menu_data = require('./menu')

class Wechat {
    constructor() {

    }
    // 获取access, 并重置过期时间
    async getAccessToken() {
        // 获取返回access_token:..., expires_in:7200(过期时间)
        const result = await reqAccessToken(appID, appsecret)
        // 判断获取数据是否正确
        if (result && !result.access_token && !result.expires_in) {
            console.log('access_token获取失败')
            return Promise.resolve(false)
        }
        console.log('access_token获取成功')
        // 定义过期时间当前时间+过期时间-5*60(提前时间)
        result.expires_in = Date.now() + (result.expires_in - 5 * 60) * 1000
        // 返回accessToken
        return result
    }
    // 保存accessToken为json文件
    saveAccessToken (accessToken) {
        const ACCESS_TOKEN_JSON = JSON.stringify(accessToken)
        return writeFileAsync('./acess_token', ACCESS_TOKEN_JSON)
    }
    // 读取acess_token文件
    readAccessToken () {
        return readFileAsync('./acess_token')
    }
    // 判断是否是有效时间
    isValidAccessToken(data) {
        // 判断值是否有效
        if (data && !data.access_token && !data.expires_in) { return false }
        // 判断是否超出时间
        const timestamp = Date.now()
        console.log('时限为:'+(data.expires_in - timestamp) / (1000 * 60)+'分钟')
        return data.expires_in > timestamp
    }
    // 返回获取并计算好的AccessToken
    async fetchAccessToken() {
        let oldAccessToken = null
        // 读取accessToken本地文件
        if (this.accessToken) {
            // 如果构造对象中有
            oldAccessToken = this.accessToken
        } else {
            oldAccessToken = await this.readAccessToken()
        }

        let accessToken = {}
        if (oldAccessToken) {
            // 本地有文件
            if (this.isValidAccessToken(oldAccessToken)) {// 没有过期
                accessToken = oldAccessToken
            } else {// 过期了
                const newAccessToken = await this.getAccessToken()
                if (newAccessToken) {// 获取成功
                    const isSave = await this.saveAccessToken(newAccessToken)
                    if (isSave) { accessToken = newAccessToken }
                }
            }
        } else {// 本地没文件
            const newAccessToken = await this.getAccessToken()
            if (newAccessToken) {// 获取成功
                const isSave = this.saveAccessToken(newAccessToken)
                if (isSave) { accessToken = newAccessToken }
            }
        }
        if (accessToken.access_token) { this.accessToken = accessToken }
        return accessToken
    }



    // 获取access, 并重置过期时间
    async getJsapiTicket() {
        const access_token_result = await this.fetchAccessToken()
        const { access_token } = access_token_result
        // 获取返回jsapi_ticket
        const result = await reqJsapiTicket(access_token)
        // 判断获取数据是否正确
        if (result && !result.ticket && !result.expires_in) {
            console.log('jsapi_ticket获取失败')
            return Promise.resolve(false)
        }
        console.log('jsapi_ticket获取成功')
        // 定义过期时间当前时间+过期时间-5*60(提前时间)
        result.expires_in = Date.now() + (result.expires_in - 5 * 60) * 1000
        // 返回JsapiTicket
        return result
    }
    // 保存JsapiTicket为json文件
    saveJsapiTicket (JsapiTicket) {
        const JSAPI_TICKET_JSON = JSON.stringify(JsapiTicket)
        return writeFileAsync('./jsapi_ticket', JSAPI_TICKET_JSON)
    }
    // 读取jsapi_ticket文件
    readJsapiTicket () {
        return readFileAsync('./jsapi_ticket')
    }
    // 判断是否是有效时间
    isValidJsapiTicket(data) {
        // 判断值是否有效
        if (data && !data.ticket && !data.expires_in) { return false }
        // 判断是否超出时间
        const timestamp = Date.now()
        console.log('时限为:'+(data.expires_in - timestamp) / (1000 * 60)+'分钟')
        return data.expires_in > timestamp
    }
    // 返回获取并计算好的JsapiTicket
    async fetchJsapiTicket() {
        let oldJsapiTicket = null
        // 读取JsapiTicket本地文件
        if (this.JsapiTicket) {
            // 如果构造对象中有
            oldJsapiTicket = this.JsapiTicket
        } else {
            oldJsapiTicket = await this.readJsapiTicket()
        }

        let JsapiTicket = {}
        if (oldJsapiTicket) {
            // 本地有文件
            if (this.isValidJsapiTicket(oldJsapiTicket)) {// 没有过期
                JsapiTicket = oldJsapiTicket
            } else {// 过期了
                const newJsapiTicket = await this.getJsapiTicket()
                if (newJsapiTicket) {// 获取成功
                    const isSave = await this.saveJsapiTicket(newJsapiTicket)
                    if (isSave) { JsapiTicket = newJsapiTicket }
                }
            }
        } else {// 本地没文件
            const newJsapiTicket = await this.getJsapiTicket()
            if (newJsapiTicket) {// 获取成功
                const isSave = this.saveJsapiTicket(newJsapiTicket)
                if (isSave) { JsapiTicket = newJsapiTicket }
            }
        }
        if (JsapiTicket.access_token) { this.JsapiTicket = JsapiTicket }
        return JsapiTicket
    }

    // 删除微信自定义菜单
    async delMenu() {
        try {
            const access_token_result = await this.fetchAccessToken()
            const { access_token } = access_token_result
            const del_result = await reqDelMenu(access_token)
            return del_result
        } catch (error) {
            return Promise.reject('delMenu出了问题', error)
        }
    }
    // 创建微信菜单
    async createMenu(menu) {
        try {
            const access_token_result = await this.fetchAccessToken()
            const { access_token } = access_token_result
            const create_result = await reqCreateMenu(access_token, menu_data)
            return create_result
        } catch (error) {
            return Promise.reject('createMenu出了问题', error)
        }
    }


    // 上传临时素材
    async uploadTempMedia (fileName) {
        try {
            // 获取凭证
            const { access_token }  = await this.fetchAccessToken()
            // 准备数据
            const from_data = createReadStream(path_resolve(__dirname, `../media/${fileName}`))
            // 上传至微信服务器
            const result = await reqUploadTempMedia(access_token, from_data)
            return result
        } catch (error) {
            return {msg:'uploadTempMedia出了问题', error}
        }
    }

    // 获取临时素材
    async getTempMedia (media_id) {
        try {
            // 获取凭证
            const { access_token }  = await this.fetchAccessToken()
            // 获取数据
            const result = await reqTempMedia(access_token, media_id)
            return result
        } catch (error) {
            return {msg:'getTempMedia出了问题', error}
        }
    }

    // 上传永久素材
    async uploadMedia (media_options){
        try {
            // 获取凭证
            const { access_token }  = await this.fetchAccessToken()
            // 上传数据
            const result = await reqMedia(access_token, media_options)
            return result
        } catch (error) {
            return {msg:'uploadMedia出了问题', error}
        }
    }
    // 获取永久素材
    async getMedia (media_id){
        try {
            // 获取凭证
            const { access_token }  = await this.fetchAccessToken()
            // 获取数据
            const result = await reqMedia(access_token, media_id)
            return result
        } catch (error) {
            return {msg:'uploadTempMedia出了问题', error}
        }
    }
    // 删除永久素材
    async delMedia (media_id){
        try {
            // 获取凭证
            const { access_token }  = await this.fetchAccessToken()
            // 删除素材
            const result = await reqdelMedia(access_token, media_id)
            return result
        } catch (error) {
            return {msg:'uploadTempMedia出了问题', error}
        }
    }
    
    
}


// 模拟测试
const w = new Wechat();


// 获取jsapi_ticket
/* (async ()=> {
    const result =await w.fetchJsapiTicket()
    console.log(result)
})() */


// 修改菜单
/* ;(async ()=>{
    let result = await w.delMenu()
    console.log(result)
    result = await w.createMenu()
    console.log(result)
})() */

module.exports = w