<template>
  <div class="index">
    <swiper 
      :indicator-dots="swiper_index !== 2"
      indicator-color="rgba(255,255,255,.3)"
      indicator-active-color="#fff"
      @change="handleChange"
    >
      <swiper-item>
        <image mode="aspectFill" src="/static/images/index/1.jpg"/>
      </swiper-item>
      <swiper-item>
        <image mode="aspectFill" src="/static/images/index/2.jpg"/>
      </swiper-item>
      <swiper-item>
        <image mode="aspectFill" src="/static/images/index/3.jpg"/>
        <button @click="gotoHome" v-show="swiper_index == 2">开始体验</button>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data: ()=>({
    swiper_index:0
  }),
  methods: {
    // 跳转到主页面
    gotoHome: () => wx.switchTab({url: '/pages/home/main'}),
    // swiper滑动事件, 动态改变index状态
    handleChange (ev) { this.swiper_index = ev.mp.detail.current }
  },
};
</script>

<style lang="less">
page, .index, swiper, swiper image {
  height: 100%;
}
swiper {
  swiper-item {
    position: relative;
    button {
      background: rgba(0,0,0,.5);
      color: #ffffff;
      border: solid 1rpx #ffffff;
      font-size: 15px;
      position: absolute;
      top: 80%;left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>