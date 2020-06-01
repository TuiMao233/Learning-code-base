<template>
	<block>
		<input type="text" maxlength="140" placeholder="搜索关键字" v-model="searchText" confirm-type="搜索" @confirm="onSearch" />
		<BookItem v-for="(item, index) in books" :key="index" :bookData="item" :index="index" />
	</block>
</template>

<script>
	const app = getApp()
	import BookItem from "@/templates/book_item";
	export default {
		data: () => ({
			searchText: "",
			books: app.$vm._data.books
		}),
		methods: {
			onSearch() {
				// 模糊查询数列, 改变data中的数据
				const reg = new RegExp(this.searchText)
				this.books = this.books.filter(item => reg.test(item.book_name))
			}
		},
		components: {
			BookItem
		}
	};
</script>

<style lang="less">
	input {
		margin: 5px;
		border-bottom: solid 1px #009475;
		font-size: 16.5px;
	}
</style>
