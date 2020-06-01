// 引入Koa模块
const Koa = require('koa');
// 创建app应用对象
const app = new Koa();
// 添加中间件, 该中间件所有请求都会通过
app.use(async (ctx, next)=>{})
// 监听端口号, 启动服务器
app.listen(3000, ()=> console.log('服务器启动成功'))