---
title: React 前端框架开发
date: 2020-11-01
categories:
  - 前端学习笔记
tags: 
  - react
---
## React 简述

用于构建用户界面的 JavaScript 库(只关注于View)、 由Facebook开源
**英文官网:**[ https://reactjs.org/](https://reactjs.org/) **中文官网:** https://doc.react-china.org/

### React的特点

**声明式编码：**以声明式编写 UI，可以让你的代码更加可靠，且方便调试。
**组件化编码：**组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。
**支持客户端与服务器渲染：**可以使用 Node 进行服务器渲染，或使用 [React Native](https://facebook.github.io/react-native/) 开发原生移动应用。

### React为何高效

1) 虚拟(virtual)DOM, 不总是直接操作DOM、1) DOM Diff算法, 最小化页面重绘

## React 知识点

### Diff 算法

#### 虚拟DOM

一个虚拟DOM(元素)是一个一般的js对象, 准确的说是一个对象树(倒立的)。虚拟DOM保存了真实DOM的层次关系和一些基本属性，与真实DOM一一对应。如果只是更新虚拟DOM, 页面是不会重绘的

#### diff 算法的基本步骤

用JS对象树表示DOM树的结构；然后用这个树构建一个真正的DOM树插到文档当中，当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异，把差异应用到真实DOM树上，视图就更新了

<img src="img/React/tupian2.png" alt="图片2"  />

把树形结构按照层级分解，只比较同级元素，给列表结构的每个单元添加唯一的 key 属性，方便比较，

React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字），选择性子树渲染。

开发人员可以重写shouldComponentUpdate 提高 diff 的性能。

## React 基本概念

### React 基本使用

#### 相关JS库&插件

**react.js：**React的核心库
**react-dom.js：**提供操作DOM的react扩展库
**babel.min.js：**解析JSX语法代码转为纯JS语法代码的库
**React Developer Tools：**提供浏览器调试

**页面引入**

~~~html
<script type="text/javascript" src="./js/react.development.js"></script>
<script type="text/javascript" src="./js/react-dom.development.js"></script>
<script type="text/javascript" src="./js/babel.min.js"></script>
~~~

#### 基础编码

~~~jsx
<script type="text/babel"> //必须声明babel
  // 创建虚拟DOM元素
  const vDom = <h1>Hello React</h1> // 千万不要加引号
  // 渲染虚拟DOM到页面真实DOM容器中
  ReactDOM.render(vDom, document.getElementById('test'))
</script>
~~~

#### 引入图片

~~~jsx
import imgBase64 from './a.png'
const img = <img src={imgBase64} />
// or
const img = <img src={require('./a.png')} />
~~~



### 虚拟DOM

React提供了一些API来创建一种`特别`的js对象，他可以将虚拟DOM元素渲染到页面中的真实容器DOM中显示

~~~js
var element = React.createElement('h1', {id:'myTitle'},'hello')
~~~

#### 纯JS创建虚拟DOM

~~~js
React.createElement('h1',  {id:'myTitle'},  title) // 一般不用
~~~

#### JSX语法创建虚拟DOM

~~~jsx
<h1 id='myTitle'>{title}</h1>
~~~

#### JSX插入数组虚拟DOM

~~~jsx
var li = [
  <li key=1>jquery<li>,<li key=2>angular<li>,<li key=3>zeptoo<li>
]
var ul = <ul>{li}</ul>
~~~





### JavaScript XML

react定义的一种类似于XML的JS扩展语法: XML+JS，他专门用来创建react虚拟DOM(元素)对象，它不是字符串, 也不是HTML/XML标签。但它最终产生的就是一个JS对象。这个JS对象包含着这个DOM的创建信息

~~~jsx
var ele = <h1>Hello JSX!</h1>
~~~

#### JSX标签语法

~~~jsx
// JSX标签语法跟HTML标签语法一样
var ele = <h2>Hello JSX!</h2> // <div>Hello JSX!</div>
var ele = <h2 class=''>Hello JSX!</h2> // <div id="">Hello JSX!</div>
~~~

