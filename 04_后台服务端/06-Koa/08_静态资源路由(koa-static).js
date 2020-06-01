const static = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
// 指定根路径 为 public目录为静态资源目录
app.use(static('public'))
// localhost:4000/a.mp3 --> public/a.mp3

// 指定访问路径/public 为 public目录为静态资源目录(未测试)
router.get('/public', static('public'))
// localhost:4000/public/a.mp3 --> public/a.mp3

app.listen(3000, () => console.log('服务器启动成功'))