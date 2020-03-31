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

![批注](D:\web学习库\0.笔记目录\img\Vue web App\批注.png)

## 前端路由

![批注2](D:\web学习库\0.笔记目录\img\Vue web App\批注2.png)

##  API 接口

![批注3](D:\web学习库\0.笔记目录\img\Vue web App\批注3.png)

## 项目 vue 组件

![批注4](D:\web学习库\0.笔记目录\img\Vue web App\批注4.png)

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

