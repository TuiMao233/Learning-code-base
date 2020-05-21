module.exports = (options) => {

    let xml = `
    <xml><ToUserName><![CDATA[${options.ToUserName}]]></ToUserName>
         <FromUserName><![CDATA[${options.FromUserName}]]></FromUserName>
         <CreateTime>${options.CreateTime}</CreateTime>
         <MsgType><![CDATA[${options.MsgType}]]></MsgType>
    `
    switch (options.MsgType) {
        case 'text':  // 文本消息
            xml += `<Content>${options.Content}</Content>`
            break;
        case 'image': // 图片消息
            xml += `<Image><MediaId><![CDATA[${options.media_id}]]></MediaId></Image>`
            break;
        case 'voice': // 音频消息
            xml += `<Voice><MediaId><![CDATA[${options.media_id}]]></MediaId></Voice>`
            break;
        case 'video': // 视频消息
            xml += `<Video>
                        <MediaId><![CDATA[${options.media_id}]]></MediaId>
                        <Title><![CDATA[${options.title}]]></Title>
                        <Description><![CDATA[${options.description}]]></Description>
                    </Video>`
            break;
        case 'music': // 音乐消息
            xml += `<Music>
                        <Title><![CDATA[${options.title}]]></Title>
                        <Description><![CDATA[${options.description}]]></Description>
                        <MusicUrl><![CDATA[${options.music_url}]]></MusicUrl>
                        <HQMusicUrl><![CDATA[${options.hq_music_url}]]></HQMusicUrl>
                        <ThumbMediaId><![CDATA[${options.media_id}]]></ThumbMediaId>
                    </Music>`
            break;
        case 'news':  // 图文消息
            xml += `<ArticleCount>1</ArticleCount>
                    <Articles>
                    <item>
                        <Title><![CDATA[${options.Content.title}]]></Title>
                        <Description><![CDATA[${options.Content.description}]]></Description>
                        <PicUrl><![CDATA[${options.Content.picurl}]]></PicUrl>
                        <Url><![CDATA[${options.Content.url}]]></Url>
                    </item>
                    </Articles>`
            break;
        default: break;
    }
    xml += '</xml>'

    return xml
}