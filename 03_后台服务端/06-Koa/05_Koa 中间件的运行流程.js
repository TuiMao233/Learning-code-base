app.use(async (ctx, next) => {
    console.log(1)
    next(); // next不写会报错
    console.log(5)
});
app.use(async (ctx, next) => {
    console.log(2)
    next();
    console.log(4)
});

app.use(async (ctx, next) => {
    console.log(3)
    ctx.body = 'Hello World';
});

app.listen(3000, () => console.log('服务器启动成功'))
  // 打印出1、2、3、4、5