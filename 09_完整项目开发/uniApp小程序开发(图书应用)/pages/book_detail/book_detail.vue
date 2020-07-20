<template>
	<div class="book_detail" v-if="bookData">
		<span class="header">{{bookData.book_name}}</span>
		<image :src="bookData.image" mode="aspectFill" />
		<div class="book_msg">
			<section>作者：{{bookData.author}}</section>
			<section>出版社：{{bookData.publishing}}</section>
			<section>出版日期：{{bookData.date}}</section>
			<section>定价：<span class="price">￥{{bookData.price}}</span></section>
		</div>
		<div class="control">
			<button class="share" open-type="share">分享给朋友</button>
			<image class="collection" src="../../static/images/personal/wodeshoucang.png" @click="onCollection" />
		</div>
		<span class="about_header">作品简介</span>
		<span class="about_text">{{bookData.details}}</span>
	</div>
</template>

<script>
	const app = getApp()
	export default {
		data: () => ({
			bookData: null,
			index: 0
		}),
		onLoad(query) {
			this.bookData = app.$vm._data.books[query.index]
			this.index = query.index
		},
		methods: {
			onCollection() {
				const bookData = this.bookData
				let collection_store = uni.getStorageSync('collection')
				collection_store = !Array.isArray(collection_store) ? [] : collection_store

				const findResult = collection_store.find(function(item, index) {
					return item.book_name == bookData.book_name
				})

				if (findResult) return uni.showToast({
					icon: "none",
					title: "您已经收藏了噢~"
				})
				bookData.index = this.index
				collection_store.unshift(bookData)
				wx.setStorage({ key:"collection", data: collection_store })
				uni.showToast({
					icon: "success",
					title: "收藏成功!"
				})
			}
		},
		onShareAppMessage() {
			console.log('用户点击分享')
		}
	};
</script>

<style lang="less">
	.price {
		color: red;
		font-size: 16px;
		margin-right: 5px;
	}

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

		.control {
			display: flex;
			justify-content: center;
			align-items: center;

			.share {
				width: 120px;
				margin: 0;
				display: inline-block;
				margin-right: 15px;
				font-size: 15px;
			}

			.collection {
				width: 25px;
				height: 25px;
			}
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
