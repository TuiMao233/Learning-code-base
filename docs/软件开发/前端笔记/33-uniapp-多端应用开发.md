---
title: uniapp 多端应用开发
date: 2020-11-01
categories:
  - 前端学习笔记
tags: 
  - uniapp
---
## uni-app 简介

`uni-app` 是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。

### 跨平台的多种解决方式

语言层面编译转换一下，编译成C语言或者字节码之类的，能够运行在不同的设备上面，但是这个语言转换过程很复杂，而且还需要做移植的工作。比如著名的：swiftUI，kotlin-native就是这类型的跨平台框架。

自带渲染引擎，不依赖于任何平台，一套代码就可以自动编译成多个平台的应用程序。比如：Flutter

中转类型的框架，使用JS衔接原生平台的一些功能，要么由社区开发者自己维护一套扩展兼容库，要么本身带有一系列的兼容库，这类型的框架有：React Native，Weex，当然也包括楼主提出的5+app以及uni-app。

### uni和小程序对比

~~~markdown
## 小程序的每个页面的json配置文件都是单独的
-	pages/index/index.js
-	pages/index/index.wxml
-	pages/index/index.wxss
-	pages/index/index.json
## uni中每个页面都由Vue架构的文件组成, 且配置文件统一在根路径pages.json中集中管理
-	pages/index/index.vue
-	pages.json

## uniapp中, wx对象与uni对象功能基本一致, 官方推荐使用uni
wx.showToast...
uni.showToast...

## uniapp中, 基本配置了市面上的流行的css预编辑器, 只需按照插件即可开箱使用
<style lang="less"></style>
<style lang="stylus"></style>
<style lang="scss"></style>

## uniapp有丰富的插件市场, 里面有组件, API各种方便开发的插件, 点击安装即可使用
https://ext.dcloud.net.cn/
~~~

### vscode 中使用

uni-app 是一个用 vue 语法来开发小程序、App、H5 的框架，其官方推荐的开发工具为 HBuilderX，使用起来有很好的开发体验。

不过，由于 HBuilderX 没有 Linux 版以及很多前端之前已经习惯了 vscode，不想更换编辑器。直接使用 vscode 开发 uni-app，其体验很好。

~~~makefile
## 拷贝项目模板
vue create -p dcloudio/uni-preset-vue my-project

#↓↓↓↓↓↓#
Preset options:
? 请选择 uni-app 模板  
  默认模板
> 默认模板(TypeScript) 
  Hello uni-app        
  登录模板
  看图模板
  新闻/资讯类模板      
  自定义模板
~~~

## uni-app 常见问题

### 使用mp-echarts

#### 更改 mpvue-echarts.vue 组件

~~~html
<template>
	<canvas v-if="canvasId" class="ec-canvas" :id="canvasId" :canvasId="canvasId" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="error"></canvas>
</template>

<script>
import WxCanvas from './wx-canvas';
export default {
	props: {
		canvasId: {
			type: String,
			default: 'ec-canvas'
		},
		lazyLoad: {
			type: Boolean,
			default: false
		},
		disableTouch: {
			type: Boolean,
			default: false
		},
		throttleTouch: {
			type: Boolean,
			default: false
		}
	},
	// #ifdef H5
	mounted() {
		if (!this.lazyLoad) this.init();
	},
	// #endif
	// #ifndef H5
	onReady() {
		if (!this.lazyLoad) this.init();
	},
	// #endif
	methods: {
		setChart(chart){
			this.chart = chart
		},
		init() {
			const { canvasId } = this;
			this.ctx = wx.createCanvasContext(canvasId, this);
			this.canvas = new WxCanvas(this.ctx, canvasId);
			const query = wx.createSelectorQuery().in(this);
			query
				.select(`#${canvasId}`)
				.boundingClientRect(res => {
					if (!res) {
						setTimeout(() => this.init(), 50);
						return;
					}
					this.$emit('onInit', {
						width: res.width,
						height: res.height
					});
				})
				.exec();
		},
		canvasToTempFilePath(opt) {
			const { canvasId } = this;
			this.ctx.draw(true, () => {
				wx.canvasToTempFilePath({
					canvasId,
					...opt
				});
			});
		},
		touchStart(e) {
			const { disableTouch, chart } = this;
			if (disableTouch || !chart || !e.mp.touches.length) return;
			const touch = e.mp.touches[0];
			chart._zr.handler.dispatch('mousedown', {
				zrX: touch.x,
				zrY: touch.y
			});
			chart._zr.handler.dispatch('mousemove', {
				zrX: touch.x,
				zrY: touch.y
			});
		},
		touchMove(e) {
			const { disableTouch, throttleTouch, chart, lastMoveTime } = this;
			if (disableTouch || !chart || !e.mp.touches.length) return;
			if (throttleTouch) {
				const currMoveTime = Date.now();
				if (currMoveTime - lastMoveTime < 240) return;
				this.lastMoveTime = currMoveTime;
			}
			const touch = e.mp.touches[0];
			chart._zr.handler.dispatch('mousemove', {
				zrX: touch.x,
				zrY: touch.y
			});
		},
		touchEnd(e) {
			const { disableTouch, chart } = this;
			if (disableTouch || !chart) return;
			const touch = e.mp.changedTouches ? e.mp.changedTouches[0] : {};
			chart._zr.handler.dispatch('mouseup', {
				zrX: touch.x,
				zrY: touch.y
			});
			chart._zr.handler.dispatch('click', {
				zrX: touch.x,
				zrY: touch.y
			});
		}
	}
};
</script>