#### 语法编译规则

遇到 < 开头的代码, 以标签的语法解析在转换为html同名元素
遇到 {  开头的代码，以**JS语法解析**



#### babel编译JSX

浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行，a. 只要用了JSX，都要加上type="text/babel", 声明需要babel来处理

**不使用babel编译JSX语法创建虚拟DOM**

~~~js
const msg = 'I Like You!',myId = 'lixiaolong'
// 1. 创建虚拟dom
// React.createElement('标签名', {属性名:属性值},标签内容)
const vDom1 = React.createElement('h2', {id:myId.toLowerCase()},msg.toUpperCase())
// 2. 渲染虚拟dom插入#test1中
ReactDOM.render(vDom1,document.querySelector('#test1'))
~~~

<div id="test1"><h2 id="lixiaolong">I LIKE YOU!</h2></div>
**使用babel编译JSX语法创建虚拟DOM** （babel语法最终会转换为上方语法）

~~~jsx
// 1. 创建虚拟dom
const vDom2 = <h2 id={myId.toUpperCase()}>{msg.toLowerCase()}</h2>
// 2. 渲染虚拟dom插入#test2中
ReactDOM.render(vDom2,document.querySelector('#test2'))
~~~

<div id="test2"><h3 id="LIXIAOLONG">i like you!</h3></div>


## 数据双向绑定

### 让元素值与状态数据绑定

1. **绑定动态数据：**![1](img/React/input/1.jpg)![2](img/React/input/2.jpg)*（此时input的值是固定的）*
2. **input绑定输入事件：**![3](img/React/input/3.jpg)
3. **根据input的值改变动态数据：**![4](img/React/input/4.jpg)

## 生命周期钩子

![图片1](./img/React/tupian1.png)

### 生命周期流程

~~~apl
a. 第一次初始化渲染显示: ReactDOM.render()
   /* constructor(): 创建对象初始化state
   /* componentWillMount() : 将要插入回调
   /* render() : 用于插入虚拟DOM回调
   /* componentDidMount() : 已经插入回调
b. 每次更新state: this.setSate()
   /* componentWillUpdate() : 将要更新回调
   /* render() : 更新(重新渲染)
   /* componentDidUpdate() : 已经更新回调
c. 移除组件: ReactDOM.unmountComponentAtNode(containerDom)
   /* componentWillUnmount() : 组件将要被移除回调
~~~

### 常用钩子

~~~apl
render(): 初始化渲染或更新渲染调用
componentDidMount(): 组件已经挂载完毕，用于开启监听, 发送ajax请求
componentWillUnmount(): 调用移出时的回调，用于做一些收尾工作, 如: 清理定时器
componentWillReceiveProps(): ......
~~~

## React 事件绑定

### 添加事件方式

~~~js
class MyComponent2 extends React.Component  {
   render () {
     return <div onClick={this.notice}>ES6类组件(复杂组件)</div>
   }
   notice= ()=>{
        console.log('React事件触发')
   }
}
~~~

### 剪切板事件

~~~js
onCopy onCut onPaste // 事件名
DOMDataTransfer clipboardData // 属性
~~~

### 复合事件

~~~js
onCompositionEnd onCompositionStart onCompositionUpdate // 事件名
string data // 属性
~~~

#### 键盘事件

~~~js
onKeyDown onKeyPress onKeyUp // 事件名	
~~~

#### 焦点事件

~~~js
onFocus onBlur // 事件名
DOMEventTarget relatedTarget // 属性
~~~

#### 表单事件

~~~js
onChange onInput onInvalid onSubmit // 事件名
~~~

#### 鼠标事件

~~~js
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit 		// 事件名
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave	// 事件名
onMouseMove onMouseOut onMouseOver onMouseUp	// 事件名
~~~

## React 面向组件编程

### 模块与组件化概念

**模块化：**向外提供特定功能的js程序, 一般就是一个js文件。这样可以**复用js**, **简化js**的编写, **提高js运行效率**

**组件化：**一个界面的某个功能模块`(html/css/js)`，这样可以**复用编码**, **简化项目编码**, 提**高运行效率**



### 定义组件

#### 工厂函数组件

工厂函数就是没有状态的组件

~~~jsx
function MyComponent () {
  return <div>工厂函数组件(简单组件)</div>
}
~~~

#### ES6类组件

~~~jsx
class MyComponent2 extends React.Component  {
   render () {
     return <div>ES6类组件(复杂组件)</div>
   }
}
~~~



### 渲染组件

~~~jsx
ReactDOM.render(<MyComponent />, document.querySelector('#example'));
~~~



### 组件三大属性

#### state 状态机

用于保存动态数据的一个容器，通常定义在constructor中

~~~jsx
constructor(props) {
	super(props)
  this.state = {....} // 保存数据状态
}
~~~

#### props 参数接收功能模块

用于外部接收参数的容器，通常在渲染组件时定义在标签中，内部拿取参数就在组件的this.props中，如果是简单组件，则在函数参数中

~~~jsx
// 构造组件接收参数
function Person(props) {return <p>{props.name}</p>}
// 类组件接收参数
class Person extends React.Component {
 render() {return <p>{this.props.name}</p>}
}
// 传递参数
ReactDOM.render(<Person name={'nmd'} />, ...);
~~~

#### refs 标识获取元素

标记获取元素的容器，通常定义在虚拟DOM上，用于获取指定的虚拟DOM

~~~jsx
 // 标记获取元素
class Person extends React.Component {
 render() return <p refs="content">{props.name}</p>}
 showP() {...log(refs.content)}
}

// 标记获取元素
class Person extends React.Component {
 render() return <p refs={p =>this.p = p>{props.name}</p>}
 showP() {...log(this.p)}
}
~~~

### 组件拼接

组件拼接是一个父组件插入多个子组件。子组件也可以插入子组件。

~~~jsx
// 定义父组件
class App extends React.Component {
  // 父组件插入子组件
  render() {return <div>	<list />	</div>}
}

// 定义子组件
class List extends React.Component {render() {return <div>List</div>}}
~~~

### 功能组件编写流程（重要）

~~~react
1. 拆分组件
2. 实现静态组件(只有静态界面，没有动态数据和交互)
3. 实现动态组件
      1. 实现初始化数据动态显示
      2. 实现交互功能
~~~

#### 状态数据保存方向

看数据是某个组件需要（给他），还是某些组件需要（给共同的父组件）

#### 子组件改变父组件状态

子组件中不能直接改变父组件的状态。数据状态在哪个组件，更新状态的行为就应该定义在哪个组件

## 脚手架搭建环境

**安装`create-react-app`脚手架模块**

`cnpm i create-react-app -g`

**运行命令生成项目基础结构**

`create-react-app react-demo`

**脚手架入口js基本设置**`(src/index.js)`

~~~js
//? 引入组件
import App from './components/app';
//? 渲染组件
ReactDOM.render(<App />, document.getElementById('root'));
~~~

**运行开发环境：**`npm start`
**生产环境打包：**`npm build`

####### ###

## 子组件间通信

### props通信

![子组件传递数据](img/React/asd12emasdasdpmas.jpg)

#### 通信流程

1. 父组件定义状态数据
   父组件定义改变状态数据方法
2. 父组件传递状态数据给子组件B
   父组件传递改变状态数据方法给子组件A
3. 子组件A调用方法改变父组件状态数据
   子组件B自动调用`componentWillReceiveProps()`方法并接收状态数据

### 消息订阅系统

![消息订阅系统](img/React/asd12empmas.jpg)

#### 通信流程

1. 引入消息订阅系统
   `import PubSub from 'pubsub-js'`
2. 发布消息
   `PubSub.publish('消息名',data)`
3. 订阅消息(当消息发送改变时执行，并接收数据)
   `PubSub.subscribe('消息名',(msg, data){...})`

## 路由组件编程

### 路由基本概念

#### SPA

单页 Web 应用（single page web ），整个应用只有一个完整的页面，点击页面中的链接不会刷新页面, 本身也不会向服务器发请求，当点击路由链接时, 只会做页面的局部更新，数据都需要通过 ajax 请求获取, 并在前端异步展现

<img src="img/React/1583466607(1).jpg" alt="1583466607(1)" style="zoom: 67%;" />

#### react-router

react 的一个插件库，专门用来实现一个 SPA 应用，基于 react 的项目基本都会用到此库

#### 后台注册路由

~~~js
 router.get(path, function(req, res))
~~~

当 node 接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来 处理请求, 返回响应数据

#### 前端注册路由

~~~js
<Route path="/about" component={About}>
~~~

当浏览器的 hash 变为#about 时, 当前路由组件就会变为 About 组件



### 路由组件流程

#### 安装react-router

`npm i react-router-dom --save`

#### 路由组件架构

`components/app.jsx`

~~~jsx
// 引入定义路由功能组件
import { BrowserRouter, Redirect,
        NavLink, Route, Switch
} from 'react-router-dom';

// 引入路由组件
import About from '../views/about'
import Home from '../views/home'
render {
  return (
  <BrowserRouter>{/* 1.定义路由管理框,如果父组件已经定义,那么子组件不需要定义 */}
		<div>
      	{/* 2.定义路由链接 */}
				<NavLink to='/about'>About</NavLink><br />
				<NavLink to='/home'>Home</NavLink>
		</div>
     
		<div>
			<Switch>{/* 3.定义路由显示区域 */}
					<Route path='/about' component={About}/>
					<Route path='/home' component={Home}/>
        	{/* 4.定义路由默认路径 */}
        	<Redirect to='/about'/>
        {/* 4.定义根路径路由 */}
        {/* <Route component={ Main }></Route> */}
			</Switch>
		</div>
  </BrowserRouter>
  )
}
~~~

