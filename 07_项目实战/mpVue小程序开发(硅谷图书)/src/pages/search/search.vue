<template>
  <block>
    <input type="text" maxlength="140" placeholder="搜索关键字" v-model="searchText" />
    <BookItem v-for="(item, index) in 10" :key="index" :bookData="bookData" :index="index" />
  </block>
</template>

<script>
import BookItem from "@/templates/book_item";
export default {
  data: () => ({
    searchText: "",
    bookData: {
      book_name: "平凡的世界",
      author: "路遥",
      publishing: "机械工业出版社",
      price: 59.8,
      date: "2018-1-1",
      item_image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587457189698&di=67137c006489b4ae9ad2bbe3b6424348&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn13%2F544%2Fw640h704%2F20180725%2F6539-hftenia2787150.jpg",
      image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587459866995&di=52a3d341bc9cae77d09004a05a3a46cb&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM0003E7CggSA1UVRrKAbF3PAARC-F7qP78836.png%3Fwidth%3D391%26height%3D558"
    }
  }),
  components: { BookItem }
};
</script>

<style lang="less">
input {
  margin: 5px;
  border-bottom: solid 1px #009475;
  font-size: 16.5px;
}
</style>