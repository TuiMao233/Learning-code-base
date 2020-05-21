<template>
  <div class="book_item" @click="goToDetail">
		<image :src="bookData.item_image" />
		<div class="book_msg">
			<section>{{bookData.book_name}} <span class="price">￥{{bookData.price}} </span></section>
			<section>作者：{{bookData.author}}</section>
			<section>出版社：{{bookData.publishing}}</section>
		</div>
	</div>
</template>

<script>
export default {
  props: ["bookData","index"],
  methods: {
	  goToDetail(){
		  wx.navigateTo({ url: `/pages/book_detail/main?index=${this.index}` });
	  }
  },
};
</script>

<style lang="less">
@import '../utils/style-units.less';
.book_item {
	margin-top: 20px;
	.clearfix();
	image {
		float: left;
		width: 80px;
		height: 80px;
		margin-right: 5px;
	}
	.book_msg{
		height: 80px;
		display: flex;
		flex-direction: column;
		font-size: 16.5px;
		justify-content: space-between;
		margin-right: 5px;
		.price {
			float: right;
			color: red;
			font-weight: bold;
		}
	}
}
</style>