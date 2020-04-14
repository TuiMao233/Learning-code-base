// 包装发送数据(回复消息)
module.exports = (messageData) => {
    const { ToUserName, FromUserName,MsgType } = messageData
    const options = {
        ToUserName: FromUserName,
        FromUserName: ToUserName,
        CreateTime: Date.now(),
        MsgType
    }
    options.Content = '不懂你在说什么噢~'
    switch (MsgType) {
        case 'text': // 文字消息
        let { Content } = messageData
            switch (true) {
                case Content === '0':
                    options.Content = '0:表示新闻资讯'
                    break;
                case Content === '1':
                    options.Content = '1:代表今日热点'
                    break;
                case Content.match('2'):
                    options.Content = '2:半匹配模式'
                    break;
                case Content === 'Σ(☉▽☉"a嗨！':
                    options.Content = 'o(ﾟДﾟ)っ阿？！'
                    break;
                default: break;
            }
            console.log(`服务器接收文本消息:${Content};将要发送消息:${options.Content}`)
            break;
        case 'image': // 图片消息
            // 接收图片链接 图片消息媒体id
            console.log(messageData.PicUrl,messageData.MediaId)
            console.log(`服务器接收图片消息:.....;将要发送消息:${options.Content}`)
            break;
        case 'voice': // 语言消息
            // 接收语音格式、语音消息媒体id、语言识别结果
            console.log(messageData.Format, messageData.MediaId, messageData.Recognition)
            console.log(`服务器接收语言消息:.....;将要发送消息:${options.Content}`)
            break;
        case 'shortvideo': // 小视频消息
            // 视频消息媒体id、视频消息缩略图的媒体id
            console.log(messageData.MediaId, messageData.ThumbMediaId)
            console.log(`服务器接收小视频消息:.....;将要发送消息:${options.Content}`)
            break;
        case 'location': // 地理位置消息
            // 接收维度、经度、地图缩放大小、地理位置信息
            const {Location_X, Location_Y, Scale, Label} = messageData
            options.Content = `维度:${Location_X};经度;${Location_Y};地图缩放:${Scale};地理位置:${Label}`
            console.log(`服务器接收地理位置消息:.....;将要发送消息:${options.Content}`)
            break;
        case 'link': // 链接消息
            // 接收消息标题、消息描述、消息链接
            console.log(messageData.Title, messageData.Description, messageData.Url)
            console.log(`服务器接收小视频消息:.....;将要发送消息:${options.Content}`)
            break;
        case 'event': // 接收事件推送
            switch (messageData.Event) {
                case 'subscribe':// 用户订阅
                    options.Content = '欢迎您的关注~'
                    if(messageData.EventKey){options.Content = '用户扫描了带参数二维码事件'}
                    break;
                case 'unsubscribe':// 用户取消订阅
                    console.log('无情取关qaq')
                    break;
                case 'SCAN': // 用户已经关注过, 并扫描带参数二维码
                    options.Content = '用户已经关注过, 并扫描带参数二维码~'
                    break;
                case 'LOCATION': // 上报地理位置事件
                    // 接收纬经度和精度
                    const {Latitude, Longitude, Precision} = messageData
                    options.Content = `维度:${Longitude};经度;${Latitude};精度:${Precision}`
                    console.log(`服务器上报地理位置事件:.....;将要发送消息:${options.Content}`)
                    break;
                case 'CLICK': // 点击自定义按钮事件
                    console.log('用户点击了按钮:'+messageData.EventKey)
                    break;
            }
            break;
    }


    return options
}