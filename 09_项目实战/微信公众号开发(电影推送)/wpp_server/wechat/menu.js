// 菜单的设置对象

const {url} = require('../config')
// 最多三个菜单
module.exports = {
    "button": [
        {   // 普通菜单按钮
            "type": "view",
            "name": "查看电影🎥",
            "url": `${url}/trailer/`
        },
        {
            "type": "view",
            "name": "语言识别👂",
            "url": `${url}/search/`
        },
        {
            "name": "戳我~", 
            "sub_button": [
                {
                    "type": "view", 
                    "name": "官网⚡", 
                    "url": "https://www.baidu.com/",
                 }, 
                {
                    "type": "click", 
                    "name": "帮助🌈", 
                    "key": "help"
                }
            ]
        }
    ]
}







/* module.exports = {
    "button": [
        {   // 普通菜单按钮
            "type": "click",
            "name": "查看电影",
            "key": "V1001_TODAY_MUSIC"
        },
        {   // 二级菜单按钮
            "name": "菜单",
            "sub_button": [
                {
                    "type": "view",
                    "name": "搜索",
                    "url": "http://www.soso.com/"
                }
            ]
        },
        {
            "name": "扫码", 
            "sub_button": [
                {   // 扫码
                    "type": "scancode_waitmsg", 
                    "name": "扫码带提示", 
                    "key": "扫码带提示"
                }, 
                {   // 扫码后触发事件
                    "type": "scancode_push", 
                    "name": "扫码推事件", 
                    "key": "扫码推事件"
                }
            ]
        },
        {
            "name": "发图", 
            "sub_button": [
                {
                    "type": "pic_sysphoto", 
                    "name": "系统拍照发图", 
                    "key": "rselfmenu_1_0",
                 }, 
                {
                    "type": "pic_photo_or_album", 
                    "name": "拍照或者相册发图", 
                    "key": "rselfmenu_1_1",
                }, 
                {
                    "type": "pic_weixin", 
                    "name": "微信相册发图", 
                    "key": "rselfmenu_1_2",
                }
            ]
        }
    ]
} */