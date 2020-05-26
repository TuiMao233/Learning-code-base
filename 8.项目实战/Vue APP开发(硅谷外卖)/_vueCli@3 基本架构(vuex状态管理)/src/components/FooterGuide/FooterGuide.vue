<template>
	<div class="footer_guide" :class="{on: /login|shop/.test($route.path)}">
		<a class="guide_item" :class="{on: $route.path === '/msite'}" @click="goTo('/msite')">
			<i class="iconfont icon-waimai"></i>
			<span>外卖</span>
		</a>
		<a class="guide_item" :class="{on: $route.path === '/search'}" @click="goTo('/search')">
			<i class="iconfont icon-search"></i>
			<span>搜索</span>
		</a>
		<a class="guide_item" :class="{on: $route.path === '/order'}" @click="goTo('/order')">
			<i class="iconfont icon-dingdan"></i>
			<span>订单</span>
		</a>
		<a class="guide_item" :class="{on: $route.path === '/profile'}" @click="goTo('/profile')">
			<i class="iconfont icon-geren"></i>
			<span>我的</span>
		</a>
	</div>
</template>

<script>
	export default {
		methods: {
			goTo(path) {
				this.$router.replace(path)
			}
		}
	}
</script>

<style lang='stylus'>
@import './../../assets/mixins.styl';
	.footer_guide{
		top-border-1px(rgba(0,0,0,.1))
		position fixed
		bottom 0
		width 100%
		height 50px
		display flex
		z-index 1000
		background #ffffff
		&.on {
			display none
		}
		.guide_item {
			text-align center
			flex: 1
			margin 5px
			i {
				font-size 22px
				display block
			}
			span {
				font-size 12px
				margin-top 2px
				margin-bottom 2px
			}
			&.on {
				color rgb(2,167,116)
			}
		}
	}
</style>
