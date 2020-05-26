<template>
  <div class="book_detail" v-if="bookData.book_name">
    <span class="header">{{bookData.book_name}}</span>
    <image :src="bookData.image" />
    <div class="book_msg">
      <section>作者：{{bookData.author}}</section>
      <section>出版社：{{bookData.publishing}}</section>
      <section>出版日期：{{bookData.date}}</section>
      <section>定价：￥{{bookData.price}}</section>
    </div>
    <button  open-type="share">分享给朋友</button>
    <span class="about_header">作者简介</span>
    <span
      class="about_text"
    >xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    bookData: {
      book_name: "平凡的世界",
      author: "路遥",
      publishing: "机械工业出版社",
      date: "2018-1-1",
      price: 59.8,
      item_image:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587457189698&di=67137c006489b4ae9ad2bbe3b6424348&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn13%2F544%2Fw640h704%2F20180725%2F6539-hftenia2787150.jpg",
      image:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587459866995&di=52a3d341bc9cae77d09004a05a3a46cb&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM0003E7CggSA1UVRrKAbF3PAARC-F7qP78836.png%3Fwidth%3D391%26height%3D558"
    }
  }),
  beforeMount() {
    const { query } = this.$root.$mp;
    console.log(query)
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