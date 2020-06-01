const { MoviesModel } = require('../db')

const { url } = require('../config')
// 包装发送数据
module.exports = async (messageData) => {
    const { ToUserName, FromUserName, MsgType } = messageData
    const options = {
        ToUserName: FromUserName,
        FromUserName: ToUserName,
        CreateTime: Date.now(),
        MsgType
    }
    options.Content = '不懂你在说什么噢~'
    const oldMsgType = MsgType

    // 设置默认回复都为文字消息
    options.MsgType = 'text'
    switch (oldMsgType) {
        case 'text': // 文字消息
            let { Content } = messageData
            switch (true) {
                case Content === '热门':
                    // 回复消息更改为图文消息
                    options.MsgType = 'news'
                    // 查询电影数据库
                    const findReMenResult = await MoviesModel.findOne({}, {
                        title: 1, image: 1, summary: 1, doban_id: 1, _id: 0
                    })
                    // 封装回复内容
                    options.Content = {
                        title: findReMenResult.title,
                        description: findReMenResult.summary,
                        picurl: findReMenResult.image,
                        url: `${url}/detail/${findReMenResult.doban_id}`
                    }
                    break;
                case Content === '首页':
                    // 回复消息更改为图文消息
                    options.MsgType = 'news'
                    // 封装回复内容
                    options.Content = {
                        title: "white电影官网",
                        description: "在这里可以查看最新最热门电影噢~",
                        picurl: "http://img4.imgtn.bdimg.com/it/u=2830553567,1297407695&fm=26&gp=0.jpg",
                        url: `${url}/trailer`
                    }
                    break;
                default:
                    // 搜索用户输入的指定信息
                    const findSearchResult = await MoviesModel.findOne(
                        { title: Content },
                        { title: 1, image: 1, summary: 1, doban_id: 1, _id: 0 }
                    )
                    if (findSearchResult) {
                        // 回复消息更改为图文消息
                        options.MsgType = 'news'
                        // 封装回复内容
                        options.Content = {
                            title: findSearchResult.title,
                            description: findSearchResult.summary,
                            picurl: findSearchResult.image,
                            url: `${url}/detail/${findSearchResult.doban_id}`
                        }
                    } else {
                        options.Content = '抱歉...未查找到此电影'
                    }

                    break;
            }
            console.log(`服务器接收文本消息:${Content};将要发送消息为:`, typeof options.Content)
            break;
        case 'image': // 图片消息
            // 接收图片链接 图片消息媒体id
            console.log(messageData.PicUrl, messageData.MediaId)
            console.log(`服务器接收图片消息:.....;将要发送消息:${options.Content}`)
            break;
        case 'voice': // 语言消息
            // 接收语音格式、语音消息媒体id、语言识别结果
            console.log(messageData.Format, messageData.MediaId, messageData.Recognition)
            console.log(`服务器接收语言消息:.....;将要发送消息:${options.Content}`)
            break;
        case 'event': // 接收事件推送
            switch (messageData.Event) {
                case 'subscribe':// 用户订阅
                    options.Content = '欢迎您的关注~\n'
                        + '回复 首页 查看电影预告片\n\n'
                        + '回复 热门 查看最新最热门的电影\n\n'
                        + '回复 文本 搜索电影信息\n\n'
                        + '回复 语言 搜索电影信息\n\n'
                        + '也可以点击下面的菜单按钮，了解电影公众号'
                    if (messageData.EventKey) { options.Content = '用户扫描了带参数二维码事件' }
                    break;
                case 'unsubscribe':// 用户取消订阅
                    console.log('无情取关qaq')
                    break;
                case 'CLICK': // 点击自定义按钮事件
                    console.log(messageData.EventKey)
                    if (messageData.EventKey === 'help') {
                        // 用户点击了按钮, key值为help
                        options.Content = '您可以按照以下提示进行操作~\n\n'
                            + '回复 首页 查看电影预告片\n\n'
                            + '回复 热门 查看最新最热门的电影\n\n'
                            + '回复 文本 搜索电影信息\n\n'
                            + '回复 语言 搜索电影信息\n\n'
                            + '也可以点击下面的菜单按钮，了解电影公众号'
                    }
                    break;
            }
            break;
    }


    return options
}