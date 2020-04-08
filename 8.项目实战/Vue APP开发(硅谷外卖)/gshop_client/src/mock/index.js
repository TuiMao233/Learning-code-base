import Mock from 'mockjs'

Mock.mock('/shop_msg', {
    code: 0, data: {
        "name": "嘉萩一品（温都水城）",
        "total_order": 90,
        "delivery_party": "潍坊专送",
        "delivery_time": 28,
        "delivery_fee": 4,
        "min_delivery_price|15-20":20,
        "distance": "1000m",
        "phone":"18501083744",
        "location":"北京市率台区太平桥44号",
        "business_time":"09:35-24:00",
        "type":"包子粥店、简餐",
        "shop_img_url":[
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586036513163&di=84ea1e021f15a1979c33f49c32b848f9&imgtype=0&src=http%3A%2F%2Fbjcache.leju.com%2Fzxjiaju%2Fzx_pic%2F20180509%2Fa0%2F67%2Fa670d844ebf06b368575a111aee6397c.jpeg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586036555749&di=676939a5bb0d69e0b9b6a27c5f7f272e&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp155494261.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586036555744&di=b29f4ddf869ffc0c7e2ad96d51b6e31d&imgtype=0&src=http%3A%2F%2Fp3.ssl.cdn.btime.com%2Ft01029df795bfc9607c.jpg%3Fsize%3D1080x717",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586036523345&di=1d9aee8aa7f47196090836e74ef1ca41&imgtype=0&src=http%3A%2F%2Fpic1.shejiben.com%2Fcase%2F2018%2F09%2F10%2F20180910205317-da1f24f0.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586036523343&di=5287bbf1222ddccce499ea17d5ac5070&imgtype=0&src=http%3A%2F%2Fbjcache.leju.com%2Fzxjiaju%2Fzx_pic%2F20161013%2F13%2F80%2F18037724dc495f4c3b37f520b80171ba.jpeg"
        ],
        "head_url":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2674668617,617341397&fm=11&gp=0.jpg",
        "bgd_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585867119760&di=c779b40fb535d6f1f23099cf32dad113&imgtype=0&src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F95%2F85%2F73%2Fa6c7911b_E958573_cf4c200e.jpg%2521%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fjpg",
        "promotions|2-3": [
            { "name": "首单", "color": "#7FB458", "content": "新用户下单立减17元(不与其他活动...)" },
            { "name": "特惠", "color": "#FF7E73", "content": "满35减19 满65减35" }
        ]
    }
})
Mock.mock('/shop_goods', {
    code: 0, data: [
        {
            "type": "优惠", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "折扣", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "香浓甜粥", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "营养甜粥", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "爽口凉菜", "goods|2-3": [
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
            ]
        },
        {
            "type": "精选套餐", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "果拼果汁", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "小吃主食", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "美味佳肴", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "好吃的不行", "goods|2-3": [
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
            ]
        },
        {
            "type": "每人必买", "goods|2-3": [
                { "name": "八宝酱菜", "good_type": "酱菜", "sales": 84, "price": 15, "praise_rate": "96%", "head_img_src": "http://localhost:4000/shop/3.jpg" },
                { "name": "南瓜粥", "good_type": "甜粥", "sales": 91, "price": 9, "praise_rate": "100%", "head_img_src": "http://localhost:4000/shop/1.jpg" },
            ]
        }
    ]
})
Mock.mock('/shop_assess', {
    code: 0, "data|3-5": [
        {
            "username": "你大爷",
            "price|3-4.1":5,
            "head_url":"http://b-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg",
            "content": "不错,粥很好喝",
            "time":"@datetime()",
            "labels|1-4": ["南瓜粥"]
        }
    ]
})