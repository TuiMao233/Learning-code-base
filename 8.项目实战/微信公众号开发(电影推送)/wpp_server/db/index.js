const mongoose = require('./conn_mongo')
const createModel = require('./createModel')(mongoose)
// 热门电影集合
const MoviesModel = createModel({
    doban_id:{type:Number, unique:true}, // 豆瓣ID
    title: String, // 标题
    score: String, // 评分
    genre: String, // 类型
    director: String, // 导演
    screenwriter: String, // 编剧
    starring: String, // 主演
    summary: String, // 电影简介
    poster_url: String, // 海报图
    poster_key: String, // 海报图上传到七牛返回的key值
    createTime: { type: Date, default: Date.now() } // 创建时间
})('movies')
// 预告片集合
const TrailerModel = createModel({
    doban_id:{type:Number, unique:true}, // 豆瓣ID
    title: String,    // 标题
    release_area: String,   // 上映地区
    like: Number, // 想看人数
    genre: String, // 类型
    director: String, // 导演
    screenwriter: String, // 编剧
    starring: String,  // 主演
    summary: String,    // 简介
    video_cover_url: String, // 视频封面图
    video_url: String, // 视频链接
    poster_url: String, // 海报图
    poster_key: String, // 海报图上传到七牛返回的key值
    video_key: String, // 视频上传到七牛返回的key值
    video_cover_key: String, // 视频封面图上传到七牛返回的key值
    createTime: { type: Date, default: Date.now() }
})('trailers')

// {"id":"demo","time":2.605316,"text":"asdasdas","color":16777215,"type":0}
// 弹幕池集合
const DanmakuModel = createModel({
    id: String, // 弹幕池id, 并且具有唯一性
    time: Number,   // 弹幕时间
    text: String,   // 内容
    color: Number,  // 颜色
    type: Number    // 弹幕类型
})('danmakus')
module.exports = {
    mongoose, TrailerModel, MoviesModel, DanmakuModel
}