<template>
  <div class="home">
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
		  <div class="left_books">
			<div class="item" 
			v-for="(item, index) in splitArray(books, (books.length) / 2)[0]"
			:key="index"
			@click="goToDetail(index)"
			>
				<image class="layer" :src="item.item_image"></image>
				<div class="layer">《{{item.book_name}}》</div>
				<div class="layer">作者: {{item.author}}</div>
				<div class="layer">出版社: {{item.publishing}}</div>
				<div class="layer">
					<span class="price">
						<span style="font-size: 13px;">￥</span> {{item.price}}
					</span>
					<span class="payment">2338人付款</span>
				</div>
			</div>
		  </div>
		  <div class="right_books">
			<div class="item"
			v-for="(item, index) in splitArray(books, (books.length-1) / 2)[1]"
			:key="index"
			@click="goToDetail(books.length / 2 + index - 1)"
			>
				<image class="layer" :src="item.item_image" mode="widthFix"></image>
				<div class="layer">《{{item.book_name}}》</div>
				<div class="layer">作者: {{item.author}}</div>
				<div class="layer">出版社: {{item.publishing}}</div>
				<div class="layer">
					<span class="price">
						<span style="font-size: 13px;">￥</span> {{item.price}}
					</span>
					<span class="payment">2338人付款</span>
				</div>
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
	  books: app.$vm._data.books,
  }),
  mounted() {
  	this.carouselImg = getCarouselImg()
  },
  methods: {
    goToBookList () { uni.navigateTo({ url: '/pages/book_list/book_list' }); },
    goToDetail (index) { uni.navigateTo({ url: `/pages/book_detail/book_detail?index=${index}` }); },
	splitArray (arr, len) { // 分隔二维数组
	    let arr_length = arr.length;
	    let newArr = [];
	    for (let i = 0; i < arr_length; i += len) {
	        newArr.push(arr.slice(i, i + len));
	    }
	    return newArr;
	}
  },
};
</script>

<style lang="less">
@import "../../utils/style-units.less";
swiper swiper-item image {
  width: 100%;
}
.home, page {
	background-color: #F1F1F1;
	height: 100%;
}
.content {
	
	.merch_list {
		padding: 10px;
		display:flex;
		.left_books, .right_books {
			width: 50%;
			padding: 6px;
			.item {
				border: 3rpx solid #CCCCCC;
				text-align: center;
				font-size: 12px;
				border-radius: 15px;
				overflow: hidden;
				background-color: #FFFFFF;
				margin-bottom: 10px;
				padding-bottom: 10px;
				image { width: 100%; max-height: 170px; }
				.layer {
					margin-bottom: 3px;
				}
				.price {
					color: red;
					font-size: 16px;
					margin-right: 5px;
				}
				.payment {
					font-size: 10px;
					color: #808080;
				}
			}
	  }
	}
  header {
    padding: 10px 15px;
	background-color: #E5E5E5;
    .head_text {
      font-size: 16px;
    }
    .right-arrow {
      float: right;
	  width: 22px;
	  height: 22px;
    }
  }
  
}
</style>