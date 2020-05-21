const Koa = require('koa');
const app = new Koa();
// 使用session会话储存信息的中间件
const Koa_Session = require('koa-session');

// 这个是配合signed属性的加密签名key
app.keys = ['im a newer secret']
const CONFIG = {
  key: 'koa.sess', // cookie的key(默认是 koa:sess)
  maxAge: 86400000, // 过期时间, 以毫秒ms为单位计算(默认为一天)
  autoCommit: true, // 自动提交到响应头(默认true)
  overwrite: true, // 是否允许重写(默认true)
  httpOnly: true, // 是否设置HttpOnly, 设置了"HttpOnly"属性能有效的防止XSS攻击 (默认true)
  signed: true, // 是否使用加密签名(默认true)
  rolling: false, // 是否每次响应时刷新Session的有效期(默认false)
  renew: false, // 是否在Session快过期时刷新Session的有效期(默认false)
}

// 添加该session中间件
app.use(Koa_Session(session_config, app))

// 请求中使用
app.use(async ctx => {
  // 设置session回话对象中的值
  ctx.session.username = "张山"
  // 获取session对象中的值
  const session = ctx.session.username;
});
app.listen(3000, () => console.log('服务器启动成功'))