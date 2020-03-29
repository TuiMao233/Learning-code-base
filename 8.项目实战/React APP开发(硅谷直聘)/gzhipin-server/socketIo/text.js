module.exports = function (server) {
    // 得到 IO 对象
    const io = require('socket.io')(server)

    // 监视连接, 当有一个客户端连接上的回调
    io.on('connection', function (socket) {
        console.log('用户成功连接')

        // 自定义监听事件,  接收单个客户端发送的消息
        socket.on('sendMsg', function (data) {
            console.log('服务器端接收浏览器的消息', data)
            
            // 自定义发送消息事件 (名称, 数据)
            // io与socket都可以绑定发送与监听事件, io是全体连接, socket是单个连接
            io.emit('receiveMsg', data.name + '_' + data.date)
        })
    })
}