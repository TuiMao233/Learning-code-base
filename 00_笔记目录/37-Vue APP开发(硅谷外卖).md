# 项目描述

~~~
1) 此项目为外卖 Web App (SPA)
2) 包括商家, 商品, 购物车, 用户等多个子模块
3) 使用 Vue 全家桶+ES6+Webpack 等前端最新最热的技术
4) 采用模块化、组件化、工程化的模式开发
~~~

## 项目功能界面

##### ###

## 技术选型

![批注](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Vue web App/批注.png?raw=true)

## 前端路由

![批注2](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Vue web App/批注2.png?raw=true)

##  API 接口

![批注3]( https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Vue web App/批注3.png?raw=true)

## 项目 vue 组件

![批注4]( https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Vue web App/批注4.png?raw=true)

## 流程及开发方法

~~~
1) 熟悉一个项目的开发流程
2) 组件化、模块化、工程化的开发模式
3) 使用 vue-cli 脚手架初始化 Vue.js 项目
4) 模拟 json 后端数据，实现前后端分离开发
5) ES6+eslint 的开发方式
6) 项目优化
~~~

## Vue 插件或第三方库

~~~
1) 使用 vue-router 开发单页应用
2) 使用 axios/vue-resource 与后端进行数据交互
3) 使用 vuex 管理应用组件状态
4) 使用 better-scroll/vue-scroller 实现页面滑动效果
5) 使用 mint-ui 组件库构建界面
6) 使用 vue-lazyload 实现图片惰加载
7) 使用 mockjs 模拟后台数据接口
~~~

## 样式/布局/效果相关

~~~
1) 使用 stylus 编写模块化的 CSS
2) 使用 Vue.js 的过渡编写酷炫的交互动画
3) 制作并使用图标字体
4) 解决移动端 1px 边框问题
5) 移动端经典的 css sticky footer 布局
6) flex 弹性布局
~~~

## vue-cli 搭建项目

~~~
npm install -g vue-cli
vue init webpack gshop
cd gshop
npm install
npm run dev 访问: localhost:8080
~~~

## vue-cli eslint 配置

`.eslintrc.js/rules`

~~~js
'quotes':'off', // import后不能有分号
'eol-last': 'off', // 代码最后得有空格
'no-trailing-spaces': 'off',	// 不允许有多余空格 
'vue/Fvalid-template-root': 'off', // template 不能为空
'no-tabs': 'off', // 不允许出现制表符(tab空格)
'linebreak-style': 'off', // 不是期待的换行符
'comma-dangle': ["error", "never"], // 数组/对象最后一项不能有逗号
'func-call-spacing': 'off', // 函数调用间距
'space-before-function-paren': 'off', // 函数括号前得有空格
'handle-callback-err': 'off', // axios错误函数会显示语法错误
'no-undef': 'off', // 不许有undef
'no-unused-vars': 'off', // 禁止使用未使用的变量
'indent': 'off', // 轨道缩进
'semi': 'off', // 引入与调用方法缺少分号
// don't require .vue extension when importing
'import/newline-after-import':'off', 
~~~

## 项目结构分析

~~~
gshop
|-- build : webpack 相关的配置文件夹(基本不需要修改)
|-- config: webpack 相关的配置文件夹(基本不需要修改)
  |-- index.js: 指定的后台服务的端口号和静态资源文件夹
|-- node_modules
|-- src : 源码文件夹
  |-- main.js: 应用入口 js
|-- static: 静态资源文件夹
|-- .babelrc: babel 的配置文件
|-- .editorconfig: 通过编辑器的编码/格式进行一定的配置
|-- .eslintignore: eslint 检查忽略的配置
|-- .eslintrc.js: eslint 检查的配置
|-- .gitignore: git 版本管制忽略的配置
|-- index.html: 主页面文件
|-- package.json: 应用包配置文件
|-- README.md: 应用描述说明的 readme 文件
~~~

# Vue-cli 常见问题&技巧

## 解决跨域问题

`/config/index.js`

~~~json
// module.exports={proxyTable:{}}
proxyTable: {
  '/api': { // 匹配所有以 '/api' 开头的请求路径
    target: 'http://localhost:4000', // 代理后台的基础路径
    changeOrigin: true, // 支持跨域 
    pathRewrite: { '^/api': '' }// 重写路径: 去掉路径中开头的'/api'
  }
}
// app.vue
axios('http://localhost:4000/api')
~~~

## class可以与串拼接

~~~vue
<div :class="'666'+count"></div>
~~~

## 监视数据并更新标签的回调

~~~js
watch: {
  myCount(value) {
    this.$nextTick(()=>{
    // 当数据改变导致更新界面时执行
  	})
  }
}
~~~

