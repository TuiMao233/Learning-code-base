const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/player', { useMongoClient: true });
mongoose.connection.once('open', () => {console.log('数据库连接成功');})
// 创建集合规则
var stuSchema = new mongoose.Schema({
    song: String,// 歌名
    singer: String,// 歌手名
    album: String,// 专辑名
    getAudio: String,// 获取音频的请求头
    songTime: String, // 歌曲总时间
    getLyric: String,// 获取歌词
    getAlbumImg: String,// 获取专辑图片
    index: Number // 歌曲索引
})
// 映射model（集合）
var StuModel = mongoose.model('songInfo', stuSchema)
// 聚合函数封装
function aggregateGroup (obj) {
    obj.Model.aggregate([
        {$group: {_id: null, total: obj.total}}
    ]).exec((err,reslut)=>{
        // 判断是否拿到数据
        if(reslut[0]){obj.exec(reslut[0].total)
        }else{obj.exec(reslut[0])}
    })
}
//  创建一个文档
var stu = new StuModel({
    song: "70亿人の头の上に风船を",
    singer: "きくお",
    album: "きくおミク",
    getAudio: "./source/item - 1/きくお - 70亿人の头の上に风船を.mp3",
    songTime: "00:04:47.66",
    getLyric: "./source/item - 1/きくお - 70亿人の头の上に风船を.txt",
    getAlbumImg: "./source/item - 1/きくおミク.png",
    index: 0
});
// 添加进数据库并进行index排序
aggregateGroup({
    // model对象
    Model: StuModel,
    // 获取字段index的最大值
    total:{$max:"$index"},
    exec (reslut) {
        stu.index = !reslut && reslut != 0 ? 0 : reslut+ 1
        stu.save()
    }
})




/* 
var data={
    account:951416545,
    password: 123456,
    avatar:'...', // 头像
    options:'{....}', // 设置
    songList:[
        {
            songLiskName: 'link',
            index:"...",
            songList:"[{songName:xxx,songId:xxx,index;xxx},{songName:xxx,songId:xxx,index;xxx},{songName:xxx,songId:xxx,index;xxx}]",
            del:false
        }
    ]
        
}

name songId

songId --> songData --> 的某个歌
里面包含着歌的所有信息
每次切换歌，都会发一个请求，根据songId请求歌的数据 */