<style scoped>
.ec-canvas {
	width: 100%;
	height: 100%;
	flex: 1;
}
</style>
~~~

#### 在页面中使用

~~~html
<template>
	<mpvue-echarts @onInit="initChart" canvasId="demo-canvas" ref="lineChart" />
</template>
<script>
// 引入定制echarts
import echarts from "echarts/dist/diy_echarts";
// 引入mpvue-echarts
import mpvueEcharts from "mpvue-echarts";
// 设置默认数据
let series = [
  {
    name: "成交订单",
    type: "line",
    data: [],
    symbolSize: 8,
    itemStyle: { borderWidth: 2 },
  },
  {
    name: "新增收购",
    type: "line",
    data: [],
    symbolSize: 8,
    itemStyle: { borderWidth: 2 },
  },
];
let xAxisData = [];
export default {
    components: { mpvueEcharts },
    methods: {
        // 初始化图形
        initChart(e) {
            const { width, height } = e;
            const canvas = this.$refs.lineChart.canvas;
            echarts.setCanvasCreator(() => canvas);
            const lineChart = echarts.init(canvas, null, {
				width: width,
        		 height: height,
      		});
            canvas.setChart(lineChart);
            lineChart.setOption({
                color: ["#d34632", "#29a2f2"],
                seriesCnt: 2,
                // 标题配置
                title: {
                  textStyle: {
                    color: "#333333",
                    fontWeight: "bold",
                  },
                  text: "数据分析",
                  left: "center",
                },
                // 图例配置
                legend: {
                  type: "plain",
                  bottom: "10%",
                },
                // 网格配置
                grid: { containLabel: true },
                // 提示框组件
                tooltip: { trigger: "axis" },

                // x轴配置
                xAxis: {
                  type: "category",
                  boundaryGap: false,
                  data: xAxisData,
                  axisLine: {
                    lineStyle: {
                      color: "#999",
                    },
                  },
                  // show: false
                },
                // y轴配置
                yAxis: {
                  // 分割线配置
                  splitLine: { lineStyle: { type: "dashed" } },
                  axisLine: {
                    lineStyle: { color: "#999" },
                  },
                },
                // 线条数据
                series,
              });
              this.$refs.lineChart.setChart(lineChart, true);
        	}
    }
}
</script>
~~~

#### 重新渲染数据

当数据改变时，改变 series 与 xAxisData 数据后，调用方法重新渲染。

~~~html
<template>
	<mpvue-echarts @onInit="initChart" canvasId="demo-canvas" ref="lineChart" />
</template>
<script>
import echarts from "echarts/dist/diy_echarts";
import mpvueEcharts from "mpvue-echarts";
let series = [/*....*/];
let xAxisData = [/*....*/];
export default {
    components: { mpvueEcharts },
    methods: {
        initChart() { /*....*/ }
		getData () {
             // 获取数据操作....
    		series = [/*....*/];
    		xAxisData = [/*....*/];
    		// 图形重新渲染
    		this.$refs.lineChart.init();
        }
    }
}
</script>
~~~

### 配置代码检测

~~~makefile
yarn add eslint eslint-plugin-prettier @vue/cli-plugin-eslint eslint-plugin-vue prettier -D

yarn add @vue/eslint-config-prettier @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser -D

~~~

### socket 链接流程

~~~js
  socket: function () {
    wx.connectSocket({
      url: 'wss://baoyuan.wsandos.com:7272',
      success:function(e){
        console.log(e);return false;
      }
    });
    wx.onSocketMessage(function (res) {    //接收服务端消息
      var data = JSON.parse(res.data);
      if(data.type == 'init'){    //登录事件，向后台发送client_id绑定用户id
        wx.request({
          url: baseUrl + '/Socket/bindUid',    //baseUrl:https://baoyuan.wsandos.com
          data: {
            client_id: data.client_id
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function (res) {
            console.log(res.data);
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      }else{
        console.log(data);
      }
    });
  },
~~~

### 解决多视频播放问题

根据点击后，传入组件 ID 值，通过上下文对象关闭this中储存的上一个上下文播放状态。

### 优化多 video 卡顿

将 video 替换为 image 标签，点击播放时，在替换为 viode