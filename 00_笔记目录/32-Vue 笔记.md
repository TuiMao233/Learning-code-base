# Vue 渐进式JavaScript框架

## vue的特点

遵循MVVM模式
编码简洁，体积小，运行效率高，适合移动/PC端开发
他本身只关注UI，可以轻松引入vue插件或其他库开发项目

## Vue 基本架构

动态的html页面，包含了一些JS语法代码，双括号表达式。指令（以V-开通的自定义标签属性）

~~~html
<div id="box">				<!-- v-model:双向数据绑定 -->
	<input type="text" v-model="message" />
	<p>		<!-- {{}}单向数据绑定 -->
	  Hello	{{message}}
	</p> 
</div>
<!-- 1.引入Vue.js -->
<script src='js/vue.js'></script>
<!-- 2.创建Vue对象 -->
<script>
	const vm = new Vue({
        el: '#box',
        data: {
            message: 'Hello Vue'
            // message为初始化数据，可在vue元素容器中使用
        }
    })
</script>
~~~

## Vue 开发者工具调试

安装扩展：`VueDevtools`

![TSGJ](.https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/vue/TSGJ.jpg?raw=true)

## MVVM概念

```sequence
title:MVVM模型
Note left of View: DOM
View->DOM Listeners:访问监听器(get,set)
DOM Listeners->Model(obj):查找数据
note over DOM Listeners,Data Bindings:ViewModel
Model(obj)->Data Bindings:数据绑定调用
Data Bindings-->View:进行DOM绑定监听数据
```

**View：**视图，模板页面
**Model：**模型，数据对象(data)
**ViewModel：**视图模型(vue的实例)

# Vue 基础命令&对象

## Vue-html指令

1. `v-text`：更新元素的textContent
2. `v-html`：更新元素的innerHTML
3. `v-if`：如果为true, 当前标签才会输出到页面
4. `v-else`：如果为false, 当前标签才会输出到页面
5. `v-show`：通过控制display 样式来控制显示/隐藏
6. `v-for`：遍历数组/对象
7. `v-on`：绑定事件监听, 一般简写为@
8. `v-bind`：标签属性绑定解析表达式, 可以省略v-bind
9. `v-model`：双向数据绑定
10. `ref`：指定唯一标识, vue 对象通过$els 属性访问这个元素对象
11. `v-cloak`：防止闪现, 与css 配合: [v-cloak] { display: none }
12. `created()/mounted()`: 发送ajax请求, 启动定时器等异步任务
13. `beforeDestory()`: 做收尾工作, 如: 清除定时器

### 标签属性绑定数据(v-bind)

完整写法：`v-bind:xxx='yyy'` yyy会被作为表达式解析执行
简洁写法：`:xxx='yyy'`

~~~html
<div id="app">
	<img src="imgUrl" /><br />	        <!-- 报错 -->
	<img v-bind:src="imgUrl" /><br />		<!-- 显示 -->
	<img :src="imgUrl" />            		<!-- 显示 -->
</div> 
<script>
    ew Vue({
	el:"#app",
	data:{
		imgUrl:https://cn.vuejs.org/images/logo.png?raw=true  
	 }
})
</script>
~~~



### 标签绑定事件(v-on)

完整写法：`v-on:事件名='fun'` fun是Vue实例定义的方法
简洁写法：`@事件名='fun'`

~~~html
<div id="app">
	<button v-on:click="test">点击</button>
	<button @click="test('abc')">点击</button>
</div>
<script>
 new Vue({
	el:"#app",
	methods:{
		test(a) {
			a.isTrusted ? alert("我没传入形参啦") : alert(a);;
		}
	}
})
</script>
~~~



### 条件渲染样式

`v-if		v-else		v-show`

**比较v-if与v-show**
如果一些不怎么切换的地方用v-if 因为**隐藏的元素会直接去除**
如果需要频繁切换的使用v-show 因为**隐藏的元素会加上display: none;**而不是直接去除

