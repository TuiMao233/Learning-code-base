<template>
    <view class="article">
        <text class="head_text">{{article.title}}</text>
        <view class="icon_box">
            <view class="user_msg">
                <image class="user_headImg" src="/static/images/index/cart.jpg" />
                <text>{{article.author}} 发布于 {{article.date}}</text>
            </view>

            <view class="collect" @click="collect">
                <image class="icon" src="/static/images/icon/collection.png" v-if="isCollect"/>
                <image class="icon" src="/static/images/icon/collection-anti.png" v-else/>
            </view>
            <view class="share" @click="share">
                <image class="icon" src="/static/images/icon/share.png"/>
            </view>
            
        </view>
        <view class="player" @click="toggleAudioPlay">
            <view
                class="image" 
                :style="{backgroundImage:'url(/static'+article.detail_img+')'}"
            />
            <image 
                class="play_icon"
                :src="isMusicPlay ? '/static/images/music/music-start.png' : '/static/images/music/music-stop.png'"
            />
        </view>
        <view class="article_content">
            {{article.detail_content}}
        </view>
        <button class="forward_button"  open-type="share">转发此文章</button>
    </view>
</template>

<script>
import { mapState } from "vuex";
export default {
    data: () => ({
        article: {},
        index:null,
        isCollect: false,
        isMusicPlay: false,
        audioPlayer: null
    }),
    computed: {
        ...mapState(['listDatas'])
    },
    methods: {
        _initAudioPlayer (audioPlayer) { // 初始化背景音频
            // 设置音乐标题(必填)
            audioPlayer.title = 'music'
            // 设置音乐地址(必填)
            audioPlayer.src = 'http://music.163.com/song/media/outer/url?id=488267737.mp3'
            // 设置音乐图片
            audioPlayer.coverImgUrl = 'http://p1.music.126.net/oErHMKLK12jQbr7k6xrlMA==/109951164344700503.jpg?param=130y130'
            // 设置音乐歌手名
            audioPlayer.singer = 'Mr.A'
            // 设置专辑名
            audioPlayer.epname = 'OVA'
        },
        collect () { // 收藏
            const {index} = this
            const storage = wx.getStorageSync('isCollect')
            // 判断有没有该数据
            const data = storage ? storage : {}
            // 判断该页有没有被设置
            data[index] = data[index] ? !data[index] : true
            // 更改状态
            this.isCollect = data[index]
            // 储存值至本地
            wx.setStorage({key:'isCollect',data})
        },
        toggleAudioPlay() {// 切换音乐播放
            const {audioPlayer, isMusicPlay} = this
            !isMusicPlay ? this._initAudioPlayer(audioPlayer) : audioPlayer.pause()
        },
       share (ev) {// 分享菜单
		wx.showActionSheet({
			itemList: ['分享到朋友圈','分享到qq空间','分享到微博'],
			success: (result) => console.log(result.tapIndex)
		})
	}
    },
    onLoad(options) {
        const {index} = options
        this.article = this.listDatas[index]
        this.index = index
        this.audioPlayer = wx.getBackgroundAudioManager()
        // 监视音频暂停
        this.audioPlayer.onPause(()=>this.isMusicPlay = false)
        // 监视音频播放
        this.audioPlayer.onPlay(()=>this.isMusicPlay = true)
    },
    onUnload () {
        const {audioPlayer} = this
        audioPlayer.pause()
    }
}
</script>

<style>
.article {
    margin: 10px;
}
.player {
    position: relative;
}
.play_icon {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.head_text{
    font-weight: bold;
}
.collect ,.share {
    display: inline-block;
}
.image {
    margin-top: 20rpx;
    width: 100%;
    height: 450rpx;
    background-size: cover;
    background-position: center;
}
.article_content {
    text-indent:0.5rem;
    margin-top: 5px;
    font-size: 13px;
}
.icon_box {
    text-align: right;
}
.icon_box .user_msg {
    float: left;
    font-size: 12px;
    margin-top: 12px;
}
.icon_box .user_headImg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
}
.icon_box .icon{
    border-radius: 50%;
    margin-left: 5px;
    height: 35px;
    width: 35px;
}

.forward_button {
    margin-top: 10px;
    font-weight: 500;
    border: 1rpx solid rgba(0,0,0,.5);
}
</style>