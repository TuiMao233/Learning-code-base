var express = require('express');
var router = express.Router();
const { // 引入集合库
  MusicModel, userModel,
  DiscussModel, DiscussCommunicateModel
} = require('../db/models')

const multer = require('multer')
const fs = require('fs')
const BASE_URL = 'http://localhost:3000/'

const uploadMusic = multer({// 歌曲上传对象
  storage: multer.diskStorage({ // 文件设置
    destination: (req, file, cb) => { cb(null, '/public') },// 设置路径
    filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname) }// 设置文件名
  }),
  fileFilter(req, file, cb) {// 过滤器
    // 文件类型判断
    const ext = file.originalname.split('.')[1]
    if (checkFileExt(ext.includes('mp3'))) {
      cb(null, true)
    } else {
      cb(null, false)
      cb(new Error('文件类型错误'))
    }
  }
}).single('file');


//! 添加歌曲(未完成)
router.post('/receive_music', (req, res) => {
  upload(req, res, (err) => {if(!err){
    MusicModel.create({ 
      audio_name: { type: String, required: true },   // 音乐名称
      audio_path: { type: String, required: true },   // 音乐文件地址
      singer_name: String,                            // 歌手名
      lyric_path: String,                             // 歌词文件地址
      album_name: String,     // 专辑名
      album_img_path: String, // 专辑图片地址
    })
  }})
})
/* 获取歌曲 */

/* 用户注册 */
/* 用户登录 */

/* 添加评论 */
/* 删除评论 */
/* 回复评论 */

module.exports = router;
