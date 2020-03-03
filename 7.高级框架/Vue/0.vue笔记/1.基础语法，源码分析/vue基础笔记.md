# Vue渐进式JavaScript框架
## vue的特点

遵循MVVM模式
编码简洁，体积小，运行效率高，适合移动/PC端开发
他本身只关注UI，可以轻松引入vue插件或其他库开发项目

## input数据绑定p标签
1. 引入Vue.js

```html
<script src='js/vue.js'></script>
```

2. 创建Vue对象
    - el：指定跟element（选择器）
    - data：初始化数据（页面可以访问）

~~~html
// 创建Vue实例
<script>
	const vm = new Vue({
        el: '#box',
        data: {
            message: 'Hello Vue'
        }
    })
</script>
~~~

3. 双向数据绑定：v-model
4. 显示数据：{{xxx}}

~~~html
<div id="box">
	<input type="text" v-model="message" />
	<p>
	  Hello	{{message}}
	</p>
</div>
~~~

## 使用vue开发者工具调试


![调试工具](img\TSGJ.jpg)

## 理解Vue的MVVM

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

# 常用内置html指令

1. `v-text`：更新元素的textContent
2. `v-html`：更新元素的innerHTML
3. `v-if`：如果为true, 当前标签才会输出到页面
4. `v-else`：如果为false, 当前标签才会输出到页面
5. `v-show`：通过控制display 样式来控制显示/隐藏
6. `v-for`：遍历数组/对象
7. `v-on`：绑定事件监听, 一般简写为@
8. `v-bind`：强制绑定解析表达式, 可以省略v-bind
9. `v-model`：双向数据绑定
10. `ref`：指定唯一标识, vue 对象通过$els 属性访问这个元素对象
11. `v-cloak`：防止闪现, 与css 配合: [v-cloak] { display: none }
12. `created()/mounted()`: 发送ajax请求, 启动定时器等异步任务
13. `beforeDestory()`: 做收尾工作, 如: 清除定时器

# 语法基本模板

动态的html页面，包含了一些JS语法代码
双括号表达式
指令（以V-开通的自定义标签属性）

**基本模板**

~~~html
<div id="app">
	<p>{{msg}}</p>			        <!-- I Will Back!! -->
	<p>{{msg.toUpperCase()}}</p>     <!-- 嵌套js代码：全部大写 -->
	<p v-html="msge"></p>			<!-- innerHTML -->
	<p v-text="msge"></p>			<!-- innerText -->
</div>
~~~

~~~javascript
ew Vue({
	el:"#app",
	data:{
		msg:"I Will Back!!",
		msge:"<a href='http://www.baidu.com'>I Will Back!!</a>"
	}
})
~~~

## 强制数据绑定

功能：指定变换的属性值
完整写法：`v-bind:xxx='yyy'` yyy会被作为表达式解析执行
简洁写法：`:xxx='yyy'`

~~~html
<div id="app">
	<img src="imgUrl" /><br />	        <!-- 报错 -->
	<img v-bind:src="imgUrl" /><br />		<!-- 显示 -->
	<img :src="imgUrl" />            		<!-- 显示 -->
</div> 
~~~

~~~javascript
ew Vue({
	el:"#app",
	data:{
		imgUrl:https://cn.vuejs.org/images/logo.png  
	 }
})
~~~


## 指令绑定事件

完整写法：`v-on:click='fun'` fun是Vue实例定义的方法
简洁写法：`@click='fun'`

~~~html
<div id="app">
	<button v-on:click="test">点击</button>
	<button @click="test('abc')">点击</button>
</div>
~~~

~~~javascript
new Vue({
	el:"#app",
	methods:{
		test(a) {
			a.isTrusted ? alert("我没传入形参啦") : alert(a);;
		}
	}
})
~~~

# 计算属性与watch监视

## 在computed属性对象中定义计算属性的方法

~~~html
<div id="demo">
	姓：<input type="text" v-model="firstName"/><br />
	名：<input type="text" v-model="lastName"/><br />
	姓名(单向)：<input type="text" v-model="Name" />
</div>
~~~

~~~javascript
new Vue({
	el: "#demo",
	data:{
		firstName: 'Aaa',
		lastName: 'bbbB'
	},
	computed:{
		name (){
			//什么时候执行: 初始化显示/相关的data属性数据发生了改变
			return this.firstname + " " + this.lastname 
		}
	}
})
~~~

