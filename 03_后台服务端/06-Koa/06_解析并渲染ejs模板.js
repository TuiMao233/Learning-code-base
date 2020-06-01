const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板目录(绝对路径), 引擎为ejs
app.use(views(path.join(__dirname, './views'), {extension: 'ejs'}))
app.use( async ( ctx ) => {
    // 渲染/views/index.ejs, 并传入数据供模板使用
    await ctx.render('index', { title:'nmd' })
})

app.listen(3000, () => console.log('服务器启动成功'))