### 路由传输数据

#### 父路由传递数据

`Msessagews.jsx`

~~~jsx
{/* 1.定义路由链接 */}
<NavLink to='/home/Msessagews/MsessagewsDatail/1'>{item.title}</NavLink>
<NavLink to='/home/Msessagews/MsessagewsDatail/2'>{item.title}</NavLink>
{/* 1.定义路由显示区域,并匹配一个占位符 */}
<Route path='/home/Msessagews/MsessagewsDatail/:id' component={MsessagewsDatail}/>
~~~

#### 子路由接收数据

`MsessagewsDatail.jsx`

~~~jsx
render() {
  let {id} = this.props.match.params
  return <div></div>
}
~~~

### 路由自定义参数

#### 路由链接类名自定义

~~~jsx
function MyNavLink(props) {
    return (<NavLink {...props} activeClassName='acc'/>);
}
...
  <MyNavLink to='/about'>About</MyNavLink><br />
	<MyNavLink to='/home'>Home</MyNavLink>
...
~~~

### 路由属性与方法

~~~jsx
block() {} // 阻止?
createHref() {} // 创建链接
go() {}	// 跳转链接
goBack() {}	// 回退
goForward() {}	// 前进
listen() {}	// 听??
location:{hash: "", pathname: "/register", search: "", state…} // 路由信息
push() {}	// 先进后出跳转
replace() {}	// 先进先出跳转
}
~~~



