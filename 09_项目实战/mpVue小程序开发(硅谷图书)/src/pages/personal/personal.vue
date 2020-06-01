<template>
  <div>
    <div class="header">
      <div>
        <image :src="avatarUrl" v-if="avatarUrl !== ''" />
        <image v-else class="icon" src="/static/images/icon/头像.png" style="opacity: 0.5;" />
      </div>
      <div class="user" v-if="nickName !== ''">{{nickName}}</div>
      <button open-type="getUserInfo" @getuserinfo="getUserInfo" class="user" v-else>登 录</button>
    </div>
    <button>扫码看书</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    avatarUrl: "",
    nickName: ""
  }),
  mounted() {
    wx.getUserInfo({
      success: result => {
        const { userInfo } = result;
        this.avatarUrl = userInfo.avatarUrl;
        this.nickName = userInfo.nickName;
      }
    });
  },
  methods: {
    getUserInfo(data) {
      const { userInfo } = data.mp.detail;
      this.avatarUrl = userInfo.avatarUrl;
      this.nickName = userInfo.nickName;
    }
  }
};
</script>

<style lang="less">
@import "../../utils/style-units.less";
.header {
  background-color: #8cc242;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 20px 0;
  image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 15px;
  }
  .user {
    width: 60px;
    height: 30px;
    padding: 0 5px;
    margin: 0;
    border-radius: 10px;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    background-color: #659a1c;
  }
}
</style>