# 面向组件编程

## 模块与组件化概念

**模块化：**向外提供特定功能的js程序, 一般就是一个js文件。这样可以**复用js**, **简化js**的编写, **提高js运行效率**

**组件化：**一个界面的某个功能模块`(html/css/js)`，这样可以**复用编码**, **简化项目编码**, 提**高运行效率**



## 定义组件

### 工厂函数组件

工厂函数就是没有状态的组件

~~~jsx
function MyComponent () {
  return <div>工厂函数组件(简单组件)</div>
}
~~~

### ES6类组件

~~~jsx
class MyComponent2 extends React.Component  {
   render () {
     return <div>ES6类组件(复杂组件)</div>
   }
}
~~~



## 渲染组件

~~~jsx
ReactDOM.render(<MyComponent />, document.querySelector('#example'));
~~~



## 组件三大属性

### state 状态机

用于保存动态数据的一个容器，通常定义在constructor中

~~~jsx
constructor(props) {
	super(props)
  this.state = {....} // 保存数据状态
}
~~~

### props 参数接收功能模块

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

### refs 标识获取元素

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

## 组件拼接

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

## 功能组件编写流程（重要）

~~~react
1. 拆分组件
2. 实现静态组件(只有静态界面，没有动态数据和交互)
3. 实现动态组件
      1. 实现初始化数据动态显示
      2. 实现交互功能
~~~

### 状态数据保存方向

看数据是某个组件需要（给他），还是某些组件需要（给共同的父组件）

### 子组件改变父组件状态

子组件中不能直接改变父组件的状态。数据状态在哪个组件，更新状态的行为就应该定义在哪个组件

# 脚手架搭建环境

## 脚手架环境搭建流程

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



# 组件间通信

## props通信

![子组件传递数据](D:/web学习库/7.高级框架/React/img/子组件传递数据.jpg)

### 通信流程

1. 父组件定义状态数据
   父组件定义改变状态数据方法
2. 父组件传递状态数据给子组件B
   父组件传递改变状态数据方法给子组件A
3. 子组件A调用方法改变父组件状态数据
   子组件B自动调用`componentWillReceiveProps()`方法并接收状态数据

## 消息订阅系统

![消息订阅系统](D:\web学习库\7.高级框架\React\img\消息订阅系统.jpg)

### 通信流程

1. 引入消息订阅系统
   `import PubSub from 'pubsub-js'`
2. 发布消息
   `PubSub.publish('消息名',data)`
3. 订阅消息(当消息发送改变时执行，并接收数据)
   `PubSub.subscribe('消息名',(msg, data){...})`

# 路由组件编程

## 路由基本概念

### SPA

单页 Web 应用（single page web ），整个应用只有一个完整的页面，点击页面中的链接不会刷新页面, 本身也不会向服务器发请求，当点击路由链接时, 只会做页面的局部更新，数据都需要通过 ajax 请求获取, 并在前端异步展现

<img src="D:\web学习库\7.高级框架\React\img\1583466607(1).jpg" alt="1583466607(1)" style="zoom: 67%;" />

### react-router

react 的一个插件库，专门用来实现一个 SPA 应用，基于 react 的项目基本都会用到此库

### 后台注册路由

~~~js
 router.get(path, function(req, res))
~~~

当 node 接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来 处理请求, 返回响应数据

### 前端注册路由

~~~js
<Route path="/about" component={About}>
~~~

当浏览器的 hash 变为#about 时, 当前路由组件就会变为 About 组件



## 路由组件流程

### 安装react-router

`npm i react-router-dom --save`

### 路由组件架构

`components/app.jsx`

~~~jsx
// 引入路由
import { BrowserRouter, HashRouter,
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
			</Switch>
		</div>
  </BrowserRouter>
  )
}
~~~

## 路由传输数据

### 父路由传递数据

`Msessagews.jsx`

~~~jsx
{/* 1.定义路由链接 */}
<NavLink to='/home/Msessagews/MsessagewsDatail/1'>{item.title}</NavLink>
<NavLink to='/home/Msessagews/MsessagewsDatail/2'>{item.title}</NavLink>
{/* 1.定义路由显示区域,并匹配一个占位符 */}
<Route path='/home/Msessagews/MsessagewsDatail/:id' component={MsessagewsDatail}/>
~~~

### 子路由接收数据

`MsessagewsDatail.jsx`

~~~jsx
render() {
  let {id} = this.props.match.params
  return <div></div>
}
~~~

## 路由自定义参数

### 路由链接类名自定义

~~~jsx
function MyNavLink(props) {
    return (<NavLink {...props} activeClassName='acc'/>);
}
...
  <MyNavLink to='/about'>About</MyNavLink><br />
	<MyNavLink to='/home'>Home</MyNavLink>
...
~~~

# Ant Design of React

`antd` 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

**安装手机版：**`npm install antd-mobile --save`
**安装PC版：**`npm install antd --save`

