// 由于Koa本身并没有内置路由, 需要引入路由器
const router = require('koa-router')()
const { MusicModel, DiscussModel } = require('../db/models')

const path = require('path')
const fs = require('fs')
const { nanoid } = require('nanoid')

// 上传歌曲信息, 返回歌曲信息
router.post('/upload_song', async ctx => {
    const { audio_name, album_name, singer_name } = ctx.query
    if (!ctx.query.audio_name) return ctx.body = { code: 1, msg: '歌曲名称不能为空' }
    if (!ctx.files['audio'] && !ctx.files['audio'][0])
        return ctx.body = { code: 1, msg: '上传失败, 指定文件不存在, 或文件格式不正确' };
    let albumImage_name = null;
    const findMusicResult = await MusicModel.findOne({ audio_name })
    if (findMusicResult) return ctx.body = { code: 1, msg: '该歌曲已存在, 请删除该歌曲后重试' }
    if (ctx.files['album_image'] && ctx.files['album_image'][0]) {
        // 专辑图片已获取, 写入专辑图片
        const albumImageFile = ctx.files['album_image'][0]
        const albumImage_ext = path.extname(albumImageFile.originalname);
        albumImage_name = `${nanoid(10)}${albumImage_ext}`
        const dirAlbumImage_name = path.resolve(__dirname, `../public/album_img/${albumImage_name}`)
        fs.writeFileSync(dirAlbumImage_name, albumImageFile.buffer)
    }

    const audioFile = ctx.files['audio'][0]
    const audio_ext = path.extname(audioFile.originalname);
    const audioFile_name = `${nanoid(10)}${audio_ext}`
    const dirAudio_name = path.resolve(__dirname, `../public/audio/${audioFile_name}`)

    fs.writeFileSync(dirAudio_name, audioFile.buffer)
    const data = {
        audio_name, album_name, singer_name,
        audio_path: `/audio/${audioFile_name}`,
        albumImage_name: ''
    }
    if (albumImage_name) data.album_img_path = `/album_img/${albumImage_name}`;

    // 创建歌曲文档
    const create_doc = await MusicModel.create(data)
    if (create_doc) ctx.body = { code: 0, data: create_doc }
    else ctx.body = { code: 1, data: '上传数据库失败, 请联系管理员' }
})
// 歌曲名称搜索路由
router.get('/search_song', async ctx => {
    const { audio_name } = ctx.query
    console.log('搜索歌曲:', ctx.query)
    if (!audio_name) return ctx.body = { code: 1, msg: '参数不能为空' };
    let find_result
    if (audio_name == 'all') { // 全部查询
        find_result = await MusicModel.find({}, { __v: 0 });
    } else { // 模糊查询歌曲名称
        find_result = await MusicModel.find(
            { audio_name: { $regex: new RegExp(audio_name, "i") } }, { __v: 0 }
        );
    }

    if (!find_result) return ctx.body = { code: 1, msg: '未找到该歌曲' };
    ctx.body = { code: 0, data: find_result }
})
// 搜索最新的十条歌曲
router.get('/new_song', async ctx => {
    const findResult = await MusicModel.find({}).sort({ _id: -1 }).limit(10)
    ctx.body = {code:0, data:findResult}
})
// 发表评论路由
router.post('/discuss_push', async ctx => {
    const { song_id, content, user_id } = ctx.request.body
    if (!content || !user_id || !song_id ||
        !song_id.match(/^[0-9a-fA-F]{24}$/))
        return ctx.body = { code: 1, msg: '评论数据缺失或者格式不正确' };

    const create_result = await DiscussModel.create({
        song_id, content, user_id,
    })
    if (!create_result) return ctx.body = { code: 1, msg: '发表评论失败' };
    ctx.body = { code: 0, data: create_result }
})
// 获取歌曲评论
router.get('/discuss_get', async ctx => {
    const { song_id } = ctx.query
    if (!song_id || !song_id.match(/^[0-9a-fA-F]{24}$/))
        return ctx.body = { code: 1, msg: '歌曲ID格式不正确' };
    const find_result = await DiscussModel.find({ song_id }, { _id: 0, __v: 0 })
    if (!find_result) return ctx.body = { code: 1, msg: '歌曲暂无评论' };
    ctx.body = { code: 0, data: find_result }
})

module.exports = router