## 数据更新通知界面

~~~js
this.getShopGoods(()=>{ // action
  this.$nextTick(()=>{
    	// 数据更新完毕
  })
})
~~~

~~~js
// action 
getShopGoods({ commit },cb) {
  // 更新数据....
  cb && cb()
}
~~~

## methods定义初始化函数前缀加_

methods在Vue中，通常用来存放dom调用的方法, 当需要定义初始化方法时，在方法前缀加上_符号，可以更好的区分方法

~~~js
methods: {
  _initScroll () {...},
  goTo(path){...}
}
~~~

## 数据绑定对象添加新属性无数据绑定

~~~vue
<template>
<!--无数据绑定, 不会更新界面-->
<div v-if="shop.count">{{shop.count}}</div>
</template>
<script>
export default {
  data: ()=> ({ shop: {} }),
  mounted(){
    this.shop.count = 6 // 添加新属性
  }
}
</script>
~~~

**利用Vue.set方法解决问题**

~~~vue
<template>
<!--set方法会绑定相应的数据, 这里会更新界面-->
<div v-if="shop.count">{{shop.count}}</div>
</template>
<script>
import Vue from 'vue'
export default {
  data: ()=> ({ shop: {} }),
  mounted(){
    Vue.set(this.shop, 'count', 6)
  }
}
</script>
~~~

## 父组件调用子组件方法

**子组件A.vue: 定义方法**

~~~vue
<script>
export default {
  methods: {add(){}}
}
</script>
~~~

**父组件B.vue: 使用方法**

~~~vue
<template>
<A ref="A"></A>
</template>
<script>
import A from './A.vue'
export default {
  mounted() {
    this.$refs.A.add()
  }
}
</script>
~~~

## 路由link可指定生成标签名称

~~~html
<router-link tag="li"><!-- 生成li的路由点击跳转 --></router-link>
~~~

## 路由可指定占位符值

~~~html
<router-link to="{path:'/login',query:{id:666}}"></router-link>
<!-- 以上代码等同于 -->
<router-link to="'/login/id=666'"></router-link>
~~~

## router-link 默认是push跳转

~~~html
<!-- 如果需要replace跳转, 在标签内加入replace属性 -->
<router-link to='/login' replace></router-link>
~~~

# mint-ui的基本使用

`cnpm install --save mint-ui`

## 按需加载

`cnpm install --save-dev babel-plugin-component`

**修改 babel 配置**

~~~js
"plugins": ["transform-runtime",["component", [
{
	"libraryName": "mint-ui",
	"style": true
}
]]]
~~~

`mint-ui` 组件分类为**标签组件**与**非标签组件**

## 使用 mint-ui 的组件

~~~vue
<template>
	<mt-button >退出登陆</mt-button>
</template>
<script>
  import Vue from 'vue'
  import {Button} from 'mint-ui'
  
	Vue.component(Button.name, Button)
</script>
~~~

## 提示框

~~~js
MessageBox({ 
  title: "错误提示", 
  message: "手机格式错误",
	showCancelButton: true, // 是否显示确定按钮
  showCancelButton: true  // 是否显示取消按钮
});
~~~

# 模拟(mock)数据/接口

**`Mockjs`**：用来拦截 ajax 请求, 生成随机数据返回。后台向前台提供 API 接口, 只负责数据的提供和计算，而完全不处理展现，前台通过 Http(Ajax)请求获取数据, 在浏览器端动态构建界面显示数据。http://mockjs.com/

**示例代码：**http://mockjs.com/examples.html

`cnpm install mockjs --save`

## 定义数据

~~~js
// src/mock/data.json
{
  seller: {...},
  goods: [...],
  ratings: [...]
}
~~~

## 设置模拟接口

~~~js
// src/mock/mockServer.js
import Mock from 'mockjs'
import apiData from './data.json'
// Mock.mock('拦截地址', 返回数据)
Mock.mock('/seller', {code:0, data:apiData.seller})
Mock.mock('/goods', {code:0, data:apiData.goods})
Mock.mock('/ratings', {code:0, data:apiData.ratings})
~~~

## 访问接口

~~~js
export const reqShopMsg = () => get(`http://localhost:8080/shop_msg`)
export const reqShopGoods = () => get(`http://localhost:8080/shop_goods`)
export const reqShopAssess = () => get(`http://localhost:8080/shop_assess`)
~~~

# 实现滑动(better-scroll)

`npm install @better-scroll/core@next --save`

~~~js
import BScroll from '@better-scroll/core'
const scroll = new BScroll('.www')
scroll.refresh() // 重新计算高度 

