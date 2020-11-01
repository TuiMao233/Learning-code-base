---
title: JavaScript 模块化应用
date: 2020-11-01
categories:
  - 
tags: 
  - javascript
---
## 模块化进化史

### 随心所欲函数模式

~~~javascript
//操作数据的函数
function foo() { console.log()}
function bar() {console.log()}
~~~

**全局函数模式:** 将不同的功能封装成不同的全局函数
**问题:** `Global`被污染了, 很容易引起命名冲突

### namespace模式

~~~javascript
let myModule = {
  data: 'atguigu.com',
  foo() {},
  bar() {}
}
D:\software\nodejs\node_global
~~~

**namespace模式:** 简单对象封装
**作用:** 减少了全局变量
**问题:** 不安全

### IIFE模式模块化

**IIFE模式：**匿名函数自调用(闭包)
**IIFE：** `immediately-invoked function expression`(立即调用函数表达式)
**作用：**数据是私有的, 外部只能通过暴露的方法操作
**问题：**如果当前这个模块依赖另一个模块怎么办?

**定义模块**

~~~javascript
(function (window) { // 没有依赖的模块
  //数据
  let data = 'atguigu.com'
  //操作数据的函数
  function foo() {}
  //暴露行为
  window.myModule = {foo, bar}
})(window)
~~~

~~~javascript
(function (window, myModule) { // 有依赖的模块
  //数据
  let data = 'atguigu.com'
  //操作数据的函数
  function foo() {myModule.foo()}
})(window, myModule)
~~~

**引入模块**

~~~html
<script type="text/javascript" src="module1.js"></script>
<script type="text/javascript" src="module2.js"></script>
<script type="text/javascript" src="module3.js"></script>
<script type="text/javascript" src="module4.js"></script>
~~~

一个页面需要引入多个js文件将导致请求过多，依赖模糊，难以维护
这些问题可以通过现代模块化编码和项目构建来解决

### Node.js模块化（仅支持后台）

**模块化编码**

~~~javascript
// module1.js
module.exports = {foo() {}}
// module2.js
module.exports = {foo() {}}
// module3.js
module.exports = {foo() {}}

// app.js
let module1 = require('./modules/module1')
let module2 = require('./modules/module2')
let module3 = require('./modules/module3')
module1.foo()
module2()
module3.foo()
module3.bar()
~~~

## Browserify模块化

### 创建项目结构

~~~javascript
  |-js
    |-dist //打包生成文件的目录
    |-src //源码所在的目录
      |-module1.js
      |-module2.js
      |-module3.js
      |-app.js //应用主源文件
  |-index.html
  |-package.json
    {
      "name": "browserify-test",
      "version": "1.0.0"
    }
~~~

**下载browserify（两个都要安装）**
**全局:** `npm install browserify -g`
**局部:** `npm install browserify --save-dev`

**下载uniq**
`npm install uniq --save-dev`

### 定义模块代码

~~~javascript
// module1.js
module.exports = {foo() {}}
// module2.js
module.exports = {foo() {}}
// module3.js
module.exports = {foo() {}}
~~~

### 引入模块代码

~~~javascript
//引用文件模块
let module1 = require('./module1')
let module2 = require('./module2')
let module3 = require('./module3')
// 引入uniq模块
let uniq = require('uniq')
~~~

### 打包处理js

`browserify main.js -o bundle.js`

### 页面使用引入

~~~html
<script type="text/javascript" src="js/dist/bundle.js"></script> 
~~~

## AMD-RequireJS模块化

### 创建项目结构

~~~javascript
  |-src
    |-libs
      |-require.js
    |-modules
      |-alerter.js 			// 定义有依赖的模块
      |-dataService.js	// 定义没有依赖的模块
    |-main.js
  |-index.html
~~~

### 定义没有依赖的模块

~~~javascript
// dataService.js
define(function(){ // 定义有依赖的模块
	var data = 'dataService'
	var getName = () =>{return data}
	return {getName} // 暴露模块
})
~~~

### 定义有依赖的模块

~~~javascript
// alerter.js
define(['dataService'],function(dataService){ // 定义有依赖的模块
	var data = 'alerter'
	var getToName = () =>{return data + dataService.getName()}
	return {getToName} // 暴露模块
})
~~~

### 定义接口模块

~~~javascript
// main.js
require.config({ // 配置接口
	baseUrl: 'src/',// 从页面根目录开始找起的模块根路径
	// 如果不添加baseUrl,那么模块将从接口函数文件夹找起
	paths: { // 模块位置
		'alerter': 'modules/alerter',
		'dataService': 'modules/dataService'
	},
})
require(['alerter'], function(alerter) { // 引入模块 
	console.log(alerter.getToName())
})
~~~

### 页面进行引入

`data-main`是接口模块的位置，`src/lib/require.js`是`require`模块的支持库

~~~html
<script data-main="src/main.js" src="src/lib/require.js"></script>
~~~

### 引入第三方库

~~~javascript
require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'lib/jquery-1.10.1',
    'angular': 'lib/angular'
	},
  // 注意，有的插件不支持AMD，需要在shim里面配置
  shim: {
    angular: {
        exports: 'angular'
      }
  }
})
require(['jquery'], function(alerter,$) { // 引入jquery模块 
	$('body').css('background','red')
})
~~~

## ES6_Babel_Browserify模块化

### 初始化本地文件

~~~javascript
// package.json
{ "name" : "es6-babel-browserify",
  "version" : "1.0.0"}
~~~

**安装`babel-cli, babel-preset-es2015`和`browserify`**
`npm install babel-cli browserify -g`
`npm install babel-preset-es2015 --save-dev `

**定义项目根目录`.babelrc`文件**

~~~javascript
// .balelrc
{"presets":["es2015"]}
~~~

### 定义模块

~~~javascript
// module1.js
export function fun1() {console.log('fun1')}
export function fun2() {console.log('fun2')}
// module2.js
let data = 'foo'
export function foo() {console.log(data)}
export let arr = [0,1,2,3]
// module3.js
export default { // 当需要暴露的是一个对象时，需要在export后面加上default
	name: '卢旺达',
	getName () {console.log(this.name)}
}
~~~

### 引入模块

~~~javascript
import {fun1,fun2} from 'commt/module1'
import {foo,arr} from 'commt/module2'
import module3 from 'commt/module3'
fun1();fun2();
console.log(arr)
console.log(module3)
// import * as obj from './....' 将./....的所有内容赋值给obj
~~~

[^注意]:export 常规暴露，只能用解析赋值来提取引入模块的暴露方法/属性，export default 默认暴露可以暴露任意单个数据类型

### 进行编译

使用`Babel`将`ES6`编译为`ES5`代码(但包含`CommonJS`语法) : `babel 编译目录 -d 输出目录/build.js`
使用`Browserify`编译为`js`： `browserify 编译接口模块js -o 输出目录/bundle.js`

[^注意]:使用Browserify编译时，必须要先创建输出目录

### 页面引入

~~~html
<script src="dist/bundle.js"></script>
~~~

### 第三方扩展引入

~~~javascript
import $ from 'jquery' // 要放在前面
~~~