## Ant Design of React

`antd` 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

**安装手机版：**`npm install antd-mobile --save`
**安装PC版：**`npm install antd --save`

### React ui库使用流程

~~~jsx
import { Button } from 'antd-mobile'; // 引入指定标签
import 'node_modules/antd/dist/antd-mobile.css'; // 引入样式
ReactDOM.render(<Button />, mountNode);	// 渲染
~~~

### 按需加载样式

**1.安装对应插件**

`cnpm i react-app-rewired babel-plugin-import customize-cra --save`

**2.修改package.json**

~~~json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
}
~~~

**3.根目录创建config-overrides.js**

~~~js
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: "css",
  })
);
~~~

**4.直接引入标签**

~~~jsx
import { Button } from 'antd-mobile'
~~~

## Redux 集中式状态数据

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。它可以用在 react, angular, vue 等项目中, 但基本与 react 配合使用，作用: 集中式管理 react 应用中多个组件共享的状态

安装：`cnpm i redux -D`

### react-redux 基本架构

#### 1.定义储存库

`src/redux/reducers.js`

~~~js
//! 2. 定义储存库

//? 引入redux创建储存库(store)
import store from './store'
//? 引入方法常量命名
import {IN_CREMENT} from './action-types'


/*  ﻿ε≡٩(๑>₃<)۶
! 定义储存库===>
  !  第一个参数是储存库的类型，与储存库的值 
  !  第二个参数是储存库的行为, 用于定义改变储存值的方法
  !  action可以携带任意数据, 用于改变储存值状态 
  !      例:action.obj, action.data
  !  action.type是改变数据的方法类型
*/

