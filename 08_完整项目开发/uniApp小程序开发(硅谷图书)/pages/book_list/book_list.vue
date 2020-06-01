<template>
  <div>
    <BookItem v-for="(item, index) in books" :key="index" :bookData="item" :index="index" />
  </div>
</template>

<script>
const app = getApp()

import { getCarouselImg } from '@/mock_data'
import BookItem from "@/templates/book_item";
export default {
  data: () => ({
	  carouselImg: [],
	  books: app.$vm._data.books,
  }),
  components: { BookItem }
};
</script>

<style lang="less">
</style>