~~~html
<style>
    .aClass{color:#0000FF;}
</style>
<div id="demo">
	<p v-if="bool">成功了</p>
	<p v-else>失败了</p>
    
    <!-- 或者是下面代码 -->
    <p v-show="bool">表白成功</p>
	<p v-show="!bool">表白失败</p>
	<button @click="bool=!bool">点击</button>
</div>
<script>
var vm =new Vue({
	el:'#demo',
	data:{
		bool:false
	}
})
</script>
~~~



### 类名绑定Vue数据(:class)

**解析表达式为字符串时，绑定对应的Vue数据。**

~~~html
<style>
    *{margin: 0;padding: 0;}
	.aClass{color: blue; }
	.cClass{color: red; }
</style>
<div id="demo">
	<p class="cClass" :class="text">xxx是字符串</p>
	<button @click="classEco">点击更改class</button>
</div>
<script>
var vm =new Vue({
	el:"#demo",
	data:{text:'aClass'},
    // 类名数据绑定aClass类名
	methods:{
		classEco(){this.text = 'bClass'}
        // 类名数据变为bClass类名
	}
})
</script>
~~~

**解析表达式为数组时，绑定数组元素对应的类名。**

~~~html
<style>
	.aClass{color: blue; }
	.bClass{background: red; }
</style>
<div id="demo">
		<p :class="['aClass','cClass']">xxx是数组</p>
</div>
~~~

**解析表达式为对象时，绑定表达式对象内 类名对应Vue数据。**

当对应Vue数据为true，表示显示该类名，false则删除该类名

~~~html
<style>
	.aClass{color: blue; }
	.bClass{color: red; }
	.cClass{font-size: 30px;line-height: 50px;}
</style>
<div id="demo">
	<p class="cClass" :class="{aClass:isA,bClass:isB}">xxx是对象</p>
</div>
<script>
var vm =new Vue({
	el:"#demo",
	data:{isA:true,isB:false},
	methods:{
		classEco(){this.isB=true;this.isA=false}
    }
})
</script>
~~~



### style标签属性绑定Vue数据(:style)

**解析表达式类型：**`对象，数组，Vue数据名`

数组和Vue数据名并不常用，所以只举一个对象的例子

**解析表达式为对象时，绑定表达式对象内 css属性名对应Vue数据**

~~~html
<div id="demo">
	<p :style="{color:ftCol,fontSize:ftSz +'px'}">style绑定</p>
	<button @click="classEco">点击更改style</button>
</div>
<script>
var vm =new Vue({
	el:"#demo",
	data:{ftCol:'red',ftSz:20},
	methods:{
		classEco(){this.ftCol='green';this.ftSz=60}
    }
})
</script>
~~~



### 标签列表渲染(v-for)

~~~html
<!--语法: v-for="(item , index) in Vue数组数据"-->
<p v-for="(item,index) in persons" :key="index">		
		{{index}}---{{item.name}}---{{item.age}}    
<p>
<script>
var vm = new Vue({
    el: '#demo',
    date: {
        persons: [
			{name: 'Tom', age:18},
			{name: 'Jack', age:17},
			{name: 'Bob', age:19},
			{name: 'Mary', age:16}
        ]
    }
})
</script>
~~~

如果执行v-for命令，需要添加一个`:key='xxx'`标签以便它能跟踪每个节点的身份，从而重用和重新排序现有元素。

因为它是 Vue 识别节点的一个通用机制，key 并不仅与 v-for 特别关联。
不能使用对象或数组之类的非基本类型值作为 v-for 的 key。要用不一样的字符串或数值类型的值。

#### 渲染列表增删改

~~~html
  <div id="demo">
  	<ul>
   		<li v-for="(p,index) in persons" :key="item.id" >
			{{index}}---{{p.name}}---{{p.age}}
			---<button @click="deletP(index)">删除</button>
			---<button @click="undataP(index,{name:'Cat',age:20})">更新</button>
   		</li>
  	</ul>
 	<button @click="">添加</button>
</div>
<script>
var vm = new Vue({
el: '#demo',
    data: {
      persons: [{name: 'Tom', age:18},{name: 'Jack', age:17}]
    },
    methods:{
		deletP(index){this.persons.splice(index,1) },
        // vue只是监视了persons的改变，没有监视数组内部属性的改变
        // 所以当直接改变数组时，数据并不会进行同步
        // 但Vue重写了数组中一系列改变数组内部的方法，所以当调用数组方法时，会改变数据
        // (先调用元素，更新界面) > 使用变异数组内部方法 > 数据绑定 > 页面变化
		undataP(index,obj){this.persons.splice(index,1,obj)}
	}
})
</script>
~~~



## Vue 内置对象

### 计算属性值 (computed 对象)

#### computed 函数 计算属性

~~~html
<div id="demo">
	姓：<input type="text" v-model="firstName"/><br />
	名：<input type="text" v-model="lastName"/><br />
	姓名(单向)：<input type="text" v-model="Name" />
</div>
<script>
new Vue({
	el: "#demo",
	data:{firstName: 'Aaa',lastName: 'bbbB'},
	computed:{
		name (){
			//什么时候执行: 初始化显示/相关的data属性数据发生了改变
			return this.firstname + " " + this.lastname 
		}
	}
})
</script>
~~~

#### computed 对象 监视读写

~~~html
<div id="demo">
	姓：<input type="text" v-model="firstName"/><br />
	名：<input type="text" v-model="lastName"/><br />
	姓名(双向)：<input type="text" v-model="name" /><!--firstName + lastName-->
</div>
<script>
new Vue({
	em: "#demo",
	data:{firstname: 'Aaa',lastname: 'bbbB',}, 
	computed:{
		funllname: {
			get(){
                // 回调函数,当需要读取当前属性值时回调,根据相关的数据计算并返回当前属性的值
				return this.firstname + "|" + this.lastname
			},
			
			set(value){
                // 回调函数,当属性值发生改变时回调,更新相关的属性数据
                // value就是funllname的最新属性值
				var names = value.split("|")
				names.length == 1 ? names[1] = ":" : []
				this.firstname = names[0]
				this.lastname = names[1]
			}
		},
	}
})
</script>
~~~

### 监视属性值 (watch 对象)

#### Vue 对象内部监视

~~~html
<div id="demo">
	姓：<input type="text" v-model="firstName"/><br />
	名：<input type="text" v-model="lastName"/><br />
	姓名(单向)：<input type="text" v-model="funllname" />
    			<!--firstName + lastName-->
</div>
<script>
var vm = new Vue({       
		el: "#demo",
		data:{firstName: 'Aaa',lastName: 'bbbB',funllname: ''},
		watch:{ 
		firstName: function (value){ 
            // 当firstName值改变时执行,初始化不会执行
			this.funllname = value + ' ' + this.lastname
		},
    this.$nextTick(()=>{
  	// 页面数据更新后执行
	  })
})

~~~

#### Vue 对象外部监视

~~~js
vm.$watch('lastName',function(newVal){ // 当lastName值改变时执行,初始化不会执行
	this.funllName = this.firstName + ' ' + newVal    
 })
</script>
~~~

## Vue 切换显示动画

Vue transition 允许我们只设置隐藏或者显示的样式, 这样切换的时候, 也会有过渡的效果

~~~html
<transition name="myAnim"><div v-show="fool">666</div></transition>
~~~

~~~less
.[name]-enter-active, .[name]-leave-active{/*显示/隐藏的过渡样式*/}
.[name]-enter, .[name]-leave-to {/*隐藏的样式*/}
.[name]-enter-top, .[name]-leave {/*显示的样式*/}
~~~

![](https://cn.vuejs.org/images/transition.png?raw=true)



## Vue 事件修饰符

~~~html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
~~~

## Vue 按键修饰符

~~~html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
.enter	.tab	.delete (捕获“删除”和“退格”键)	.esc	.space	.up	.down	.left	.right
~~~





# Vue 实例对象生命周期

## 生命周期流程

![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png?raw=true)

## Vue生命周期函数

**一、初始化显示可调用函数**

- `beforeCreate()`
- `created()`
- `beforeMount()`
- `mounted()`

**二、更新状态可调用函数：this.xxx = value**

- `beforeUpdate()`
- `updated()`

**三、销毁Vue实例可调用函数：vm.$destory()**

- `beforeDestory()`
- `destoryed()`

**一般比较常用的生命周期方法**

- `created()/mounted()`: 发送ajax请求, 启动定时器等异步任务
- `beforeDestory()`: 做收尾工作, 如: 清除定时器

# Vue 自定义插件

## 自定义标签属性

**upper-text** 是自定义标签属性名，这个值可以是任何值
**el** 是调用此方法的 html 标签
**binding** 是这个标签所包含的内容

### Vue所有实例注册

~~~js
Vue.directive('upper-text', function(el, binding){
    el.innerText = binding.value.toUpperCase()
    // 元素内所有字符串改变为大写
})
~~~

### Vue单个实例注册

~~~js
new Vue({
	el:'#test',
	data:{ msg2:'Dzl SB?,,,,Yes!!'},
	directives:{ // 注册局部指令:只在当前vm管理范围有效
		'upper-text':function(el,binding){
			el.innerText=binding.value.toLowerCase()// 全部转为大写
		}
	}
})
~~~

### 使用自定义标签属性

~~~html
<div id="test">
	<p v-upper-text='msg'> </p>
</div>
~~~

## Vue 自定义插件

### 定义自定义插件

**`vue-myPlugin.js`** 

~~~js
import Vue from 'Vue'
const Muplugin = {// 插件对象必须有一个install()
    install: function (Vue, options){
		// 添加全局方法或属性
		Vue.ZdyWenFun = function (x){console.log(x)}
		// 添加全局自定义标签属性
		Vue.directive('my-upper',function(el,binding){
			el.innerText = binding.value.toUpperCase()
		})
 	}
}
export d Muplugin
// 添加Vue对象实例方法
Vue.prototype.$myMethod = function(){console.log('我tm是实例方法')}
~~~

### 调用自定义插件

~~~html
<script type="text/javascript" src="js/vue.js"></script>
<script type="text/javascript" src="js/vue-myPlugin.js"></script>
<script type="text/javascript">
  Vue.use(Muplugin) // 内部进行调用解析插件对象的install()
  const vm = new Vue({
    el: '#test',
    data: {msg: 'i LOve U'},
    //添加的实例方法
	mounted() {this.$myMethod()}
  })
  
  // 添加的全局方法 可以在任何地方调用
  Vue.ZdyWenFun('全局方法阿nmd');
  // 添加的实例方法 只能在当前的vm实例中调用
  vm.$myMethod()
</script>
~~~

# Vue 获取后台数据

## axios

~~~js
// 在需要使用的组件内引入axios
import axios from 'axios'
// 使用axios发送ajax请求获取数据
axios.get(url).then(axioData => {
    console.log(axioData.data)
}).catch(axioErrorData => {
    console.log(axioErrorData.data)
})
~~~

## vue-resource

~~~js
/* Main.js入口函数设置 */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-resource' 
Vue.use(VueRouter)
var vm = new Vue({ el: '#app', components: { App }, template: '<App/>' })
~~~

~~~js
/* App.vue实例中使用  */
mounted () { 
    // 入口函数设置后Vue实例会自带一个$http对象
	this.$http.get(url).then(
   		// 获取成功则调用这个函数
   		resourData => { console.log(axioData.data) },
   		// 获取失败则调用这个函数
   		resourErrorData => { console.log(resourErrorData.data) }
	)
}
~~~



# Vue 源码分析

## 相关JS技术

### 伪数组转换真数组

~~~html
<li>test1</li><li>test2</li><li>test3</li>
<script>
    const lis = document.querySelectorAll('li') // 这是一个伪数组 {0:li, 1:li....}
    // ES5 转换为真数组	[0:li, 1:li....]
	const lisAll = Array.prototype.slice.call(lis)
    // ES6 转换为真数组	[0:li, 1:li....]
	const lisAll2 = Array.from(lis) 
</script>
~~~

### 获取&判断类型节点

~~~js
const el = document.getElementById('test') // 获取元素节点
const attrNode = el.getAttributeNode('id') // 获取标签节点
const textNode = el.firstChild // 获取文本节点

// 判断节点类型
console.log(el.nodeType, attrNode.nodeType, textNode.nodeType)
// 元素节点返回 1 标签节点返回 2 文本节点返回 3
~~~

### 对象属性描述符

~~~js
// 创建对象方法的get和set语句
const obj = {
  firstName: 'A', lastName: 'B',
  get fullName () { // 定义数据描述符
    return this.firstName + '-' +this.lastName
  },
  set fullName (val) {
    const names = value.split('-')
		this.firstName = names[0]
		this.lastName = names[1]
  }
}
~~~

**语法：**Object.defineProperty(obj  ,  prop , { descriptor })

**obj：** 要在其上定义属性的对象。
**prop：**要定义或修改的属性的名称。
**descriptor：**将被定义或修改的属性描述符。

**defineProperty  自定义描述符达到数据绑定与数据同步**

~~~js
const obj = { firstName: 'A', lastName: 'B' }
// 给obj添加一个 fullName 其绑定firstName和lastName的数据
Object.defineProperty(obj, 'fullName', {
	get: function () {
        // 定义数据描述符
		return this.firstName + '-' +this.lastName
	},
	set: function (value) {
        // 定义存取描述符
		const names = value.split('-')
		this.firstName = names[0]
		this.lastName = names[1]
	}
})
~~~

**defineProperty 对象其他描述符**

~~~js
Object.defineProperty(obj, 'fullName2', {
    // 是否可改变定义特性
	configurable: true, 
    // 是否可枚举
	enumerable: true, 
    // 初始值 可以是任何有效的javascript值
	value: 'fullName2222' , 
    // 是否可修改
	writable: false
})
~~~

### 获取对象属性名数组

~~~js
const ObjNames = Object.keys(obj)
// ObjNames-->['firstName', 'lastName', 'fullName']
~~~

### 属性名判断是否是obj**自身属性**

~~~js
// 语法：obj.hasOwnProperty(prop)
console.log(obj.hasOwnProperty('firstName'))
~~~

### DocumentFragment (批量更新节点)

**documentFragment**：用于储存节点的容器，并且容器是在内存隔离的，不与外界发生关系

**用documentFragment一次性修改所有li**

~~~html
<ul>
	<li>test1</li>
	<li>test2</li>
	<li>test3</li>
</ul>
<script>
    const ul = document.querySelector('ul')
    
    // 1. 创建fragment
    const fragment = document.createDocumentFragment()
    
    // 2. 取出ul中所有子节点取出保存到fragment
    let child // 当appendChild操作时，会把child清空
	while (child = ul.firstChild) {fragment.appendChild(child)}
    
    // 3. 更新fragment中的所有li文本
    // 这里也可以直接获取所有的元素节点，这样就不用过滤了
    [].slice.call(fragment.childNodes)..forEach(node => {
        // 过滤不是元素节点的节点
		if (node.nodeType === 1) { node.innerText = 'WWWW'}
	})
    
    // 4. 将fragment插入ul
    ul.appendChild(fragment)
</script>
~~~

# Vue 面向组件编程

## 脚手架搭建环境(vue/cli-v2)

~~~mariadb
npm i vue vue-router vue-cli -g		# 安装全局脚手架构建工具

vue init webpack '项目名字'  ------>

Project name '文件名' 				#[，是否为项目名,默认是]
Project description '项目描述'
Author '作者名,邮箱地址'
Vue build '打包工具名字??'
Install vue-router? (Y/n)   					#[，是否安装路由 ]
Use ESLint to lint your code (Y/n)      		#[，是否使用ESLint管理代码 ]
Pick an ESLint preset (Use arrow keys) (Y/n)		#[，选择一个ESLint预设 ]
Setup unit tests with Karma + Mocha? (Y/n)		#[，是否安装单元测试 ]
Setup e2e tests with Nightwatch(Y/n)? 		#[，e2e测试 ]

#↓↓↓↓↓↓↓#

npm run dev # 内存中打包并开启服务

#项目文件配置run dev时自动打开浏览器
#.config --> index.js --> autoOpenBrowser : true
~~~

### 项目目录文件解析

~~~markdown
# 项目总文件
  - Build 			webpack相关配置
  - config	 		vue基本配置文件(监听端口，打包输出等相关配置)
  - node_modules		用node安装的依赖包
  - src				资源文件夹以后我们就在这个目录写代码
  - static			静态资源(图片之类)json数据之类
  - test				单元测试,代码测试
  - .babelrc			ES6语法编译配置,依赖将es6代码转换为浏览器识别的代码
  - .editorconfig		定义代码格式
  - .gitignore		上传需要忽略的文件格式
  - .postcssrc.js		转换css工具
  - index.html		页面入口
  - npm-debug.log		npm相关log信息
  - package.json		项目基本信息(项目开发所需模块,项目名称,版本)
  - readme.md			项目说明(如何使用,有哪些方法等等)
# src目录文件 > 项目资源
  - assets		    静态资源(js,css之类可以放在这下面)
  - components	    公用组件编写的地方
  - App.vue		    项目的主组件,所有页面都是在app.vue下切换的.一个标准的vue文件,分为三部分。
  - main.js	    	页面程序入口文件,加载各种公共组件
# Build目录文件 > webpack配置
  - Build.js		       生产环境构建代码
  - check-versions.js     检查node、npm等版本
  - dev-client.js		   热重载相关
  - dev-server.js		   构建本地服务器
  - utils.js			   构建工具相关
  - vue-loader.conf.js  	css加载器配置
  - webpack.base.conf.js	webpack基础配置
  - webpack.dev.conf.js	webpack开发环境配置
  - webpack.prod.conf.js	webpack生产环境配置
  - webpack.test.conf.js	测试相关配置
# config目录文件 > vue-cli配置
  - dev.env.js	开发环境变量
  - index.js		项目一些配置变量
  - prod.env.js	生产环境变量
  - test.env.js	测试环境变量
~~~

### 生产环境的操作

~~~markdown
# 编译打包
npm run build
# 模拟后台 (静态服务器工具包)
安装：npm install serve -g
运行dist包文件夹：serve dist
访问: http://localhost:5000

# 修改打包项目名称
webpack.prod.conf.js --> output:{publicPath: '打包名称'}

# 动态web服务器如何开启打包项目
将打包文件拷贝到运行的tomcat（后端服务） 的运行目录下
访问: http://localost:8080/xxx
~~~

### 代码规范检测

~~~markdown
eslint它定义了很多特定的规则, 一旦你的代码违背了某一规则, `eslint` 会作出非常有用的提示
EsLint的检测范围有`ES`，`JSX`，`Style`。还可以自定义错误和提示
规则的错误等级有三种：
- 0：关闭规则。
- 1：打开规则，并且作为一个警告（信息打印黄色字体）
- 2：打开规则，并且作为一个错误（信息打印红色字体）
eslint规则配置通常在.eslintrc.js的rules对象中, 在这里可以关闭某些规则
~~~

~~~js
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'plugin:vue/base'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'indent': [2, 2], // 两个空格的缩进
    'quotes': [2, 'single'], // js必须使用单引号
    "linebreak-style": [0 ,"error", "windows"], //允许windows开发环境
    // 'semi': [2, 'always'], // 语句强制分号结尾
    'no-console': [1], // 不允许console语句
    'no-unused-vars': [1], // 声明了变量但是没有使用检测
    'space-unary-ops': [1, { 'words': true, 'nonwords': false }], // 一元运算符的前/后要不要加空格
    'brace-style': [2, '1tbs', { 'allowSingleLine': false }], // 大括号风格
    'comma-spacing': [2, { 'before': false, 'after': true }],   // 逗号后有空格，前没有空格
    'comma-style': [2, 'last'],  // 逗号跟在结尾
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // 对象字面量中冒号的前后空格
    'lines-around-comment': [ // 行前/行后备注
      2, {
        'beforeBlockComment': false, // 段注释的前后
        'beforeLineComment': false, // 行注释的前面
        'afterBlockComment': false, // 块注释的后面
        'afterLineComment': false, // 行注释的后面
        'allowBlockStart': true,
        'allowObjectStart': true,
        'allowArrayStart': true
      }],
    'max-depth': [2, 4], // 代码最多允许4层嵌套
    'max-len': [1, 160, 2],
    'max-nested-callbacks': [2, 3], // 回调嵌套深度
    'max-params': [2, 5], // 函数最多只能有5个参数
    'max-statements': [1, 80],  // 单个函数最多80条语句
    'no-array-constructor': [2], // 禁止使用数组构造器
    'no-lonely-if': 2, // // 禁止else语句内只有if语句
    'no-multiple-empty-lines': [2, { 'max': 3, 'maxEOF': 1 }], // 空行最多不能超过2行
    'no-nested-ternary': 2,  // 不使用嵌套的三元表达式
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-trailing-spaces': 2, // 一行结束后面不要有空格
    'no-unneeded-ternary': 2, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;简单的判断用三元表达式代替
    'object-curly-spacing': [2, 'always', { // 大括号内是否允许不必要的空格 always始终允许；never始终不允许
      'objectsInObjects': false,
      'arraysInObjects': false
    }],
    'arrow-spacing': 2, // =>的前/后括号
    'block-scoped-var': 2, // 块语句中使用var
    'no-dupe-class-members': 2,
    // 'no-var': 1, // 禁用var，用let和const代替
    'object-shorthand': [1, 'always'], // 强制对象字面量缩写语法
    'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
    'operator-linebreak': [2, 'after'], // 换行时运算符在行尾还是行首
    'semi-spacing': [2, { 'before': false, 'after': true }], // 分号前后空格
    'keyword-spacing': ['error'],
    'space-before-blocks': 2, // 不以新行开始的块{前面要不要有空格
    'block-spacing': [2, 'always'],
    'space-before-function-paren': [2, 'never'], // 函数定义时括号前面要不要有空格
    'space-in-parens': [2, 'never'], // 小括号里面要不要有空格
    'spaced-comment': [1, 'always',
      { 'exceptions': ['-', '*', '+']
      }], // 注释风格要不要有空格什么的
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
    '$': false,
    'jquery': false,
    'ActiveXObject': false,
    'arbor': true,
    'layer': false
  }
};
~~~

## 脚手架搭建环境(vue/cli@3/4)

~~~makefile
cnpm i @vue/cli -g

vue create  '项目名'  / vue ui

#↓↓↓↓↓↓↓#

Vue CLI v4.3.1
? Please pick a preset: (Use arrow keys)	# 选择你的配置, 如果之前保存有配置, 会在此显示
  default (babel, eslint)		# 默认配置
> Manually select features	# 手动配置

#↓↓↓↓↓↓↓#

? Check the features needed for your project: # 选择配置项, <空格>表示选择, <a>表示全选, <i>表示反转
>(*) Babel	# ES6转为ES5的解析器
 ( ) TypeScript		# .ts的解析器
 ( ) Progressive Web App (PWA) Support		# 渐进式Web应用程序
 (*) Router		# vue路由
 (*) Vuex		# vue状态数据管理
 (*) CSS Pre-processors		# css预编译器
 (*) Linter / Formatter		# 代码风格检查和格式化
 (*) Unit Testing		# 单元测试(unit tests)
 ( ) E2E Testing		# e2e测试(end to end)
 
#↓↓↓↓↓↓↓#
 
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit
? Use history mode for router? (Y/n) 	# router是否使用history模式, 否则使用hash默认(建议n)

#↓↓↓↓↓↓↓#

? Pick a CSS pre-processor (选择css 预处理器):
  Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
> Less
  Stylus
  
#↓↓↓↓↓↓↓#

? Pick a linter / formatter config: # 选择Eslint 代码验证规则 (通常Prettier用的比较多)
  ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
> ESLint + Prettier

#↓↓↓↓↓↓↓#

? Pick additional lint features: # 选择什么时候检测
>(*) Lint on save		# 保存就检测
 ( ) Lint and fix on commit		# fix或commit的时候检测
 
#↓↓↓↓↓↓↓#

? Pick a unit testing solution: # 选择单元测试方案
> Mocha + Chai		# Mocha测试库+Chai断言库
  Jest		# Jest测试库

#↓↓↓↓↓↓↓#

? Where do you prefer placing config for Babel, ESLint, etc.? # 项目配置文件存放处
  In dedicated config files		# 独立文件存放
> In package.json		# 统统放在package.json中

#↓↓↓↓↓↓↓#

? Save this as a preset for future projects? (y/N) # 是否保存该配置到本地文件, 如果选择Y, 选择需要输入名称

#↓↓↓↓↓↓↓#

Vue CLI v4.3.1		# 安装相应包, 等待创建项目中
✨  Creating project in D:/......
⚙️  Installing CLI plugins. This might take a while...

#↓↓↓↓↓↓↓#

npm run serve --open	# 内存中打包并开启服务

# 配置run serve自动打开浏览器
package.json --> scripts:{serve: "vue-cli-service serve --open"}
~~~

### 项目目录文件解析

~~~markdown
# 项目总文件
  - node_modules		用node安装的依赖包
  - src				资源文件夹以后我们就在这个目录写代码
  - public			静态资源html(图片之类)json数据之类
  - tests				单元测试,代码测试
  - .gitignore		上传需要忽略的文件格式
  - babel.config.js		babel相关log信息
  - package.json		项目基本信息(项目开发所需模块,项目名称,版本, es配置)
  - README.md			项目说明(如何使用,有哪些方法等等)
# src目录文件 > 项目资源
  - assets		    静态资源(js,css之类可以放在这下面)
  - components	    公用组件编写的地方
  - router/index.js		路由配置文件
  - store/index.js		vuex状态数据管理配置文件
  - views			路由组件存放地(视图组件)
  - App.vue		    项目的主组件,所有页面都是在app.vue下切换的.一个标准的vue文件,分为三部分。
  - main.js	    	页面程序入口文件,加载各种公共组件
~~~

### 生产环境的操作

~~~markdown
# 编译打包
npm run build
# 模拟后台 (静态服务器工具包)
安装：npm install serve -g
运行dist包文件夹：serve dist
访问: http://localhost:5000

# 修改打包项目名称
webpack.prod.conf.js --> output:{publicPath: '打包名称'}

# 动态web服务器如何开启打包项目
将打包文件拷贝到运行的tomcat（后端服务） 的运行目录下
访问: http://localost:8080/xxx
~~~

### 代码规范检测

~~~markdown
eslint它定义了很多特定的规则, 一旦你的代码违背了某一规则, `eslint` 会作出非常有用的提示
EsLint的检测范围有`ES`，`JSX`，`Style`。还可以自定义错误和提示
规则的错误等级有三种：
- 0：关闭规则。
- 1：打开规则，并且作为一个警告（信息打印黄色字体）
- 2：打开规则，并且作为一个错误（信息打印红色字体）
eslint规则配置通常在.eslintrc.js的rules对象中, 在这里可以关闭某些规则
~~~

## 组件基本架构

### 入口函数 src / main.js

~~~js
/* src/main.js */
import Vue from 'vue'     	 //创建vue实例
import App from './App.vue'  //引入主要组件
var vm = new Vue({
 	el: '#app',				//选择ID为app的元素
	components: {App},		//映射组件为标签
 	 template: '<App />'		//app元素内部添加映射标签<App />
})
~~~

### 主组件格式 src / app.js

~~~vue
<template>
    <!-- 模板页面(内容必须用div包裹) -->
	<div></div>
</template>

<script>
    // JS 模块对象
	export default {
		data() {return {}},
		methods: {},
		…………
	}
</script>

<style>
    /* 样式定义 */
</style>
~~~

### 引入组件格式

~~~html
	<template>
	<HelloWorld></HelloWorld>		<!-- 3- 使用组件标签 -->	
	<hello-world />					<!-- 3- 使用组件标签 -->
	</template>
	<script>
    /* 1- 引入组件 */
	import HelloWorld from './components/HelloWorld'     
	export default {
		components: {HelloWorld}/* 2- 映射成标签 */
	}
	</script>
~~~

# 父子组件间通信

## 子组件接收父组件数据

**利用标签名从父组件传输数据到子组件**

~~~html
<!-- 父组件标签(App.js)传输数据(任意JS属性或方法) -->
<TdoHead  :addTask='addTask' /> 
~~~

~~~html
<!--  子组件(components/...js)props接收数据  -->
<script>
 const vm = new Vue({
     props: { addTask: Function }
 })
</script>
~~~

**利用自定义事件传输父组件方法到子组件**

~~~html
<!-- 父组件标签(App.js)传输对应方法 -->
<TdoHead  @addTask='addTask' /> 
<script>
mounted () { 
      // 定义自定义方法
      this.$refs.header.$on('addTask', this.addTask)
}
</script>
~~~

~~~html
<!--  子组件(components/...js)利用$emit方法接收父组件方法  -->
<script>
     methods: {
      sumTask () { 
		// 使用自定义事件,this.$emit('事件名', [,传入的形参])
         this.$emit('addTask', '666')
      }
 	}
</script>
~~~

## 子组件接受父组件标签

**一、父组件利用子组件标签，传入实体标签**

~~~html
<!-- 传入子组件需要的标签 -->
<子组件标签> 
	<div slot="xxx">xxx 对应的标签结构</div>
	<div slot="yyy">yyy 对应的标签结构</div>
</子组件标签> 
~~~

**二、子组件使用父组件传入的标签输出标签**

~~~html
<!-- 输出父组件标签 -->
<div>
	<slot name="xxx">父组件对应xxx的标签结构</slot>
	<div>组件确定的标签结构</div>
	<slot name="yyy">父组件对应yyy的标签结构</slot>
</div>
~~~

# 子组件间通信

## props通信

![消息订阅系统](D:/web学习库/7.高级框架/Vue/0.vue笔记https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/vue/消息订阅系统.jpg?raw=true)

### 通信流程

1. 父组件定义状态数据
   父组件定义改变状态数据方法
2. 父组件传递状态数据给子组件B
   父组件传递改变状态数据方法给子组件A
3. 子组件A调用方法改变父组件状态数据
   子组件B自动调用`componentWillReceiveProps()`方法并接收状态数据

## 消息订阅系统

![消息订阅系统](D:/web学习库/0.笔记目录/img/消息订阅系统.jpg?raw=true)

### 通信流程

1. 引入消息订阅系统
   `import PubSub from 'pubsub-js'`
2. 发布消息
   `PubSub.publish('消息名',data)`
3. 订阅消息(当消息发送改变时执行，并接收数据)
   `PubSub.subscribe('消息名',(msg, data){...})`

# 组件引入css库

## 安装css库包

`cnpm i  stylus-loader stylus --save-dev` **or** `cnpm i  less-loader less --save-dev`

## style中使用

~~~html
<style lang='less'>
</style>
<style lang='stylus'>
</style>
~~~

# 路由组件编程

## 路由基本概念

### SPA

单页 Web 应用（single page web ），整个应用只有一个完整的页面，点击页面中的链接不会刷新页面, 本身也不会向服务器发请求，当点击路由链接时, 只会做页面的局部更新，数据都需要通过 ajax 请求获取, 并在前端异步展现

![单页面应用](D:.https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/vue/单页面应用.jpg?raw=true)

##  Vue 路由管理器

Vue Router 是 [Vue.js](http://cn.vuejs.org/) 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌！！！

### 路由基本架构

#### 1. 定义路由组件

路由组件装载着需要的内容，通常这类组件放在 *src/views* 文件夹内`(About.vue、Home.vue)`

#### 2. 定义路由器js

~~~js
// src/rouder/index.js：
import Vue from 'vue' 
import VueRouter from 'vue-router'  
import About from '../views/a.vue'
import Home from '../views/b.vue'
// 对路由插件进行解析
Vue.use(VueRouter) 
// 这里定义一个路由
export default new VueRouter({
	linkActiveClass: 'active', // 定义默认路由类名
  routes = [
      // 配置路由组件地址
      { path: "/about",component: About,children: [
          //{ path:'note', component: aboutl } //其他子路由
        ], meta: {} // $route元数据 router.meta
      },
      { path: "/home", component: Home },
      // 配置默认显示路由
      { path: "/", redirect: "/about" }
  ];
})
~~~

#### 3. Vue 入口函数引入路由

~~~js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
const app = new Vue({
	components: { App },
	template: '<App/>',
    // 将设置好的路由器传入组件
	router
}).$mount('#app')
~~~

#### 4. 静态组件使用路由组件

~~~html
<div id="app">
	<router-link to="/about">Go to about</router-link>
	<router-link to="/home">Go to home</router-link>
	<router-view> </router-view>
</div>
~~~

![1574341010](.https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/vue/1574341010.png?raw=true)

[^注意]:当在入口函数引入路由，则代表所有组件都已经有了路由器，所以其他静态组件也能使用路由

#### 5. 路由组件缓存

可让显示路由保存值和自身，在刷新页面时或重新启动浏览器不会消失

~~~html
<keep-alive include="test-keep-alive"> <!-- 利用keep-alive标签包裹显示路由 -->
	<router-view class="w"></router-view>
</keep-alive>
~~~

### 静态组件操作路由

#### 组件实例访问路由

~~~js
mounted () {
    // 当前显示路由
	console.log(this.$route) 
    // 路由器
	console.log(this.$router) 
}
~~~

#### 静态组件跳转路由链接

~~~js
new Vue({
    ...
    this.$router.push('路由链接'),
  	this.$router.replace('路由链接')
    ...
})
~~~

#### 路由链接占位符传值

**一、定义一个路由，并输入一个占位符(":xxx")**

~~~js
// src/rouder/index.js
// 引入
import Home from './Home.vue'
// 路由配置
roates: [{ path: '/home/:id', commponent: Home }]
~~~

**二、任意组件利用router.push改变路径，并在占位符位置传入任意值**

~~~js
pushShow (id) {     
    this.$router.push('/home/${id}') 
}
~~~

**三、路由组件获取"id"占位符值**

~~~js
watch: { 
    $route: function (route) {
    	//  监视占位符值
		if (route.params.id) {
			const id = route.params.id
			// 从数据库中寻找有相同标识的数据并返回
			this.logoData = this.userData.find(user => id === user.id)
		}
	}
}
~~~

# Vuex 集中式状态管理

## Vuex 基本概念

Vuex 是一个专为 Vue.js 应用程序开发的**集中式状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

### 基本状态管理模式

~~~js
new Vue({
  // state 数据
  data () {return{count: 0}},
  // view  视图
  template: `<div>{{ count }}</div>`,
  // actions 改变数据方法
  methods: {
	increment () {this.count++}
  }
})
~~~

~~~sequence
Viem-->Actions:调用方法
Actions-->State:寻找数据
State-->Viem:页面显示数据
~~~

**state**：驱动应用的数据源
**view**：以声明方式将 **state** 映射到视图
**actions**，响应在 **view** 上的用户输入导致的状态变化。

### 多组件数据共享状态问题

- **多个视图依赖于同一状态**
- **来自不同视图的行为需要变更同一状态**
- **以前的解决办法**
  1. 将数据以及操作数据的行为都定义在父组件
  2. 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)

~~~sequence
participant 子组件D
父组件A->子组件B:传输数据
父组件A->子组件D:传输数据
~~~

#### Vuex的解决方法

将数据以及操作数据的行为分别管理，任意组件都可以随意调用并修改

~~~sequence
participant 子组件B
participant Vue状态管理 as vx
vx->父组件A:传输数据
vx->子组件B:传输数据
~~~

### Vuex总流程图

![Vuex流程图](./img/vue/Vuex流程图.png?raw=true)

### 什么情况下应该使用 Vuex？

Vuex 可以帮助我们管理共享状态，并附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

如果不打算开发大型单页应用，不必使用 Vuex 管理。如果应用足够简单，最好不要使用 Vuex 。一个简单的 [store 模式](https://cn.vuejs.org/v2/guide/state-management.html#简单状态管理起步使用) 就足够了。但是，如果需要构建一个中大型单页应用，就要更好地在组件外部管理状态，这是 Vuex 就很有必要性了。

## Vuex 基本架构

**安装：**`cnpm i --save vuex`

### 简单store状态管理

#### 1. 定义核心管理模块

~~~js
// src / store.js
import Vue from 'vue'
import Vuex from 'vuex'
// vue解析vuex插件
Vue.use(Vuex)
const state = {} // 状态对象
const mutations = {} // 包含多个更新state函数的对象
const actions = {} // 包含多个对应事件回调函数的对象
const getters = {} // 包含多个getter计算属性函数的对象
// 向Vuex添加所有管理对象(必须),名称必须统一(state, mutations, actions, getters)
export default new Vuex.Store({ state, mutations, actions, getters })
~~~

#### 2. 入口js引入

~~~js
import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
var vm = new Vue({
  	el: '#app',
  	render: h => h(app),
  	store // 所有的组件对象都多了一个属性：$store
})
~~~

### 模块化状态管理

#### 1. 定义文件目录结构(src / store)

- `state.js`			  / *状态对象* /
- `actions.js`         /  *多个更新state函数的引用对象* /
- `mutations.js`   / *多个对应actions的回调函数的对象* /
- `getters.js`        / *多个getter计算属性函数的对象* /
- `index.js`             /*集合所有store对象的集合与管理对象* /

#### 2.  定义Vuex接口 (src / store / index.js)

~~~js
/* vuex的核心管理入口模组 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
Vue.use(Vuex)
export default new Vuex.Store({ state, mutations, actions, getters })
~~~



### 简单模块化状态管理

**自定义扩展插件：**AcMutations

#### 1. 定义目录结构

- `AcMutations` 	 	  / *自定义 AcMutations 框架目录* /
- `acMutions.js`         /  *定义Vuex方法的地方* /
- `getters.js`              / *多个getter计算属性函数的对象* /
- `index.js`                  /*集合所有store对象的集合与管理对象* /

#### 2. 定义Vuex接口 (src / store / index.js)

~~~js
/* vuex的核心管理入口模组 */
import Vue from 'vue'
import Vuex from 'vuex'
import AcMutations from './AcMutations/index.js'
const {state, mutations, actions, getters} = AcMutations
Vue.use(Vuex)
export default new Vuex.Store({ state, mutations, actions, getters })
~~~

## Vuex 组件中使用

### 组件显示state数据内容

~~~js
/* 状态数据(state.js) */
state = { cliNum: 0 }
~~~

~~~html
<!-- 任意组件 -->
<div>{{ $store.state.cliNum }}</div>
~~~

### 组件使用计算值

~~~js
/* 状态数据(getters.js) */
getters = {
  	type (state) {
   		return (state.cliNum % 2) === 0 ? '偶数' : '奇数'
  	}
}
~~~

~~~html
<!-- 任意组件 -->
<div>{{ $store.getters.type }}</div>
~~~

### 组件使用改变state属性的函数

#### 只传入单一形参

~~~js
// actions.js
actions = {
  	qaq ({commit}, Arg) { commit('QAQ'), Arg }
}
// mutations.js
mutations = {
  	QAQ (state, Arg) { console.log('我运行啦' + Arg) }
}
~~~

~~~html
<!-- 任意组件 -->
<button @click="$store.dispatch('qaq', [a,b,c])">+</button>
~~~

#### 以数组方式传入多个形参( Vuex )

~~~js
// actions.js
actions = {
  	qaq ({commit}, Args) { commit('QAQ',{Arg1:Args[0], Arg2:Args[1]})  }
}
// mutations.js
mutations = {
  	QAQ (state, {Arg1, Arg2}) { console.log(Arg1,Arg2) } 
}
~~~

~~~js
// 任意组件
mounted () {
	this.$store.dispatch('qaq', ['wd','nmd']) // 控制台输出'wdnmd'
}
~~~

#### 以数组方式传入多个形参( AcMutations )

~~~js
/* 状态数据(acMutions.js) */
qaq (state, {arg1, arg2}) {
    console.log(Arg1,Arg2)
}
~~~

~~~js
mounted () {
	this.$store.dispatch('qaq', ['wd','nmd']) // 控制台输出'wdnmd'
	}
~~~

### 组件引入store和actions

~~~html
<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      // 获取动态数据的地方 mapState执行结果是对象
      // 在把这个对象属性给computed，computed会对该属性的属性描述符进行改造，并把属性添加到实例的this中
      ...mapState(['cliNum']),
      ...mapGetters(['type'])
    },
    methods: {
      // 获取actions方法的地方
      ...mapActions(['plus', 'reduce', 'plusOdd', 'oneSecPlus'])
    }
  }
