module.exports = (options) => {
    
    let xml = `
    <xml><ToUserName><![CDATA[${options.ToUserName}]]></ToUserName>
         <FromUserName><![CDATA[${options.FromUserName}]]></FromUserName>
         <CreateTime>${options.CreateTime}</CreateTime>
         <MsgType><![CDATA[text]]></MsgType>
    `
    xml += `<Content>${options.Content}</Content>`
    /* switch (options.MsgType) {
        case 'text':  // 文本消息
            xml += `<Content>${options.Content}</Content>`
            break;
        case 'image': // 图片消息
            xml += `<Image><MediaId><![CDATA[media_id]]></MediaId></Image>`
            break;
        case 'voice': // 音频消息
            xml += `<Voice><MediaId><![CDATA[media_id]]></MediaId></Voice>`
            break;
        case 'video': // 视频消息
            xml += `<Video>
                        <MediaId><![CDATA[media_id]]></MediaId>
                        <Title><![CDATA[title]]></Title>
                        <Description><![CDATA[description]]></Description>
                    </Video>`
            break;
        case 'music': // 音乐消息
            xml += `<Music>
                        <Title><![CDATA[TITLE]]></Title>
                        <Description><![CDATA[DESCRIPTION]]></Description>
                        <MusicUrl><![CDATA[MUSIC_Url]]></MusicUrl>
                        <HQMusicUrl><![CDATA[HQ_MUSIC_Url]]></HQMusicUrl>
                        <ThumbMediaId><![CDATA[media_id]]></ThumbMediaId>
                    </Music>`
            break;
        case 'news':  // 图文消息
            xml += `<ArticleCount>1</ArticleCount>
                    <Articles>
                    <item>
                        <Title><![CDATA[title1]]></Title>
                        <Description><![CDATA[description1]]></Description>
                        <PicUrl><![CDATA[picurl]]></PicUrl>
                        <Url><![CDATA[url]]></Url>
                    </item>
                    </Articles>`
            break;
        default:break;
    } */
    xml += '</xml>'
    return xml
}