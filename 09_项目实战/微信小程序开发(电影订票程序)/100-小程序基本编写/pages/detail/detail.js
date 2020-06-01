// 100-小程序基本编写/pages/detail/detail.js
import { list_data } from '../../datas/list-data';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		audioPlayer: null,
		isMusicPlay: false,
		isCollect: false,
		index:null,
		article: {}
	},
	_initAudioPlayer (audioPlayer) {
		// 设置音乐标题(必填)
		audioPlayer.title = 'music'
		// 设置音乐地址(必填)
		audioPlayer.src = 'http://music.163.com/song/media/outer/url?id=1319688149.mp3'
		// 设置音乐图片
		audioPlayer.coverImgUrl = 'http://p1.music.126.net/oErHMKLK12jQbr7k6xrlMA==/109951164344700503.jpg?param=130y130'
		// 设置音乐歌手名
		audioPlayer.singer = 'Mr.A'
	},
	togglePlay () {
		const isMusicPlay = !this.data.isMusicPlay
		this.setData({isMusicPlay})

		// 获取唯一后台播放器实例
		const {audioPlayer} = this.data
		// 播放/ 暂停
		isMusicPlay ? this._initAudioPlayer(audioPlayer) : audioPlayer.pause()
	},
	collect() { // 收藏
		const {index} = this.data
		const result = wx.getStorageSync('isCollect')
		const data =  result ? result : {}
		const isCollect =  !(data[index] ? data[index] : false)
		
		// 更改本地储存
		data[index] = isCollect
		// 状态储存为本地
		wx.setStorage({key:'isCollect',data})

		// 设置状态
		this.setData({isCollect})

		// 提示文本
		const title = isCollect ? '收藏成功' : '取消收藏'
		wx.showToast({title,icon: 'success'});

	},
	share (ev) {
		// 分享
		wx.showActionSheet({
			itemList: ['分享到朋友圈','分享到qq空间','分享到微博'],
			success: (result) => {
				// 点击的下标
				const {tapIndex} = result
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { index } = options
		// 获取本地储存数据
		const result = wx.getStorageSync('isCollect')
		const data =  result ? result : {}
		const isCollect = (data[index] ? data[index] : false)

		// 获取唯一后台播放器实例
		const audioPlayer = wx.getBackgroundAudioManager()
		// 初始化时间
		audioPlayer.seek(0)
		// 监视音频暂停
		audioPlayer.onPause(()=>this.setData({isMusicPlay:false}))
		// 监视音频播放
		audioPlayer.onPlay(()=>this.setData({isMusicPlay:true}))

		// 将数据储存
		this.setData({
			index, isCollect, audioPlayer, article: list_data[index]
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		// 获取唯一后台播放器实例
		const {audioPlayer} = this.data
		// 初始化时间
		audioPlayer.seek(0)
		// 暂停
		audioPlayer.pause()
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})