const count = (state = 0, action)=>{
    //? 定义方法行为
    switch (action.type) {
        case IN_CREMENT:
            return state + action.data
        default:return count
    }
}
export default count
~~~

#### 2.定义store包装函数

`src/redux/store.js`

~~~js
//! 1. 定义store包装函数

//? 引入创建库方法 和 异步处理方法
import { createStore, applyMiddleware } from 'redux'
//? 引入异步处理中间件
import thunk from 'redux-thunk'
//? 引入开发者扩展工具支持包
import { composeWithDevTools } from 'redux-devtools-extension'
//? 引入储存库对象
import store from './redux/reducers.js'
/*  (*^▽^*)
    ! 封装store回调
    ! 第一个参数的储存库
    ! 第二个参数是使用异步与第三方扩展的固定写法
*/
export default (store) =>createStore(
    store,
    composeWithDevTools(applyMiddleware(thunk))
)
~~~

#### 3.定义行为常量名

`src/redux/action-type.js`

~~~js
//! 3. 定义行为常量名, 这样可以防止写错单词。并且有语法提示
export const IN_CREMENT = 'IN_CREMENT'
~~~

#### 4.定义通知改变函数

`src/redux/actions.js`

~~~js
//! 4. 定义通知改变函数

//? 引入方法常量命名
import {IN_CREMENT} from './action-types'
//? 引入count储存库

//? 定义通知改变函数 in-->加 de-->捡 
//? 返回一个通知类型函数，此方法由react-redux调用
export const inCrement = (number)=>({ type: IN_CREMENT, data: number })
~~~

#### 5.渲染入口js中定义接口

`src/index.js`

~~~js
//! 5. 定义react-redux接口

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containters/app';

//? 引入react-redux的 redux状态管理组件
import { Provider } from 'react-redux'
//? 引入储存库
import store from './redux/store'

//? App 封装在Provider(状态管理组件中)
//? 将储存库传入状态管理组件中
ReactDOM.render(
    (<Provider {...store}><App /></Provider>),
    document.getElementById('root')
);
~~~

#### 6.定义组件接口容器

`src/containters/app.jsx`

~~~js
//! 6.定义react-redux接口组件容器
//!     该容器用来包装Counter组件(主组件)，
//!         并向其传入redux通知函数，与store
//? 引入连接函数
import {connect} from 'react-redux'
//? 引入 action 通知改变方法
import {inCrement} from '../redux/actions'
//? 引入主组件
import Counter from '../components/counter'
//? 向外暴露连接 App 组件的包装组件
export default connect(
	state => ({count: state.count}), // 需要的数据(prop的key,val)
	{inCrement}
)(Counter)
~~~

#### 7.主组件使用数据与方法

`src/components/counter.jsx`