## React ui库使用流程

~~~jsx
import { Button } from 'antd-mobile'; // 引入指定标签
import 'node_modules/antd/dist/antd-mobile.css'; // 引入样式
ReactDOM.render(<Button />, mountNode);	// 渲染
~~~

## 按需加载样式

**1.安装对应插件**

`cnpm i react-app-rewired babel-plugin-import customize-cra --save`

**2.修改package.json**

~~~json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom"
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

# Redux 集中式状态数据

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。它可以用在 react, angular, vue 等项目中, 但基本与 react 配合使用，作用: 集中式管理 react 应用中多个组件共享的状态

## react-redux 基本架构

### 1.定义store包装函数

`src/redux/store.js`

~~~js
//! 1. 定义store包装函数

//? 引入创建库方法 和 异步处理方法
import { createStore, applyMiddleware } from 'redux'
//? 引入异步处理中间件
import thunk from 'redux-thunk'
//? 引入开发者扩展工具支持包
import { composeWithDevTools } from 'redux-devtools-extension'
/*  (*^▽^*)
    ! 封装store回调
    ! 第一个参数的储存库
    ! 第二个参数是使用异步与第三方扩展的固定写法
*/
export default (reducer) =>createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
    )
~~~

### 2.定义储存库

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

const count = store((count = 0, action)=>{
    //? 定义方法行为
    switch (action.type) {
        case IN_CREMENT:
            return count + action.data
        default:return count
    }
})
export {count}
~~~

### 3.定义行为常量名

`src/redux/action-type.js`

~~~js
//! 3. 定义行为常量名, 这样可以防止写错单词。并且有语法提示
export const IN_CREMENT = 'IN_CREMENT'
~~~

### 4.定义通知改变函数

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

### 5.渲染入口js中定义接口

`src/index.js`

~~~js
//! 5. 定义react-redux接口

import React from 'react';
import ReactDOM from 'react-dom';

//? 引入react-redux的 redux状态管理组件
import { Provider } from 'react-redux'
//? 引入count储存库
import {count} from './redux/reducers'

import App from './containters/app';

//? App 封装在Provider(状态管理组件中)
ReactDOM.render(
    //? 将储存库传入状态管理组件中
    (<Provider store={count}>
        <App />
    </Provider>)
    , document.getElementById('root'));
~~~

### 6.定义组件接口容器

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
	state => ({count: state}),
	{inCrement}
)(Counter)
~~~

### 7.主组件使用数据与方法

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

### 基本架构异步执行方法

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



## react-redux	自定义架构

### 1.定义储存库

`redux/reducers.js`

~~~js
//! 引入方法常量命名
import {IN_CREMENT, DE_CREMENT} from './action-types'
//! 引入redux创建储存库方法(store)
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const store = (reducer) => createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
// 创建一个count储存库，并暴露出去
export const count = store((count=0, action)=>{
    switch (action.type) {//? 定义改变数据的方法
        case IN_CREMENT:
            return count + action.data
        case DE_CREMENT:
            return count - action.data
        default:return count
    }
})
~~~

### 2.定义方法命名空间

`redux/action-type.js`

~~~js
//? 加减方法
export const IN_CREMENT = 'IN_CREMENT'
export const DE_CREMENT = 'DE_CREMENT'
~~~

### 3.定义调用方法库

`redux/actions.js`

~~~js
// 引入方法常量
import {IN_CREMENT, DE_CREMENT} from './action-types'
// 将储存库和方法暴露
export const inCrement = { type: IN_CREMENT, data: number }
export const deCrement = { type: DE_CREMENT, data: number }
~~~

### 4.定义redux接口

`redux/index.js`

~~~js
import {stateSubs, stateSubsAll} from 'react-redux-subscript'
import {count} from './reducers'
import {inCrement, deCrement, inCrementAsync} from './actions'

export const AppStateSus = stateSubs({count},{
    inCrement, deCrement, inCrementAsync
})
~~~



### 4.react使用redux储存

~~~jsx
//! 1.获取AppState绑定方法
import {AppStateSus} from '../redux'
class App extends Component {
	constructor(props) {
 	super(props);
 	 //! 绑定this.state数据
 	 AppStateSus(this)
    
 	 console.log(this.state.store) // 0
 	 this.inCrement(6)
 	 console.log(this.state.store) // 6
	}
  render(){return<div></div>}
}
~~~

## redux 开发者工具

### 1.浏览器安装扩展插件

`Redux DevTools`

### 2.下载对应npm包

`npm i redux-thunk redux-devtools-extension -D`

### 3.在创建储存库时传入第二个参数

~~~js
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// composeWithDevTools(applyMiddleware(thunk))
const store = createStore(councer,  composeWithDevTools(applyMiddleware(thunk))  )
~~~

### 4.浏览器查看调试工具

![rudex调试工具](D:\web学习库\7.高级框架\React\img\rudex调试工具.jpg)