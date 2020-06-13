<template>
	<view class="container">
		<view class="header">
			<!-- 小程序没有dom, 无法通过正常方式获取按钮值 -->
			<button
				v-for="(item, index) in buttonValue"
				@click="addTest(item)"
				auto-focus
				:focus="isfocus"
			>{{item}}</button>
		</view>
		<textarea
			placeholder="文本域"
			:value="value"
			@blur="getValue"
			@input="headleInput"
		/>
	</view>
</template>

<script>
	export default {
		data: () => ({
			buttonValue: ['test_1', 'test_2', 'test_3'],
			value: "文文文文文文\n\n文文文文文文\n\n文文文文文文\n\n文文文文文文\n\n文文文文文文\n",
			cursorIndex: -1,
			isfocus: true
		}),
		mounted() {
		},
		methods: {
			addTest(test) {
				setTimeout(() => {
					// getValue是异步操作, 等待获取光标索引, 执行插入文本
					const leftSplieStr = this.value.slice(0, this.cursorIndex)
					const rightSplieStr = this.value.slice(this.cursorIndex)
					this.value = `${leftSplieStr}${test}${rightSplieStr}`
					this.isfocus = true
				}, 10)
			},
			getValue(e) {
				// 获取当前光标索引, 当前函数在光标失去焦点时触发.
				this.cursorIndex = e.detail.cursor
			},
			headleInput (event) {
				// 处理value值的延迟问题, 当value经过该函数时, 更新value值
				const {value, cursor, keyCode} =event.detail
				this.value = value
			}
		}
	}
</script>

<style>
	.container,
	page {
		height: 100%;
		position: relative;
	}
	textarea {
		/* 使用绝对定位拉扯尺寸, 保持剩余页面尺寸 */
		position: absolute;
		height: auto;
		width: auto;
		top: 66px;
		right: 0;
		left: 0;
		bottom: 0;
	}
	.header {
		padding-top: 10px;
		padding-bottom: 10px;
		display: flex;
	}
</style>