~~~jsx
//! 7. 页面中定义引入类型，并使用储存库
import React, { Component } from 'react';
//? 引入限制传入类型方法库
import  PropTypes  from 'prop-types'
class Counter extends Component {
    static propTypes = { // 定义静态对象 ==> App.PropTypes = {...}
        count: PropTypes.number.isRequired,       //? 必要，并且是一个数值
        inCrement: PropTypes.func.isRequired, 	  //? 必要，并且是函数
    }
	render() {
        console.log(this.props.count) //==> 0
        this.inCrement(6)
        console.log(this.props.count) //==> 6
    }
}
export default Counter
~~~

### react-redux	自定义架构

#### 1.定义储存库

`redux/reducers.js`

~~~js
//! 引入方法常量命名
import {IN_CREMENT, DE_CREMENT} from './action-types'

// 创建一个count储存库，并暴露出去
const count = (state=0, action)=>{
    switch (action.type) {//? 定义改变数据的方法
        case IN_CREMENT:
            return state + action.data
        case DE_CREMENT:
            return state - action.data
        default:return count
    }
}
export default count

// 如果定义多个储存库，那么就用对象包起来
// export default {count,....}
~~~

#### 2.定义储存库包装函数

`redux/sotre.js`

~~~js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducer from './reducers'
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

// 如果是多个储存库对象，则
// export default createStore(combineReducers(stores),composeWithDevTools(applyMiddleware(thunk)))
~~~



#### 2.定义方法命名空间

`redux/action-type.js`

~~~js
//? 加减方法
export const IN_CREMENT = 'IN_CREMENT'
export const DE_CREMENT = 'DE_CREMENT'
~~~

#### 3.定义调用方法库

`redux/actions.js`

~~~js
// 引入方法常量
import {IN_CREMENT, DE_CREMENT} from './action-types'
// 将方法暴露
export const inCrement = ()=>({ type: IN_CREMENT, data: number })
export const deCrement = ()=>({ type: DE_CREMENT, data: number })
~~~

#### 4.定义redux接口

`redux/index.js`

~~~js
import {stateSubStore, stateSubStoreAll} from 'react-redux-subscript'
import {count} from './store.js'
import {inCrement, deCrement} from './actions'

export const AppStateSus = stateSubStore({count},{
    inCrement, deCrement
})

// (✪ω✪)绑定一个store
// export const stateSubApp = stateSubStore({stores}, {addComment, delComment, initComment})

// (ಥ_ಥ) 只需要方法
// export const stateSusApp = stateSubStore({store,need:false},{addComment})

//   ψ(*｀ー´)ψ绑定多个store, 并进行筛选需要的数据(可选)
/* export const AppStateSub = storePushToStateAll(
    { stores, filter:['comments'] },
    { delComment, initComment, addComment }
) */
~~~



#### 5.react使用redux储存

~~~jsx
//! 1.获取AppState绑定方法
import {AppStateSus} from '../redux'
class App extends Component {
	constructor(props) {
 	super(props);
 	 //! 绑定this.state数据
 	 AppStateSus(this)

 	 console.log(this.state.store) // 0
 	 this.actions.inCrement(6)
 	 console.log(this.state.store) // 6
	}
  render(){return<div></div>}
}
~~~



### redux异步解决方案

`src/redux/actions.js`

~~~js
//! 异步执行方法
export const inCrementAsync = (number)=>(
    dispatch => {
        setTimeout(() => {
            dispatch(inCrement(number))
        }, 1000);
    }
)
~~~

#### ####### 

### redux 开发者工具

#### 1.安装扩展插件

`Redux DevTools`

#### 2.下载对应npm包

`npm i redux-thunk redux-devtools-extension -D`

#### 3.定义储存库第二个参数

~~~js
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import store from './redux/reducers.js'
// composeWithDevTools(applyMiddleware(thunk))
export default createStore(store, composeWithDevTools(applyMiddleware(thunk))  )
~~~

#### 4.浏览器查看调试工具

![rudex调试工具](img/React/rudex2d12d12e1e1.jpg)