</script>
~~~

# ElementUI的使用

## vue-cli@4 文件中引入

~~~makefile
vue create my-app	# vue-cli创建项目
cd my-app		# 进入项目文件

vue add element		# 添加element插件
  Installing vue-cli-plugin-element...

#↓↓↓↓↓↓↓#

? How do you want to import Element? #你想如何导入Element
> Fully import		# 完全导入
  Import on demand		# 按需导入
  
? Choose the locale you want to load (zh-CN)	# 选择语言
	Invoking generator for vue-cli-plugin-element...
	Installing additional dependencies...
~~~

## vue-cli@4 UI中引入

![](https://user-images.githubusercontent.com/10095631/43555082-b9414998-962a-11e8-83ab-cda066a61093.png?raw=true)

## 自定义主题样式

~~~markdown
# 在线主题编辑器编辑样式
  1. https://element.eleme.cn/#/zh-CN/theme
  2. 下载自定义样式压缩包
  3. 解压到项目文件--> my_app --> theme
# 搭配插件按需引入组件主题

  修改babel.config.js配置 --> plugins -->
  "styleLibraryName": "theme-chalk" 	-->		"styleLibraryName": "~theme"
~~~

## plugins 插件配置文件

~~~js
// 当用vue add 或者vue-cli ui添加完element插件后
// 会在src中多出一个plugins的插件配置文件
// 里面包括了所有第三方插件的配置, element的配置也在其中
// plugins/element.js的配置主要作用是按需引入需要的组件
import Vue from "vue";
import { Button } from "element-ui";
Vue.use(Button);
~~~

## .vue 组件中使用

~~~vue
<template>
  <div>
    <el-button>Click Me</el-button>
  </div>
</template>

<script>
	export default {}
</script>

<style>
</style>
~~~

# Vue 常见问题

## vue-cli@4 常用配置

~~~js
// my_app/vue.config.js(默认未创建)
module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost", 
        port: '8081', 
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: null, // 代理
    }
}
~~~

## vue-cli@4 解决跨域

~~~js
module.exports = {
    devServer: {
        proxy: { // 代理
          '/api': {
                target: '<url>', //API服务器的地址
                ws: true,	//代理websockets
                changeOrigin: true，	// 虚拟的站点需要更管origin
                pathRewrite: { '^/api': '' }//重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          	},
         }
      }
}
~~~

## vscode 关闭自动添加分号和转换单引号

~~~json
"vetur.format.defaultFormatterOptions": {
  "js-beautify-html": {
    // force-aligned | force-expand-multiline
    "wrap_attributes": "force-aligned"
  },
  "prettyhtml": {
    "printWidth": 100,
    "singleQuote": false,
    "wrapAttributes": false,
    "sortAttributes": true
  },
  "prettier": {
      "semi": false,
      "singleQuote": true
  }
},
~~~

