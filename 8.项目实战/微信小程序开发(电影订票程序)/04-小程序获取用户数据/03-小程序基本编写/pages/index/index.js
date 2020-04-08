// pages/test.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isShowGetUser:true,
    msg:'(>^ω^<)喵先生'
  },
  handleClick: ev => console.log(ev),
  _initUserInfo (){
    wx.getSetting({// 判断用户是否授权
      success: (result)=>{
        const {authSetting} = result
        // 隐藏按钮
        authSetting['scope.userInfo'] ? this.setData({isShowGetUser:false}) : null
      },
      fail: () => console.log('未能获取设置状态')
    });
    wx.getUserInfo({ // 获取用户信息(头像,名称,地址)
      success: (result)=>{
        const {userInfo} = result 
        // 修改数据
        this.setData({userInfo})
      },
      fail: ()=>console.log('获取用户信息失败')
    });
  },
  headelGetUserInfo (data) {
    // 授权按钮处理函数
    const {rawData} = data.detail
    if(rawData){
      // 判断用户是否已经授权
      console.log('用户授权完毕')
      this.userInfo = rawData
      this._initUserInfo()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initUserInfo()
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