const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')()
router.get('/search',async ctx => {
    // 查询字符串组成的对象 通常在get请求中使用
    console.log(ctx.query) // => {...}

    // 请求体中携带的对象 通常在post请求中使用
    console.log(ctx.request.body) // => {...}

    // 请求中的占位符 如/search:id中, id是占位符, 则可以获取params.id的值
    console.log(ctx.params) // => {...}
    // 当使用正则表达式来定义路由占位符规则时, req.params通常是一个数组
    console.log(ctx.params[0])

    // 请求中携带的cookies, 如果没有则为{}
    console.log(ctx.cookies.get) // => {...}
		
  	ctx.body = { code: 1, msg: "请求成功" }
})
app.use(router)
app.listen(3000, () => console.log('服务器启动成功'))