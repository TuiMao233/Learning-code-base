<template>
  <div>
    <swiper indicator-dots autoplay circular>
      <swiper-item 
	  v-for="src_path in carouselImg" 
	  :key="item" 
	  indicator-color="rgba(255,255,255,.3)"
	  indicator-active-color="#FFFFFF"
	  circular
	  >
        <image :src="src_path" mode="widthFix"/>
      </swiper-item>
    </swiper>
    <div class="content">
      <header>
        <span class="head_text">全部商品</span>
		<image 
		class="right-arrow" 
		src="../../static/images/icon/右箭头.png"  
		@click="goToBookList" />
        <span  ></span>
      </header>
      <div class="merch_list">
        <div class="item" v-for="(item, index) in books" :key="index">
          <div class="item_content" @click="goToDetail(index)">
            <image :src="item.item_image" mode="widthFix"/>
            <span class="name">《{{item.book_name}}》</span>
            <span class="author">{{item.author}}-{{item.publishing}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const app = getApp()
import { getCarouselImg } from '@/mock_data'
export default {
  data: () => ({
	  carouselImg: [],
	  books: app.$vm._data.books
  }),
  mounted() {
  	this.carouselImg = getCarouselImg()
  },
  methods: {
    goToBookList () { uni.navigateTo({ url: '/pages/book_list/book_list' }); },
    goToDetail (index) { uni.navigateTo({ url: `/pages/book_detail/book_detail?index=${index}` }); }
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
    padding: 10px 15px;
	background-color: #F1F1F1;
    .head_text {
      font-size: 16px;
    }
    .right-arrow {
      float: right;
	  width: 22px;
	  height: 22px;
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
        image {
			width: 100px;
			height: 100px;
		}
        .name {
          font-size: 15px;margin-top: 5px;
          height: 17.5%;display: block;
        }
        .author {
          font-size: 12px;margin-top: 5px;
          height: 17.5%;display: block;
        }
      }
    }
  }
}
</style>