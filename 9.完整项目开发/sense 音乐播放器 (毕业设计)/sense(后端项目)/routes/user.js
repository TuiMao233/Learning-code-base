const router = require('koa-router')()
const { UserModel } = require('../db/models')
const { md5 } = require('../utils')
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
// 上传头像数据
router.post('/AvatarUpload', async ctx => {
    const find_result = await UserModel.findOne({ email: ctx.query.email }, { __v: 0 })
    if (!find_result) return ctx.body = { code: 1, msg: '上传失败, 该用户不存在' };
    if (!ctx.files['avatar'] || !ctx.files['avatar'][0])
        return ctx.body = { code: 1, msg: '上传失败, 指定文件不存在, 或文件格式不正确' };
    // 获取文件后缀名 originalname 属性是名称
    const file = ctx.files['avatar'][0]
    const ext = path.extname(file.originalname);
    if (!ext.match(/jpg|png|jpeg/)) return ctx.body = { code: 1, msg: '上传失败, 文件不是jpg|png|jpeg' };
    // 构建文件名
    const file_name = `${nanoid(10)}${ext}`
    // 文件的目录
    const dir_file = path.resolve(__dirname, `../public/user_img/${file_name}`)
    // 写入文件
    fs.writeFileSync(dir_file, file.buffer)
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
// 退出登录
router.get('/out_login', async ctx => {
    ctx.session.email = null
    ctx.session.password = null
    ctx.body = { code: 0, msg: '用户cookies清除成功' }
})
// 添加到我的歌曲
router.post('/add_my_song', async ctx => {
    const { songItem } = ctx.request.body;
    const { email, password } = ctx.session

    // 效验参数是否存在, 或正确
    if (!songItem || !songItem.audio_name) return ctx.body = { code: 1, msg: '歌曲信息不存在' }
    if (!email && !password) return ctx.body = { code: 1, msg: '账户/密码未输入' };
    const findDoc = await UserModel.findOne({ email, password }, { __v: 0 })
    if (!findDoc) return ctx.body = { code: 1, msg: '该账户不存在' }

    // 查询歌单是否存在该歌曲
    const isExist = findDoc.song_list.find(item => item.audio_name == songItem.audio_name)
    if (isExist) return ctx.body = { code: 1, msg: '歌单已存在该歌曲' }

    // 向数据库歌单列添加歌曲
    await findDoc.updateOne({ $addToSet: { song_list: songItem } })
    ctx.body = { code: 0, data: songItem }
})
// 移出我的歌曲莫个项
router.post('/remote_my_song', async ctx => {
    const { audio_name } = ctx.request.body;
    const { email, password } = ctx.session
    // 效验参数是否存在, 或正确
    if (!audio_name) return ctx.body = { code: 1, msg: '歌曲信息不存在' }
    if (!email && !password) return ctx.body = { code: 1, msg: '账户/密码未输入' };
    const findDoc = await UserModel.findOne({ email, password }, { __v: 0 })
    if (!findDoc) return ctx.body = { code: 1, msg: '该账户不存在' }

    // 查询歌单是否存在该歌曲
    const isExist = findDoc.song_list.find(item => item.audio_name == audio_name)
    if (!isExist) return ctx.body = { code: 1, msg: '歌单中不存在该歌曲' }


    // 向数据库歌单列删除该歌曲名称的项
    await findDoc.updateOne({ $pull: { song_list: { audio_name } } })
    const song_list = findDoc.toObject().song_list
    song_list.splice(song_list.findIndex(item => item.audio_name == audio_name), 1)
    ctx.body = { code: 0 }
})
module.exports = router