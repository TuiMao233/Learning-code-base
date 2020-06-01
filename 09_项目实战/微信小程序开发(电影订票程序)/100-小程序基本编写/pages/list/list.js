import {list_data} from '../../datas/list-data';
console.log(list_data)
// 100-小程序基本编写/pages/list/list.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		swiperImgUrl:[
			'/images/detail/carousel/01.jpg',
			'/images/detail/carousel/02.jpg',
			'/images/detail/carousel/03.jpg',
			'/images/detail/carousel/04.jpg'
		],
		list_data:[]
	},
	swiperToDetail (ev) {
		const {index} = ev.target.dataset
		wx.navigateTo({url: `/pages/detail/detail?index=${index}`});
	},
	toDetail (ev) {
		const {index} = ev.currentTarget.dataset
		wx.navigateTo({url: `/pages/detail/detail?index=${index}`});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({list_data})
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