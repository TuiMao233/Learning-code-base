# mpVue 简介

mpVue (Vue in Mini Program) 美团工程师推出的基于Vue.js封装的用于开发小程序的框架，融合了原生小程序和Vue.js的特点，可完全组件化开发

## mpVue特点

组件化开发、完整Vue.js的开发体验、可使用Vue第三方扩展插件、Webpack构建项目、最终H5转换工具将项目编译成小程序识别的文件

# mpVue 项目构建

## 初始化项目

~~~
1.npm install vue-cli -g   下载vue脚手架
2.vue init mpvue/mpvue-quickstart my-project  初始化项目
3.cd my-project  进入项目根目录
4.npm install  根据package.json安装项目依赖包
5.npm start || npm run dev  启动初始化项目
~~~

## 小程序注册

~~~
1.src/app.json   全局配置文件
2.src/App.vue   等同于小程序中的app.js, 可写小程序应用实例的声明周期	  函数 || 全局样式
3.main.js应用入口文件, 声明组件类型，挂载组件
~~~

## 入口main.js

~~~js
import Vue from 'vue'
import App from './App.vue'
// Vue.config.productionTip = false 默认为false，用于启动项目的时候提示信息，设置为false关闭提示
Vue.config.productionTip = true
// 这个值是为了与小程序页面组件所区分开来，因为小程序页面组件和这个App.vue组件的写法和引入方式是一致的，为了区分两者，需要设置mpType值
App.mpType = 'app'
// 生成Vue实例
const app = new Vue(App)
// 挂载组件
app.$mount()
~~~

## 页面文件类型

~~~
1.	index.vue		等同于原生中的wxml + wxss + js
2.	main.js			当前组件页面的入口文件，用于生成当前组件实例，并挂载组件
3.	main.json		当前页面的局部配置文件(注意：index.vue组件最终会被转化为main.wxml以及main.wxss文件, 所以当前的json文件需命名main)
~~~

## src源文件

<img src="D:\web学习库\0.笔记目录\img\mpVue\图片1.png" alt="图片1" style="zoom:80%;" />

## 打包后的dist文件

<img src="D:\web学习库\0.笔记目录\img\mpVue\图片2.png" alt="图片2" style="zoom: 67%;" />

## 定义页面流程

`src/pages/index/index.vue`

~~~html
<template>
  <div></div>
</template>
<script>
export default {}
</script>
<style>
</style>
~~~

`src/pages/index/main.js`

~~~js
import Vue from 'vue'
import Index from './index.vue'

const index = new Vue(Index)
// 挂载当前页面
index.$mount()
~~~

**重新编译打包：**`npm start`

# mpVue 生命周期

**注意事项：**除了 Vue 本身的生命周期外，mpvue 还兼容了小程序生命周期，这部分生命周期钩子的来源于[微信小程序的 Page](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/page.html)， 除特殊情况外，不建议使用小程序的生命周期钩子。

## Vue

~~~
1. beforeCreate 实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

2. created  实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

3. beforeMount  在挂载开始之前被调用：相关的 render 函数首次被调用。

4. mounted  el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。

5. beforeUpdate  数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

6. updated  由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

7. beforeDestroy  实例销毁之前调用。在这一步，实例仍然完全可用。

8.destroyed  Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
~~~

## 小程序

~~~
1.  onLaunch: 小程序应用初始化
2.  onShow: 小程序启动获取后台进入前台
3.  onHide: 小程序应用从前台进入后台

1. onLoad 监听页面加载
2. onShow: 页面显示
3. onReady: 监听页面初始化渲染完成
4. onHide: 监听页面隐藏，注意当前页面实例依然存活
5. onUnload: 监听页面卸载
6. onPullDownRefresh: 监听用户下载动作
7. onReachBottom: 监听用户上拉触底操作
8. onShareAppMessage: 用户点击右上角分享功能
9. onPageScroll: 页面滚动
10. onTabItemTap： 当前是 tab 页时，点击 tab 时触发
~~~

# 挂载 Vuex 状态管理

~~~js
import Vue from 'vue'
import App from './app.vue'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'  

// Vue原型上挂载store
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
~~~

###### ###

# 实例对象中获取路由传参

~~~js
beforeMount () {
  const {query} = this.$root.$mp
}
~~~

###### ###

# fly.js 请求访问api封装

**安装：**`cnpm i flyio --save`

`/src/api/ajax.js`

~~~js
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly
export const get = (url, params = {}) => (
    new Promise((resolve, reject) => {
        fly.get(url, { params })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
)
export const post = (url, data = {}) => (
    new Promise((resolve, reject) => {
        fly.post(url, data)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
)
~~~

`src/api/index.js`

~~~js
import { get } from "./ajax";
// 获取电影列表
export const reqSubjects = () => get('http://t.yushu.im/v2/movie/top250')
~~~

###### ###

# 原生小程序 VS mpvue 对比总结

~~~
1)原生小程序运行更稳定些, 兼容性好，mpvue可能在某些方面存在兼容性问题(vue-router)
2)mpvue支持vue组件化开发. 效率更高，功能更强大(双向数据绑定, vuex)
3)mpvue可基于webpack组件化, 工程化开发
4)原生不支持npm安装包，不支持css预处理
5)支持 computed 计算属性和 watcher 监听器；模板语法中只支持简单的 js 表达式。可以直接写 div 、span 等标签 
6)之前会vue的工程师上手mpvue框架的成本较低
~~~

