/* 包含n个操作数据库集合数据的Model模块 */
// 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/sense_musice', { useMongoClient: true })
mongoose.connection.once("open", () => console.log('数据库连接成功'))
mongoose.connection.once("close", () => console.log('数据库连接断开'))
const createModel = require('./model_ence')(mongoose, mongoose.Schema)

/* 音频数据 */
const MusicModel = createModel({
   audio_name: { type: String, required: true },   // 音乐名称
   audio_path: { type: String, required: true },   // 音乐文件地址
   singer_name: String,                            // 歌手名
   lyric_path: String,                             // 歌词文件地址
   album_name: String,     // 专辑名
   album_img_path: String, // 专辑图片地址
})('musics')
/* 用户数据 */
const userModel = createModel({
   username: { type: String, required: true }, // 账号
   password: { type: String, required: true }, // 密码
   song_list: [{ // 歌单
      name: { type: String, required: true }, // 歌单名
      music_id: Array                         // 歌单歌曲id
   }]
})('users')
// 音乐评论数据
const DiscussModel = createModel({
   music_id: String,  // 歌曲id
   discuss_id: String,// 回复评论对应评论数据id
   content: { type: String, required: true },   // 评论内容
   user_name: { type: String, required: true }, // 用户名称
   time: { type: String, required: true },      // 评论时间
   like: { type: Number, default: 0 }             // 点赞数量
})('discuss')


// 向外暴露集合操作构造函数
module.exports = {
   MusicModel, userModel, DiscussModel, DiscussCommunicateModel
}
