# uni-app 简介

`uni-app` 是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。

## 跨平台的多种解决方式

语言层面编译转换一下，编译成C语言或者字节码之类的，能够运行在不同的设备上面，但是这个语言转换过程很复杂，而且还需要做移植的工作。比如著名的：swiftUI，kotlin-native就是这类型的跨平台框架。

自带渲染引擎，不依赖于任何平台，一套代码就可以自动编译成多个平台的应用程序。比如：Flutter

中转类型的框架，使用JS衔接原生平台的一些功能，要么由社区开发者自己维护一套扩展兼容库，要么本身带有一系列的兼容库，这类型的框架有：React Native，Weex，当然也包括楼主提出的5+app以及uni-app。

## uni和小程序对比

~~~markdown
# 小程序的每个页面的json配置文件都是单独的
-	pages/index/index.js
-	pages/index/index.wxml
-	pages/index/index.wxss
-	pages/index/index.json
# uni中每个页面都由Vue架构的文件组成, 且配置文件统一在根路径pages.json中集中管理
-	pages/index/index.vue
-	pages.json

# uniapp中, wx对象与uni对象功能基本一致, 官方推荐使用uni
wx.showToast...
uni.showToast...

# uniapp中, 基本配置了市面上的流行的css预编辑器, 只需按照插件即可开箱使用
<style lang="less"></style>
<style lang="stylus"></style>
<style lang="scss"></style>

# uniapp有丰富的插件市场, 里面有组件, API各种方便开发的插件, 点击安装即可使用
https://ext.dcloud.net.cn/
~~~



