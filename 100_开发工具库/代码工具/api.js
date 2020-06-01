{/*  网易云歌曲主页的链接
    链接: http://music.163.com/song?id=歌曲ID
    返回类型: 页面
*/}

{/*  网易云歌曲的mp3文件链接
    链接: http://music.163.com/song/media/outer/url?id=歌曲ID.mp3
    返回类型: mp3文件
*/}

{/*  网易云歌曲搜索API
    链接: http://s.music.163.com/search/get?
    传入参数:
		src: lofter,可为空
		type: 1:单曲 10:专辑 100:歌手 1000:歌单 1002:用户
		s: 查询的关键字
		limit: 返回的结果条数
		offset: 偏移
		callback: 回调,为空则返回json,否则为jsonp
	返回类型: json字符串
    json数据格式:
    {
        "code": 200,
        "result": {
        "songCount": 1500,
            "songs": [
                {
                    "id": 31048597,
                    "name": " 你 ",
                    "artists": [{ "id": 1050430, "name": "张傲寒", "picUrl": null }],
                    "audio": null,
                    "djProgramId": 0,
                    "page": "http://music.163.com/m/song/31048597",
                    "album": {
                        "id": 3110321,
                        "name": "你",
                        "artist": { "id": 0, "name": "", "picUrl": null },
                        "picUrl": "http://p2.music.126.net/Gs7-GfZyT--b1XXHPVBEOw==/7696581395544493.jpg"
                    },
                },
                {
                    "id": 485816359, "name": "你.", "artists": [{ "id": 12344091, "name": "Young12", "picUrl": null }
                    ],
                    "album": {
                        "id": 35654734,
                        "name": "你.",
                        "artist": { "id": 0, "name": "", "picUrl": null },
                        "picUrl": "http://p1.music.126.net/gDAqbEDCkb_Rn567urGz1A==/109951162954171874.jpg"
                    },
                    "audio": "",
                    "djProgramId": 0, "page": "http://music.163.com/m/song/485816359"
                }
            ]
    }
}
*/}
