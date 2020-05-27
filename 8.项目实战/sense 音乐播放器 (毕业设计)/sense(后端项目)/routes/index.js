// 由于Koa本身并没有内置路由, 需要引入路由器
const router = require('koa-router')()
const { UserModel, MusicModel, DiscussModel } = require('../db/models')
const { md5, upload } = require('../utils')
const { host_url } = require('../config')
// 登录
router.post('/login', async ctx => {
    let email = ctx.request.body.email
    let password = ctx.request.body.password
    if (!email && !password) return ctx.body = { code: 1, msg: '账户/密码未输入' };
    password = md5(password)
    const find_result = await UserModel.findOne({ email, password }, { __v: 0 })

    if (find_result) {
        ctx.body = { code: 0, data: find_result }
        ctx.session.email = email
        ctx.session.password = password
    }
    else ctx.body = { code: 1, msg: '该账户不存在' }
})
// 注册
router.post('/register', async ctx => {
    let name = ctx.request.body.name
    let email = ctx.request.body.email
    let password = ctx.request.body.password
    if (!email && !password && !name) return ctx.body = { code: 1, msg: '账户/密码未输入' };
    password = md5(password)
    const find_result = await UserModel.findOne({ email, password }, { __v: 0 })

    if (!find_result) {
        const create_result = await UserModel.create({ email, password, name })
        const { song_list } = create_result
        ctx.body = { code: 0, data: { email, password, song_list } }
        ctx.session.email = email
        ctx.session.password = password
    } else ctx.body = { code: 0, msg: '该账户已存在' }
})


// 自动登录
router.get('/auto_login', async ctx => {
    const { email, password } = ctx.session
    if (!email && !password) return ctx.body = { code: 1, msg: '账户/密码未输入' };
    const find_result = await UserModel.findOne({ email, password }, { __v: 0 })
    if (find_result) ctx.body = { code: 0, data: find_result }
    else ctx.body = { code: 1, msg: '该账户不存在' }
})

// 上传歌曲信息, 返回歌曲ID
router.post('/upload_song_info', async ctx => {
    const { audio_name, singer_name, album_name } = ctx.request.body
    if (!audio_name && !singer_name && !album_name)
        return ctx.body = { code: 1, msg: '歌曲信息不完整' };
    const create_result = await MusicModel.create({ audio_name, singer_name, album_name })
    ctx.body = { code: 0, data: { song_id: create_result._id } }
})
// 上传歌曲文件, 返回歌曲信息
router.post('/upload_song_file',
    upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'albumImg', maxCount: 1 }]),
    async ctx => {
        const { song_id } = ctx.query
        if (!song_id || !song_id.match(/^[0-9a-fA-F]{24}$/))
            return ctx.body = { code: 1, msg: '歌曲ID格式不正确' };
        const findDoc = await MusicModel.findById(song_id, { _id: 0, __v: 0 })
        if (!findDoc) return ctx.body = { code: 1, msg: '歌曲信息未被创建' };

        const { albumImg, audio } = ctx.files
        // 如果值不为空, 将文件路径信息添加到数据库中
        albumImg ? findDoc.album_img_path = `${host_url}${albumImg[0].originalname}` : null
        audio ? findDoc.audio_path = `${host_url}${audio[0].originalname}` : null
        ctx.body = { code: 0, data: findDoc };
    }
);
// 歌曲名称搜索路由
router.get('/search_song', async ctx => {
    const { audio_name } = ctx.query
    if (!audio_name) return ctx.body = { code: 1, msg: '参数不能为空' };
    const find_result = await MusicModel.find({ audio_name }, { _id: 0, __v: 0 });
    if (!find_result) return ctx.body = { code: 1, msg: '未找到该歌曲' };
    ctx.body = { code: 0, data: find_result }
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