const scroll = new BScroll('.www', {scrollX:true})
~~~

~~~html
<div class="www">
  <div class="content"></div>
</div>
~~~

## better-scroll进行简易封装成Vue组件

`@better-scroll-vue/index.vue`

### template

~~~html
<template>
  <div ref="wrapper">
    <slot><!-- 为父组件提供插槽 --></slot>
  </div>
</template>
~~~

### script

~~~js
import BScroll from "@better-scroll/core";
export default {
  // 需要引入哪些better-scroll配置选项
  props: ["click", "scrollX", "scrollY"],
  data: () => ({
    options: { // 默认BScroll配置
    }
  }),
  mounted() { // 初始化执行
    this._initOptions()
    this._initScroll();
  },
  updated() { // 当数据更新时重计算滑动值
    this.scroll.refresh();
  },
  methods: {
    _initScroll() { // 初始化滚动条
      const { options } = this;
      const { wrapper } = this.$refs;
      if (!this.scroll) {
        // 没有初始化滚动条时执行(一次性代码)
        this.$nextTick(() => {
          this.scroll = new BScroll(wrapper, options);
        });
      }
    },
    _initOptions() { // 初始化props覆盖data中的配置
      const _propsKey = Object.keys(this._props);
      // 筛选值不为空的prop
      const props = _propsKey.reduce((total, key) => {
        if (this._props[key]) {
          total[key] = this._props[key];
        };return total;
      }, {});
      this.options = { ...this.options, ...props };
    }
  }
};
~~~

### 父组件中使用

**注意：**要满足滚动条件，必须有个高或者宽的固定区和溢出的区域。

~~~vue
<template>
  <BScroll :click="true">
    <!-- 固定高宽区 -->
  	<div class="content">
  	<!-- 内容区(溢出区) -->
  	</div>
  </BScroll>
</template>
<script>
import BScroll from './@better-scroll-vue'
export default {
  components: {BScroll} // 映射为组件
}
</script>
~~~

### 如果无法滚动

不能滚动是现象，我们得搞清楚这其中的根本原因。在这之前，我们先来看一下浏览器的滚动原理： 浏览器的滚动条大家都会遇到，当页面内容的高度超过视口高度的时候，会出现纵向滚动条；当页面内容的宽度超过视口宽度的时候，会出现横向滚动条。也就是当我们的视口展示不下内容的时候，会通过滚动条的方式让用户滚动屏幕看到剩余的内容。

[^注意]: 文档参考官方介绍

![](https://raw.githubusercontent.com/ustbhuangyi/better-scroll/master/packages/vuepress-docs/docs/.vuepress/public/assets/images/schematic.png?raw=true)

# 实现组件懒加载

~~~js
// 在引入vue组件时, 使用函数包装import 组件的返回值
// 这样就不会立即加载组件, vue会在特定实机执行函数获取组件
import Msite from './pages/Msite/Msite'
import Order from './pages/order/order'
// ↓↓↓↓↓↓↓
const Msite = () => import('./pages/Msite/Msite')
const Order = () => import('./pages/Order/Order')
~~~

## 实现图片懒加载

https://github.com/hilongjw/vue-lazyload

**安装：**`cnpm i vue-lazyload --save`

### 配置入口(src/main.js)

~~~js
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预先加载??(可选)
  error: 'dist/error.png?raw=true', // 加载错误图片(可选)
  loading: 'dist/loading.gif',	// 加载中图片(可选)
  attempt: 1 // ??(可选)
})
~~~

## 组件中使用

~~~vue
<template>
	<img v-lazy="./img/a.jpg?raw=true"/>
</template>
<script>
</script>
~~~

# Vue 自定义字符串过滤器

## 实现时间戳指定特定格式

`src/fiters/index.js`

~~~js
// 引入js时间格式库
// 返回经过时间库改造的字符串

import Vue from 'vue';
// 问题:moment库过大, 会占用大量资源
import moment from 'moment';
Vue.filter('date-format', (value, format_str='YYY-MM-DD HH:mm:ss')=>{
    return moment(value).format(format_str)
})

// 使用date-fns进行按需加载
import format from 'date-fns/format'
Vue.filter('date-format', (value, format_str='YYY-MM-DD HH:mm:ss')=>{
    return format(value, format_str)
})
~~~

## 加载过滤器

`src/main.js`

~~~js
import 'fiters'
~~~

## 大括号表达式中使用

~~~vue
<div>
  {{1513132015 | date-format}}
</div>
~~~

# Vue 进行打包状态可视化

**启动打包状态可视化：**`npm run build --report`
**启动打包：**`npm run build`

![批注5]( https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Vue web App/批注5.png?raw=true)

###### ###