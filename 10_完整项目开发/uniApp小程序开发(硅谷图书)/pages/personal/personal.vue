<template>
	<div>
		<div class="header">
			<div>
				<image class="header-image" :src="avatarUrl" v-if="avatarUrl !== ''" />
				<image v-else class="header-image" src="/static/images/icon/头像.png" style="opacity: 0.5;" />
			</div>
			<div class="user" v-if="nickName !== ''">{{nickName}}</div>
			<button open-type="getUserInfo" @getuserinfo="getUserInfo" class="user" v-else>登 录</button>
			<view class="saoma">
				扫码
				<image src="../../static/images/icon/扫码.png" mode="" @click="headleSaoma" />看书
			</view>
		</div>

		<div class="surface">
			<view class="column" @click="gotoPage('myCollection')">
				<image class="icon" mode="widthFix" src="../../static/images/personal/wodeshoucang.png" />
				我的收藏
				<image class="icon right-arrow" mode="widthFix" src="../../static/images/personal/右箭头.png" />
			</view>
		</div>

		<div class="surface">
			<view class="column" @click="address">
				<image class="icon" mode="widthFix" src="../../static/images/personal/weibiaoti2fuzhi08.png" />
				收货地址
				<image class="icon right-arrow" mode="widthFix" src="../../static/images/personal/右箭头.png" />
			</view>
			<view class="column" @click="gotoPage('shopping')">
				<image class="icon" mode="widthFix" src="../../static/images/personal/gouwuche.png" />
				购物车
				<image class="icon right-arrow" mode="widthFix" src="../../static/images/personal/右箭头.png" />
			</view>
		</div>

		<div class="surface">
			<view class="column" @click="gotoPage('shopping')">
				<image class="icon" mode="widthFix" src="../../static/images/personal/dianpu.png" />
				官方商店
				<image class="icon right-arrow" mode="widthFix" src="../../static/images/personal/右箭头.png" />
			</view>
			<view class="column" @click="gotoPage('feedback')">
				<image class="icon" mode="widthFix" src="../../static/images/personal/bangzhu.png" />
				反馈问题
				<image class="icon right-arrow" mode="widthFix" src="../../static/images/personal/右箭头.png" />
			</view>
			<view class="column" @click="haoping">
				<image class="icon" mode="widthFix" src="../../static/images/personal/haoping.png" />
				给我们好评
				<image class="icon right-arrow" mode="widthFix" src="../../static/images/personal/右箭头.png" />
			</view>
		</div>

	</div>
</template>

<script>
	export default {
		data: () => ({
			avatarUrl: "",
			nickName: ""
		}),
		mounted() {
			wx.getUserInfo({
				success: result => {
					const {
						userInfo
					} = result;
					this.avatarUrl = userInfo.avatarUrl;
					this.nickName = userInfo.nickName;
				}
			});
		},
		methods: {
			headleSaoma() {
				// 处理扫码看书.... 
				uni.scanCode({
					success (response) {
						uni.navigateTo({ url: `/pages/book_detail/book_detail?index=1` });
					}
				})
			},
			address () {
				uni.chooseAddress({
					success (val) { console.log(val) },
					fail (error) { console.log(error) }
				})
			},
			haoping (){
				uni.showToast({
					icon:"none",
					title: "谢谢你对我们的支持~"
				})
			},
			gotoPage (page_name) {
				uni.navigateTo({ url:`/pages/${page_name}/${page_name}` })
			},
			getUserInfo(data) {
				const {
					userInfo
				} = data.mp.detail;
				this.avatarUrl = userInfo.avatarUrl;
				this.nickName = userInfo.nickName;
			}
		}
	};
</script>

<style lang="less">
	@import "../../utils/style-units.less";
	@LandRsize: 15px; // 左右间隔尺寸
	@TandBsize: 18px; // 上下间隔尺寸

	.surface {
		padding: @TandBsize 0;
		margin: 0 @LandRsize;
		display: flex;
		justify-content: space-between;
		flex-direction: column;

		&:not(:last-child) {
			border-bottom: 1rpx solid rgba(0, 0, 0, .3);
		}

		.column {
			font-size: 16px;

			&:not(:last-child) {
				margin-bottom: @TandBsize;
			}

			.icon {
				vertical-align: middle;
				width: 25px;
				height: 25px;
				margin-right: @LandRsize;
				&.right-arrow{
					float: right;
					width: 15px;
					height: 15px;
				}
			}
		}
	}

	.header {
		background-color: #8cc242;
		display: flex;
		justify-items: center;
		align-items: center;
		padding: 20px 0;

		.header-image {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			margin: 0 15px;
		}

		.user {
			width: 60px;
			height: 30px;
			padding: 0 5px;
			margin: 0;
			border-radius: 10px;
			font-size: 15px;
			line-height: 30px;
			text-align: center;
			color: #ffffff;
			background-color: #659a1c;
		}
	}

	.saoma {
		font-size: 15px;
		color: #FFFFFF;
		line-height: 18px;
		// margin-top: -18px;
		text-align: right;
		padding-right: 10px;
		flex: 1;

		&:hover {
			background: none;
			color: #FFFFFF
		}

		image {
			vertical-align: middle;
			width: 60px;
			height: 60px;
		}
	}
</style>
