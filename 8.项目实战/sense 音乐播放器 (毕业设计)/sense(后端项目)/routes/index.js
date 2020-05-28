// 由于Koa本身并没有内置路由, 需要引入路由器
const router = require('koa-router')()
const { UserModel, MusicModel, DiscussModel } = require('../db/models')
const { md5 } = require('../utils')
const multer = require('@koa/multer');
const path = require('path')
const fs = require('fs')
const { nanoid } = require('nanoid')
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
    } else ctx.body = { code: 1, msg: '该账户已存在' }
})
// 上传头像
router.use(multer().single('avatar'))
router.post('/AvatarUpload', async ctx => {
    const find_result = await UserModel.findOne({ email: ctx.query.email }, { __v: 0 })
    if (!find_result) return ctx.body = { code: 1, msg: '上传失败, 该用户不存在' };
    if (!ctx.file) return ctx.body = { code: 1, msg: '上传失败, 指定文件不存在, 或文件格式不正确' };
    // 获取文件后缀名 originalname 属性是名称
    const ext = path.extname(ctx.file.originalname);
    if (!ext.match(/jpg|png/)) return ctx.body = { code: 1, msg: '上传失败, 文件不是jpg或png' };
    // 构建文件名
    const file_name = `${nanoid(10)}${ext}`
    // 文件的目录
    const dir_file = path.resolve(__dirname, `../public/user_img/${file_name}`)
    // 写入文件
    fs.writeFileSync(dir_file, ctx.file.buffer)
    // 保存到该文档数据库中
    find_result.avatar_file_path = `/user_img/${file_name}`
    find_result.save()
    // 返回响应
    console.log(find_result)
    ctx.body = { code: 0, data: find_result }

    // 旧头像路径有值, 执行删除旧头像逻辑
    if (ctx.query.oldAvatar) return fs.unlinkSync(path.resolve(__dirname, `../public${ctx.query.oldAvatar}`));

})

// 自动登录
router.get('/auto_login', async ctx => {
    const { email, password } = ctx.session
    if (!email && !password) return ctx.body = { code: 1, msg: '账户/密码未输入' };
    const find_result = await UserModel.findOne({ email, password }, { __v: 0 })
    if (find_result) ctx.body = { code: 0, data: find_result }
    else ctx.body = { code: 1, msg: '该账户不存在' }
})
router.get('/out_login', async ctx => {
    ctx.session.email = null
    ctx.session.password = null
    ctx.body = { code: 0, msg: '用户cookies清除成功' }
})
// 上传歌曲信息, 返回歌曲ID
router.use(multer().single('mp3'))
router.post('/upload_song', async ctx => {
    console.log(ctx.file)
    // const { audio_name, singer_name, album_name } = ctx.request.body
    // if (!audio_name && !singer_name && !album_name)
    //     return ctx.body = { code: 1, msg: '歌曲信息不完整' };
    // const create_result = await MusicModel.create({ audio_name, singer_name, album_name })
    // ctx.body = { code: 0, data: { song_id: create_result._id } }
})
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