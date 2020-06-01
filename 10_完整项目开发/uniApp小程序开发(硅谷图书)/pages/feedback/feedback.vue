<template>
	<div class="feedback">
		<form @submit="" @reset="">
			<view class="error">*请选择反馈问题的类型</view>
			<div class="surface">
				<view class="column">
					<span class="left_text">性能体验</span>
					<span class="right_text">白屏、卡顿、闪退、图片出不来</span>
					<switch name="performance" />
				</view>
				<view class="column">
					<span class="left_text">功能异常</span>
					<span class="right_text">现有功能无法正常使用</span>
					<switch name="performance" />
				</view>
				<view class="column">
					<span class="left_text">产品建议</span>
					<span class="right_text">用的不爽，建议都提出来吧</span>
					<switch name="performance" />
				</view>
				<view class="column">
					<span class="left_text">其他反馈</span>
					<span class="right_text"></span>
					<switch name="performance" />
				</view>
			</div>
			<view class="error">*问题和意见</view>
			<view class="textarea">
				<textarea 
				placeholder="请详细描述你遇到的问题" 
				style="height: auto;min-height: 100px;"
				/>
			</view>
			<button form-type="submit" type="warn" class="commit_button" @click="commit">提交</button>
		</form>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			commit() {
				uni.showToast({
					title:"提交问题成功! 感谢你的反馈"
				})
				setTimeout(()=>uni.switchTab({url:'/pages/personal/personal'}), 1500)
				
			}
		}
	}
</script>

<style lang="less">
	@LandRsize: 12px; // 左右间隔尺寸
	@TandBsize: 12px; // 上下间隔尺寸

	.error {
		font-size: 12px;
		color: red;
		padding: @LandRsize;
	}

	.feedback,
	page {
		background-color: #E5E5E5;
		height: 100%;
	}

	.commit_button {
		position: fixed;
		bottom: 0;
		width: 100%;
		border-radius: 0;
	}
	.textarea {
		background-color: #FFFFFF;
		width: 100%;
		min-height: 100px;
		padding: 12px;
		font-size: 15px;
	}
	.surface {
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		flex-direction: column;

		&:not(:last-child) {
			border-bottom: 1rpx solid #E5E5E5;
		}
		
		.column {
			font-size: 13px;
			padding: @TandBsize @LandRsize;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left_text {
				font-size: 15px;
			}

			.right_text {
				font-size: 12px;
				color: #AAAAAA;
			}

			&:not(:last-child) {
				border-bottom: 1rpx solid #E5E5E5;
			}

			.icon {
				vertical-align: middle;
				width: 20px;
				height: 20px;
				margin-right: @LandRsize;

				&.right-arrow {
					float: right;
					width: 15px;
					height: 15px;
				}
			}
		}
	}
</style>
