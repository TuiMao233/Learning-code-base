const Koa = require('koa');
const app = new Koa();
// 引入静态资源管理器
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
// 引入路由器
const songRouter = require('./routes/song')
const userRouter = require('./routes/user')
// 引入session库与设置加密签名
const Koa_Session = require('koa-session');
app.keys = ['im a newer secret']
// 引入解析上传文件数据插件
const multer = require('@koa/multer');


// 上传文件配置
app.use(multer().fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'album_image', maxCount: 1 }
]))
// 静态资源解析
app.use(bodyParser());
app.use(static('./public'))
app.use(static('../sense(前端项目)/dist'))
// session加密
app.use(Koa_Session({}, app))
// API路由器
app.use(songRouter.routes()).use(songRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

// 开启服务器
app.listen(3003, () => console.log('服务器启动成功, 端口号为:3003'))