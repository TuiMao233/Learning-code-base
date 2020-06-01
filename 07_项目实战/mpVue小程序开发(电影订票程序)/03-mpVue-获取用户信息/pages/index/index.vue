<template>
  <div class="indexContainer">
    <img 
      class="index_img" 
      :src="userInfo.avatarUrl" alt 
      v-if="userInfo.nickName"
    />
    <button
      size="defult"
      type="defult"
      form-type="submit"
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
      lang="zh_CN"
      v-else
    >用户授权</button>
    <p class="user_name">hello {{userInfo.nickName}}</p>
    <div class="goStudy">开启小程序之旅</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    userInfo: {}
  }),
  methods: {
    getUserInfo (data) {
      const {userInfo} = data.mp.detail
      this.userInfo = userInfo ? userInfo : {}
    },
    _initUserInfo () {
      wx.getUserInfo({
        withCredentials: 'false',
        lang: 'zh_CN',
        timeout:10000,
        success: (result)=>{
          const {userInfo} = result
          this.userInfo = userInfo ? userInfo : {}
        },
        fail: ()=>console.log('用户信息获取失败')
      });
    }
  },
  beforeMount() {
    this._initUserInfo()
  }
};
</script>
<style>
page {
  background: #8ac241;
}
.indexContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.index_img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  margin: 100rpx 0;
}
button {
  margin: 100rpx 0;
}
.user_name {
  font-size: 40rpx;
  font-weight: bold;
  margin: 100rpx 0;
}
.goStudy {
  width: 220rpx;
  height: 80rpx;
  border: 1rpx solid #eee;
  font-size: 24rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 10rpx;
}
</style>
