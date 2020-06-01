<template>
  <div class="book_detail" v-if="bookData">
    <span class="header">{{bookData.book_name}}</span>
    <image :src="bookData.image" mode="aspectFill"/>
    <div class="book_msg">
      <section>作者：{{bookData.author}}</section>
      <section>出版社：{{bookData.publishing}}</section>
      <section>出版日期：{{bookData.date}}</section>
      <section>定价：￥{{bookData.price}}</section>
    </div>
    <button  open-type="share">分享给朋友</button>
    <span class="about_header">作品简介</span>
    <span
      class="about_text"
    >xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
  </div>
</template>

<script>
	const app = getApp()
export default {
  data: () => ({
    bookData: null
  }),
  onLoad(query) {
	console.log(app.data)
	this.bookData = app.$vm._data.books[query.index]
  },
  onShareAppMessage() {
    console.log('用户点击分享')
  }
};
</script>

<style lang="less">
.book_detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  image {
    width: 100%;
    height: 400px;
  }
  .header {
    text-align: center;
    font-weight: bold;
    margin: 10px 0;
  }
  .book_msg {
    margin: 10px 0;
    font-size: 16.5px;
  }
  .about_header {
    text-align: center;
    font-weight: bold;
    margin: 10px 0;
  }
  .about_text {
    overflow-wrap: break-word;
  }
}
</style>