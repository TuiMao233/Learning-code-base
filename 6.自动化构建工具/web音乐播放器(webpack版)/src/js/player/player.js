import $ from 'jquery'
function Player(audio) { // 播放器初始化构造函数
    return  new Player.prototype.init(audio)
}
Player.prototype = {
init: function (audio) {// 初始化构造
        this.audio = audio
    },
songIndex: 7,// 定义歌词索引
data: {},// 定义歌单数据
volume: 0.5, // 定义音量储存
initSongDate: function (url, callback) { // 获取歌单数据
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const $this = this           
        $.ajax({ // 获取数据
            url:'/source/songlist.json',
            dataType: 'json',
            success: function(data){
                $this.songDataPars(data)
                callback.call($this,$this.data)
            },error: function (error){console.log('获取失败');
            }
        })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
},
songDataPars: function (data) { // 歌单解析
        this.data = data.map((item, index)=>{
            // 路径数据处理
            item.audio = item.audio.replace(/ /g,"%20")
            item.albumImg = item.albumImg.replace(/ /g,"%20")
            return item;
        })
    },
getTimePerc: function() { // 获取音频时间百分比
        return this.audio.currentTime / (this.audio.duration / 100)
    },
getParsTime: function() { // 获取处理过的总时间和播放时间 
        var time = {};
        time.beingTime= this.converTimeFormat(this.audio.currentTime);	//开始播放到现在所用的时间
        time.totalTime = this.converTimeFormat(this.audio.duration);  	//媒体总时间
        return time;
    },
converTimeFormat: function (second) {// 秒数转00:00
        second = isNaN(second) ? 0 : second
        var Minute = Math.floor(second / 60) // 分
        Minute = (Minute < 10) ? ("0"+Minute) : Minute; // 小于10自动补0
        var Second = Math.floor(second - (Minute * 60))	// 秒
        Second = (Second < 10) ? ("0"+Second) : Second; // 小于10自动补0
        return Minute+':'+Second
    },
}
Player.prototype.init.prototype = Player.prototype

export default Player