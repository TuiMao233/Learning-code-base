const Koa = require('koa');
const app = new Koa();
// 由于Koa本身并没有内置路由, 需要引入路由器
const router = require('koa-router')()

// 创建一个get请求, 路径是/search
app.get('/search',async ctx => {
    //处理并返回数据.....
    ctx.body = { code: 1, msg: "请求成功" }
})
// 创建一个post请求, 路径是/search
app.post('login',async ctx => {
    //处理并返回数据.....
    ctx.body = { code: 1, msg: "请求成功" }
})

app.use(router)
app.listen(3000, () => console.log('服务器启动成功'))