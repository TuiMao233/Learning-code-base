/* 
    const chatSchema = mongoose.Schema({
        from: {type:String, required: true}, // 发送用户的id
        to: {type: String, required: true},  // 接收用户的id
        chat_id: {type: String, required: true}, // from和to组成的聊天标识
        content: {type: String, required: true}, // 一条消息的内容
        read: {type:Boolean, default: false}, // 标识是否已读(只有接受者才需要的数据)
        create_time: Number // 创建这条聊天的时间
    })
*/
const { ChatsModel } = require("../db/models")
module.exports = function (server) {
    // 得到 IO 对象
    const io = require('socket.io')(server)

    // 监视连接, 当有一个客户端连接上的回调
    io.on('connection', function (socket) {
        console.log('用户连接成功')
        // 自定义监听事件, 接收单个客户端发送的消息
        socket.on('sendMsg', function (data) {
            console.log('服务器端接收浏览器消息', data)
            /* {to,from,content} */
            const content = data.content
            const from = data.from
            const to = data.to
            const chat_id = [from, to].sort().join('_')
            const create_time = new Date()
            ChatsModel.create(
                { from, to, chat_id, content, create_time },
                function (error, chatMsg) {
                    console.log(chatMsg)
                    io.emit('receiveMsg', chatMsg)
                }
            )

        })
    })
}