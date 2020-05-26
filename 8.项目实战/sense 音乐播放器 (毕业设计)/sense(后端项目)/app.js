const Koa = require('koa');
const app = new Koa();
// 引入静态资源管理器
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
// 引入路由器
const router = require('./routes')
// 引入session库与设置加密签名
const Koa_Session = require('koa-session');
app.keys = ['im a newer secret']

// 添加中间件
app.use(bodyParser());
app.use(static('./public'))
app.use(Koa_Session({}, app))
app.use(router.routes()).use(router.allowedMethods());

// 开启服务器
app.listen(3000, () => console.log('服务器启动成功, 端口号为:3000'))