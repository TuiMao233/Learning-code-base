import { get, post } from "./ajax";
// [1.根据经纬度获取位置详情]()
export const reqAddress = (geohash) => get(`/position/${geohash}`)
// [2.获取食品分类列表]()
export const reqFootTypes = () => get(`/index_category`)
// [3.根据经纬度获取商铺列表]()
export const reqShops = (longitude, latitude) => get(`/shops`, { longitude, latitude })
// [4.根据经纬度和关键字搜索商铺列表]()
export const reqSearchShops = (geohash, keyword) => get(`/search_shops`, { geohash, keyword })
// [5.获取一次性验证码]()
export const reqCaptcha = () => get(`/captcha`)
// [6.用户名密码登陆]()
export const reqLoginPwd = (name, pwd, captcha) => post(`/login_pwd`, { name, pwd, captcha })
// [7.发送短信验证码]()
export const reqSendCode = (phone) => get(`/sendcode`, { phone })
// [8.手机号验证码登陆]()
export const reqLoginSms = (phone, code) => post(`/login_sms`, { phone, code })
// [9.根据会话获取用户信息]()
export const reqUserInfo = () => get(`/userinfo`)
// [10.用户登出]()
export const reqLoginOut = () => get(`/logout`)
// [11.获取店铺信息]()
export const reqShopMsg = () => get(`/shop_msg`)
// [12.获取店铺商品列表]()
export const reqShopGoods = () => get(`/shop_goods`)
// [13.获取店铺评论列表]()
export const reqShopAssess = () => get(`/shop_assess`)