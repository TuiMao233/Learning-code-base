<template>
	<view class="collection">
		<view v-if="books.length">
			<BookItem
				v-for="(item, index) in books"
				:key="index"
				:bookData="item"
				:index="item.index"
			/>
		</view>
		<view class="none" v-else>
			暂时没有收藏噢
		</view>
	</view>
</template>

<script>
	import BookItem from '../../templates/book_item.vue'
	export default {
		data: () => ({
			books: []
		}),
		components:{BookItem},
		mounted() {
			const result = wx.getStorageSync('collection')
			console.log(result)
			this.books = result ? result : []
		}
	}
</script>

<style lang="less">
	.collection, page {
		height: 100%;
		position: relative;
	}
	.none {
		text-align: center;
		position: absolute;
		height: 10px;
		top: 0;bottom: 0;right: 0;left: 0;
		margin: auto;
	}
</style>
