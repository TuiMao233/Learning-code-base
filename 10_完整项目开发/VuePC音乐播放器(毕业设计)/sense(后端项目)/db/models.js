/* 包含n个操作数据库集合数据的Model模块 */
const createModel = require('./model_ence')

// 音频数据
const MusicModel = createModel({
   audio_name: { type: String, required: true },   // 音乐名称
   audio_path: String,     // 音乐文件地址
   album_img_path: String, // 专辑图片地址
   singer_name: String,    // 歌手名
   album_name: String,     // 专辑名
   create_time: { type: Date, default: Date.now }  // 歌曲创建时间
})('musics')


// 用户数据
const UserModel = createModel({
   avatar_file_path: String,
   name: { type: String, required: true }, // 昵称
   email: { type: String, required: true }, // 电子邮箱
   password: { type: String, required: true }, // 密码
   song_list: [{ // 歌单
      audio_name: { type: String, required: true },   // 音乐名称
      audio_path: String,     // 音乐文件地址
      album_img_path: String, // 专辑图片地址
      singer_name: String,    // 歌手名
      album_name: String,     // 专辑名
   }],
   create_time: { type: Date, default: Date.now }  // 用户创建时间
})('users')


// 音乐评论数据
const DiscussModel = createModel({
   song_id: String,  // 歌曲id
   content: { type: String, required: true },     // 评论内容
   user_id: { type: String, required: true },   // 用户名称
   create_time: { type: Date, default: Date.now },// 评论创建时间
   like: { type: Number, default: 0 }             // 点赞数量
})('discuss')


// 向外暴露集合操作构造函数
module.exports = {
   MusicModel, UserModel, DiscussModel
}