## watch监视firstName和lastName

~~~html
<div id="demo">
	姓：<input type="text" v-model="firstName"/><br />
	名：<input type="text" v-model="lastName"/><br />
	姓名(单向)：<input type="text" v-model="name" /><!--firstName + lastName-->
</div>

~~~

**watch内部监视**

- ~~~javascript
  new Vue({       
  el: "#demo",
  		data:{
  			firstName: 'Aaa',
  			lastName: 'bbbB',
  			name: ''
  		},
  		watch:{ // 内部监视
  		firstName: function (value){ // 当firstName值改变时执行,初始化不会执行
  			this.funllname = value + ' ' + this.lastname
  		}
  })
  ~~~

**watch外部监视**

- ~~~javascript
  vm.$watch('lastName',function(newVal){ // 当lastName值改变时执行,初始化不会执行
  	this.funllName = this.firstName + ' ' + newVal    
   })
  ~~~

## 监视input读取和写入

~~~html
<div id="demo">
	姓：<input type="text" v-model="firstName"/><br />
	名：<input type="text" v-model="lastName"/><br />
	姓名(双向)：<input type="text" v-model="name" /><!--firstName + lastName-->
</div>
~~~

computed对象函数监视属性的get和set

- ~~~javascript
  new Vue({
  	em: "#demo",
  	data:{		//数据(model)
  		firstname: 'Aaa',
  		lastname: 'bbbB',
  	}, 
  	computed:{
  		funllname: {
  	// 回调函数,当需要读取当前属性值时回调,根据相关的数据计算并返回当前属性的值
  			get(){
  				return this.firstname + "|" + this.lastname
  			},
  			// 回调函数,当属性值发生改变时回调,更新相关的属性数据
  			set(value){// value就是funllname的最新属性值
  				var names = value.split("|")
  				names.length == 1 ? names[1] = ":" : []
  				this.firstname = names[0]
  				this.lastname = names[1]
  			}
  		},
  	}
  })
  ~~~

# 条件渲染

## 条件渲染指令

`v-if		v-else		v-show`

**比较v-if与v-show**
如果一些不怎么切换的地方用v-if 因为隐藏的元素会直接去除
如果需要频繁切换的使用v-show 因为隐藏的元素会加上display: none;而不是直接去除

**绑定字符串**

~~~html
<style>
    .aClass{color:#0000FF;}
</style>
<div id="demo">
	<p v-if="ok">成功了</p>
	<p v-else>失败了</p>
    <!-- 或者是下面代码 -->
    <p v-show="ok">表白成功</p>
	<p v-show="!ok">表白失败</p>
	<button @click="ok=!ok">点击</button>
</div>
~~~

~~~javascript
var vm =new Vue({
	el:'#demo',
	data:{
		ok:false
	}
})
~~~


# class绑定与style绑定

在应用界面中，某个（些）元素的样式是变化的
class/style 绑定就是专门用来实现动态样式效果的技术
在 Vue 的 methods 可利用事件绑定函数对 class 和 style 改变


## class绑定字符串

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
~~~

~~~javascript
var vm =new Vue({
	el:"#demo",
	data:{ 
		text:'aClass'
	},
	methods:{
		classEco(){
			this.text = 'bClass'
		}
	}
})
~~~

## class绑定数组

~~~html
<style>
	.aClass{color: blue; }
	.bClass{background: red; }
</style>
<div id="demo">
		<p :class="['aClass','cClass']">xxx是数组</p>
</div>

~~~


## class绑定对象

~~~html
<style>
	.aClass{color: blue; }
	.bClass{color: red; }
	.cClass{font-size: 30px;line-height: 50px;}
</style>
<div id="demo">
	<p class="cClass" :class="{aClass:isA,bClass:isB}">xxx是对象</p>
</div>
~~~

~~~javascript
var vm =new Vue({
	el:"#demo",
	data:{
		isA:true,
		isB:false
	},
	methods:{
		classEco(){
			this.isB=true
			this.isA=false
	}}
})
~~~

## style绑定对象

绑定对象是最常用的防发

~~~html
<div id="demo">
	<p :style="{color:ftCol,fontSize:ftSz +'px'}">style绑定</p>
	<button @click="classEco">点击更改style</button>
</div>
~~~

~~~javascript
var vm =new Vue({
	el:"#demo",
	data:{
		ftCol:'red',
		ftSz:20
	},
	methods:{
		classEco(){
			this.ftCol='green'
			this.ftSz=60
		}
    }
})
~~~

# 列表渲染( for循环 ),列表增删改

## 列表循环：v-for / index

**html 语法：**

- ~~~html
  <p v-for="(w,index) in persons" >		<!--  每次都会遍历并执行一遍  -->
  		{{index}}---{{w.name}}---{{p.age}}    
  <p>
  ~~~

- **w：**`是标识,标识遍历persons`

- **index：**`是数组的序号`

- **persons：**`是vue对象内的一个数组`

**Javascript 语法：**

- ~~~javascript
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
  ~~~

for循环的 :key='xxx'

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性：

~~~javascript
<div v-for="item in items" v-bind   :key="item.id">
     <!-- 内容 -->
</div>
~~~

因为它是 Vue 识别节点的一个通用机制，key 并不仅与 v-for 特别关联。
不要使用对象或数组之类的非基本类型值作为 v-for 的 key。要用不一样的字符串或数值类型的值。


## 列表数组的增删改

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
~~~

vue只是监视了persons的改变，没有监视数组内部属性的改变
vue重写了数组中的一系列改变数组内部数据的方法
**(先调用元素，更新界面) > 使用变异数组内部方法 > 数据绑定 > 页面变化**

~~~javascript
var vm = new Vue({
el: '#demo',
    data: {
      persons: [
        {name: 'Tom', age:18},
        {name: 'Jack', age:17}
      ]
    },
    methods:{
		deletP(index){
			this.persons.splice(index,1) 
		},
		undataP(index,obj){
			this.persons.splice(index,1,obj)
		}
	}
})
~~~

# 常用周期函数

## Vue生命周期分析

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

# Vue自定义标签属性

## 注册全局

~~~javascript
Vue.directive('upper-text', function(el, binding){
    el.innerText = binding.value.toUpperCase() // 全部转为大写
})
~~~

- **my-directive** 是自定义标签属性名，这个值可以是任何值`
- **el** 是调用此方法的 html 标签
- **binding** 是这个标签所包含的内容

## 注册局部

~~~javascript
new Vue({
	el:'#test',
	data:{
        msg2:'Dzl SB?,,,,Yes!!'
	},
	directives:{ // 注册局部指令:只在当前vm管理范围有效
		'upper-text':function(el,binding){
			el.innerText=binding.value.toLowerCase()// 全部转为大写
		}
	}
})
~~~

## 使用自定义标签属性

~~~html
<div id="test">
	<p v-upper-text='msg'> </p>
</div>
~~~

# Vue自定义插件

## 定义自定义插件

**`vue-myPlugin.js`** 

~~~javascript
/* vue的插件库 */
(function(window){
	// 需要向外暴露的插件对象
	const Muplugin = {}
	// 插件对象必须有一个install()
	Muplugin.install = function (Vue, options) {
		//1.添加全局方法或属性
		Vue.ZdyWenFun = function (x){
			console.log(x)
		}
		//2.添加全局资源--->标签名 v-my-upper
		Vue.directive('my-upper',function(el,binding){
			el.innerText = binding.value.toUpperCase()
		})
		//3.添加实例方法
		Vue.prototype.$myMethod = function(){
			console.log('我tm是实例方法')
		}	
	}
	Vue.use(Muplugin) // 内部进行调用解析插件对象的install()
})(window)
~~~

## 调用自定义插件

~~~html
<script type="text/javascript" src="js/vue.js"></script>
<script type="text/javascript" src="js/vue-myPlugin.js"></script>
<script type="text/javascript">
  const vm = new Vue({
    el: '#test',
    data: {
      msg: 'i LOve U'
    },
	mounted() {//添加的实例方法
		this.$myMethod()
	}
  })
  // 添加的全局方法 可以在任何地方调用
  Vue.ZdyWenFun('全局方法阿nmd');
  // 添加的实例方法 只能在当前的vm实例中调用
  vm.$myMethod()
</script>
~~~

