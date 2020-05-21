const express = require('express')
const app = express()

app.get('/search', (req, res) => {

    // 将cookie设置name为value, 后面还可以跟一个配置对象
    res.cookie('name', 'value', {
        domain: '.example.com', // Cookie的域名. 默认为应用程序的域名
        path: '/admin', // Cookie的路径. 默认为/
        expires: new Date(Date.now() + 900000), // cookies的过期时间, 未指定或设置为0, 则创建会话cookie. 
        secure: true,  // 将cookie标记为仅与HTTPS一起使用. 
        httpOnly: true, // 将Cookie标记为只能由Web服务器访问. 
    })
    // 清除由指定的Cookie name, 后面还可以跟着一个配置对象, 该配置对象与 res.cookie基本一致
    res.clearCookie('name', {})

    // path以attachment(附件)的方式传输文件(相对路径, 全路径)
    // 通常浏览器会提示下载, 底层代码通过res.sendFile实现
    res.download('/report-12345.pdf')
    res.download('/report-12345.pdf', 'report.pdf')
    res.download('/report-12345.pdf', 'report.pdf', (err) => { })

    // 用于快速结束响应 而无需任何数据
    res.end()
    res.status(404).end()

    // 返回一个json格式的响应数据
    res.json({ code: 1, msg: "请求成功" })
    // 返回一个支持jsonp的响应数据
    res.jsonp({ code: 1, msg: "请求成功" })
    // 返回一个http响应数据, body参数可以是对象, 字符串, Buffer对象或一个Array
    res.send({ code: 1, msg: "请求成功" })
    // path以attachment(附件)的方式传输文件(全路径)
    res.sendFile(__dirname + '/download/download.txt');
    
    // 根路径重定向
    res.redirect('/admin')
    // 相对当前路径URL 如当前路径是/admin/home那么重定向后就是/admin/home/post/new
    res.redirect('post/new')
    // 重定向其他站点URL
    res.redirect('http://example.com')
    // 重定向路径后退, 如当前路径是/admin/home那么重定向后就是/admin
    res.redirect('..')

    // views中的模板资源渲染为html并返回响应
    // 后面可传入数据对象供模板使用
    res.render('search', { name: '孙悟空' })
})

app.listen(3000, () => console.log('服务器启动成功'))