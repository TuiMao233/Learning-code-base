# React 简述

用于构建用户界面的 JavaScript 库(只关注于View)、 由Facebook开源
**英文官网:**[ https://reactjs.org/](https://reactjs.org/) **中文官网:** https://doc.react-china.org/

## React的特点

**声明式编码：**以声明式编写 UI，可以让你的代码更加可靠，且方便调试。
**组件化编码：**组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。
**支持客户端与服务器渲染：**可以使用 Node 进行服务器渲染，或使用 [React Native](https://facebook.github.io/react-native/) 开发原生移动应用。

## React为何高效

1) 虚拟(virtual)DOM, 不总是直接操作DOM、1) DOM Diff算法, 最小化页面重绘

# React 基本概念

## React 基本使用

### 相关JS库

react.js: **React的核心库**、react-dom.js: 提供**操作DOM的react扩展库**、babel.min.js: 解析JSX语法代码**转为纯JS语法代码的库**

**页面引入**

~~~html
<script type="text/javascript" src="./js/react.development.js"></script>
<script type="text/javascript" src="./js/react-dom.development.js"></script>
<script type="text/javascript" src="./js/babel.min.js"></script>
~~~



### 基础编码

~~~jsx
<script type="text/babel"> //必须声明babel
  // 创建虚拟DOM元素
  const vDom = <h1>Hello React</h1> // 千万不要加引号
  // 渲染虚拟DOM到页面真实DOM容器中
  ReactDOM.render(vDom, document.getElementById('test'))
</script>
~~~



### React Developer Tools

![调试工具](.\img\调试工具.jpg)



## 虚拟DOM

React提供了一些API来创建一种`特别`的js对象，他可以将虚拟DOM元素渲染到页面中的真实容器DOM中显示

~~~js
var element = React.createElement('h1', {id:'myTitle'},'hello')
~~~

### 纯JS创建虚拟DOM

~~~js
React.createElement('h1',  {id:'myTitle'},  title) // 一般不用
~~~

### JSX语法创建虚拟DOM

~~~jsx
<h1 id='myTitle'>{title}</h1>
~~~

### JSX插入数组虚拟DOM

~~~jsx
var li = [
  <li key=1>jquery<li>,<li key=2>angular<li>,<li key=3>zeptoo<li>
]
var ul = <ul>{li}</ul>
~~~





## JavaScript XML

react定义的一种类似于XML的JS扩展语法: XML+JS，他专门用来创建react虚拟DOM(元素)对象，它不是字符串, 也不是HTML/XML标签。但它最终产生的就是一个JS对象。这个JS对象包含着这个DOM的创建信息

~~~jsx
var ele = <h1>Hello JSX!</h1>
~~~

### JSX标签语法

~~~jsx
// JSX标签语法跟HTML标签语法一样
var ele = <h2>Hello JSX!</h2> // <div>Hello JSX!</div>
var ele = <h2 class=''>Hello JSX!</h2> // <div id="">Hello JSX!</div>
~~~

### 语法编译规则

遇到 < 开头的代码, 以标签的语法解析在转换为html同名元素
遇到 {  开头的代码，以**JS语法解析**



### babel编译JSX

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



## 组件事件绑定

~~~jsx
class Like extends React.Component {
  constructor (props) {
    super(props)
    // 初始化状态
    this.state = {isLikeMe: false}
    // 将新增方法的this绑定为组件对象
    this.change = this.change.bind(this)
  }
  render() {
    // 读取状态
    const text = this.state.isLikeMe ? '你喜欢我' : '我喜欢你'
    // 返回虚拟对象 虚拟对象绑定事件，注意：change方法this并不是组件对象，而是undefind
    return <h2 onClick={this.change}>{text}</h2>
  }
  change () {
    // 获取状态
    const isLikeMe = !this.state.isLikeMe
    // this.setState用来改变组件状态
    this.setState({isLikeMe})
  }
}
~~~



## 组件三大属性

**state 状态机**
用于保存动态数据的一个容器，通常定义在constructor中

~~~jsx
constructor(props) {
	super(props)
  this.state = {....} // 保存数据状态
}
~~~

**props 参数接收功能模块**
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

**refs 标识元素**
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

# 功能界面组件编程

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

# 表单数据绑定

1. **绑定动态数据：**![1](.\img\input\1.jpg)![2](.\img\input\2.jpg)*（此时input的值是固定的）*
2. **input绑定输入事件：**![3](.\img\input\3.jpg)
3. **根据input的值改变动态数据：**![4](.\img\input\4.jpg)

# 生命周期钩子

![图片1](.\img\图片1.png)

## 生命周期流程

~~~apl
a. 第一次初始化渲染显示: ReactDOM.render()
   \* constructor(): 创建对象初始化state
   \* componentWillMount() : 将要插入回调
   \* render() : 用于插入虚拟DOM回调
   \* componentDidMount() : 已经插入回调
b. 每次更新state: this.setSate()
   \* componentWillUpdate() : 将要更新回调
   \* render() : 更新(重新渲染)
   \* componentDidUpdate() : 已经更新回调
c. 移除组件: ReactDOM.unmountComponentAtNode(containerDom)
   \* componentWillUnmount() : 组件将要被移除回调
~~~

## 常用钩子

~~~apl
render(): 初始化渲染或更新渲染调用
componentDidMount(): 组件已经挂载完毕，用于开启监听, 发送ajax请求
componentWillUnmount(): 调用移出时的回调，用于做一些收尾工作, 如: 清理定时器
componentWillReceiveProps(): ......
~~~

# Diff 算法

## 虚拟DOM

一个虚拟DOM(元素)是一个一般的js对象, 准确的说是一个对象树(倒立的)。虚拟DOM保存了真实DOM的层次关系和一些基本属性，与真实DOM一一对应。如果只是更新虚拟DOM, 页面是不会重绘的

## diff 算法的基本步骤

用JS对象树表示DOM树的结构；然后用这个树构建一个真正的DOM树插到文档当中，当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异，把差异应用到真实DOM树上，视图就更新了

<img src=".\img\图片2.png" alt="图片2"  />

把树形结构按照层级分解，只比较同级元素，给列表结构的每个单元添加唯一的 key 属性，方便比较，

React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字），选择性子树渲染。

开发人员可以重写shouldComponentUpdate 提高 diff 的性能。

