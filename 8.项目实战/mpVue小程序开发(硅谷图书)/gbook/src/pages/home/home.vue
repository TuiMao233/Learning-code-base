<template>
  <div>
    <swiper indicator-dots autoplay circular>
      <swiper-item>
        <image mode="aspectFill" src="/static/images/index/1.jpg" />
      </swiper-item>
      <swiper-item>
        <image mode="aspectFill" src="/static/images/index/2.jpg" />
      </swiper-item>
      <swiper-item>
        <image mode="aspectFill" src="/static/images/index/3.jpg" />
      </swiper-item>
    </swiper>
    <div class="content">
      <header>
        <span class="head_text">全部商品</span>
        <span class="right-arrow" @click="goToBookList">></span>
      </header>
      <div class="merch_list">
        <div class="item" v-for="(item, index) in 6" :key="index">
          <div class="item_content" @click="goToDetail(index)">
            <image src="/static/images/index/1.jpg" />
            <span class="name">《追风筝的毛》</span>
            <span class="author">打下卡-哦多尅</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    goToBookList () { wx.navigateTo({ url: '/pages/book_list/main' }); },
    goToDetail (index) { wx.navigateTo({ url: `/pages/book_detail/main?index=${index}` }); }
  },
};
</script>

<style lang="less">
@import "../../utils/style-units.less";
swiper swiper-item image {
  width: 100%;
}
.content {
  header {
    margin: 10px 15px;
    .head_text {
      font-size: 16.5px;
    }
    .right-arrow {
      float: right;
    }
  }
  .merch_list {
    .clearfix();
    .item {
      position: relative;float: left;box-sizing: border-box;
      .grid-border(solid 1rpx rgba(0, 0, 0, 0.3));
      width: 50%;padding-bottom: 50%;
      .item_content {
        position: absolute;display: flex;
        left: 0;right: 0;top: 0;bottom: 0;
        flex-direction: column;align-items: center;
        margin-top: 15px;
        image {width: 65%;height: 65%;}
        .name {
          font-size: 16.5px;margin-top: 10px;
          height: 17.5%;display: block;
        }
        .author {
          font-size: 15px;margin-top: 10px;
          height: 17.5%;display: block;
        }
      }
    }
  }
}
</style>