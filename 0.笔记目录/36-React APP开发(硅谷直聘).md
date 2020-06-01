# 项目准备

## 项目描述

~~~
1) 此项目为一个前后台分离的招聘的 `SPA`, 包括前端应用和后端应用 
2) 包括用户注册/登陆, 大神/老板列表, 实时聊天等模块 
3) 前端: 使用 `React` 全家桶+`ES6`+`Webpack` 等技术 
4) 后端: 使用 `Node` + `express` + `mongodb` + `socketIO` 等技术 
5) 采用模块化、组件化、工程化的模式开发
~~~

## 项目技术栈

![技术栈]( \\img\React web App\技术栈.png)

## 前端路由

![前端路由]( \\img\React web App\前端路由.png)

## API接口

![API接口]( \\img\React web App\API接口.png)

## 流程及开发方法

熟悉一个项目的开发流程
模块化、组件化、工程化的开发模式
使用 create-react-app 脚手架初始化 react 项目开发
学会使用 node+express+mongoose+mongodb 搭建后台开发
使用 react-router-dom 开发单页应用
使用 axios 与后端进行数据交互
使用 redux+react-redux+redux-thunk 管理应用组件状态
使用 antd-mobile 组件库构建界面
使用 mongoose 操作 mongodb 数据库
使用 express 搭建后台路由
使用 socket.io 实现实时通信
使用 blueimp-md5 对密码进行 MD5 加密处理
使用 js-cookies 操作浏览器端 cookie 数据

## 编译打包测试

~~~
1) 编码测试
  npm start
  访问: http://localhost:3000
  编码, 自动编译打包刷新(live-reload), 查看效果
2) 打包发布
  npm run build
  npm install -g serve
  serve build
  访问: http://localhost:5000
~~~



## 前端React-cli目录设计

![目录设计]( \\img\React web App\目录设计.png)

# 项目初始化

## 配置路由与redux

~~~jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

// 定义路由功能组件引入
import { HashRouter, Route, Switch } from 'react-router-dom'

// 引入路由组件
import Register from './routes/register/register';
import Login from './routes/login/login';
import Main from './routes/main/main';

// 引入redux管理组件与数据库
import { Provider } from "react-redux";
import store from './redux/store'

// 页面渲染
ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route component={Main}></Route> {/* 根路径路由 */}
                </Switch>
            </HashRouter>
        </Provider>
    ),
    document.getElementById('root')
);
~~~



## 脚手架使用scss/sass扩展语言

`npm install node-sass -D`

## 加载less编译 antd按需加载&定制主题

`配置config-overrides.js`

~~~js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({ // 添加lessloader编译, 这时候在react组件中任意地方都可以使用less
    javascriptEnabled: true,
    modifyVars: { // 定制less变量(antd主题颜色)
      "@brand-primary": "#ff5722",
      "@brand-primary-tap": "#ffccbc",
      "@color-text-base-inverse": "#3f51b5"
    },
  })
);
~~~

## 应用中使用的antd组件

![antd组件]( \\img\React web App\antd组件.png)

## antd-mobile 组件使用

~~~jsx
// re
import {
    NavBar, // 导航栏
    WingBlank,  // 左右留白盒子
    List,   // 列表盒子
    InputItem,	// input表单
    WhiteSpace, // 上下间隙
    Radio, // 单选框
    Button // 按钮
} from "antd-mobile";
const div = (
    <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
            <List>
                <InputItem type='text'>用户名： </InputItem>
                <WhiteSpace />
                <InputItem type='password'>密码： </InputItem>
                <WhiteSpace />
                <InputItem type='password'>确认密码： </InputItem>
                <ListItem>
                    <span>用户类型：</span>
                    &nbsp;&nbsp;&nbsp;
                    <Radio>大神</Radio>
                    &nbsp;&nbsp;&nbsp;
                    <Radio>老板</Radio>
                    <Button type='primary'>注&nbsp;&nbsp;&nbsp;册</Button>
                    <Button>已有账户</Button>
                </ListItem>
            </List>
        </WingBlank>
    </div>
)
~~~

## antd-mobile input属性

| 属性         | 说明                                                         | 类型                | 默认值                                                       |
| :----------- | :----------------------------------------------------------- | :------------------ | :----------------------------------------------------------- |
| type         | 可以是银行卡`bankCard`; 手机号`phone`(此时最大长度固定为11,`maxLength`设置无效); 密码`password`; 数字`number` 以及其他标准 html input type 类型 | String              | `text`                                                       |
| value        | value 值                                                     | String              | 无                                                           |
| defaultValue | 设置初始默认值                                               | String              | -                                                            |
| placeholder  | placeholder                                                  | String              | ''                                                           |
| editable     | 是否可编辑                                                   | bool                | true                                                         |
| disabled     | 是否禁用                                                     | bool                | false                                                        |
| clear        | 是否带清除功能(仅`editable`为`true`,`disabled`为`false`才生效) | bool                | false                                                        |
| maxLength    | 最大长度                                                     | number              | 无。除money类型外，仅当text, email, search, password, tel, or url 有效 |
| onChange     | change 事件触发的回调函数                                    | (val: string): void | -                                                            |

# 后台脚手架构建

## 全局安装Express脚手架

`cnpm i express express-generator -g`

## 创建运行脚手架

**创建项目架构：**`express 项目名` 	或项目文件目录下	`express -ejs`

~~~
$ express -h
  Usage: express [options] [dir]
  Options:
    -h, --help          输出使用方法
        --version       输出版本号
    -e, --ejs           添加对 ejs 模板引擎的支持
        --hbs           添加对 handlebars 模板引擎的支持
        --pug           添加对 pug 模板引擎的支持
    -H, --hogan         添加对 hogan.js 模板引擎的支持
        --no-view       创建不带视图引擎的项目
    -v, --view <engine> 添加对视图引擎（view） <engine> 的支持 (ejs|hbs|hjs|jade|pug|twig|vash) （默认是 jade 模板引擎）
    -c, --css <engine>  添加样式表引擎 <engine> 的支持 (less|stylus|compass|sass) （默认是 css 引擎）
        --git           添加 .gitignore
    -f, --force         强制在非空目录下创建
~~~

**进入项目架构安装依赖项：**`cnpm i`

**项目目录运行后台：**`npm start`

## 更改后台端口号

~~~js
var port = normalizePort(process.env.PORT || '3000'); // 3000则是端口号
~~~

## 提供一个注册账号的接口

~~~js
// gzhipin-server/routes/index.js
// req 请求 res 响应
router.post('/register', (req, res) => {
  const { username, password } = req.body
  if (username !== 'admin') {// 注册成功
    // 返回响应
    res.send({ code: 0, data: { _id: 'abc', username: 'xxx', password: '123' } })
  } else { // 注册失败
    // 返回响应
    res.send({code: 1, msg: '此用户已存在'})
  }
})
~~~

## 后台应用自动重运行

安装：`cnpm i nodemon --save`

**配置`package.json/scripts`**

~~~json
"scripts": { "start": "nodemon ./bin/www" },
~~~

## 创建数据库&MD5加密

**后端脚手架安装：**`cnpm i mongoose blueimp-md5 --save`

### 创建模型集合

`db/models.js`

~~~js
/* 包含n个操作数据库集合数据的Model模块 */
// 连接数据库
mongoose.connect('mongodb://localhost/gzhipin_test', {useMongoClient: true})
mongoose.connection.once("open", ()=> console.log('数据库连接成功'))
mongoose.connection.once("close", ()=> console.log('数据库连接断开'))
// 引入MD5加密包
const md5 = require('blueimp-md5')
// 创建Schema(模式)对象
// 创建Schema(模式)对象
const userSchema = new mongoose.Schema({
    username: {type: String, required: true },
    password: {type: String, required: true},
    type: {type: String,  required: true},// dashen/laoban
    heander: String, // 头像
    post: String, // 职位
    info: String, // 个人或职位简介
    company: String, // 公司名称
    salary: String // 月薪
})
// 定义Model集合操作构造函数
const UserModel = mongoose.model('users', userSchema)

// 向外暴露集合操作构造函数
module.exports = {
    UserModel
}
~~~

## 定义注册的后台路由

~~~js
// routes/index.js
...
// 引入MD5加密包
const md5 = require('blueimp-md5')
// 引入集合操作构造函数
const { UserModel } = require('../db/models')
// 注册路由	
router.post('/register', (req, res) => {
  // 读取请求参数->处理->返回响应->
  const { username, password, type } = req.body
  // 对用户名查询
  UserModel.findOne({ username }, (error, doc) => {
    // 查询该用户
    if (!error && !doc) {// 不存在, 保存用户
      UserModel.create({ username, password: md5(password), type },
        (error, doc) => {
          // 生成一个cookie(userid: doc._id), maxAge(cookie存活时间)(毫秒单位)
          res.cookie('userid', doc._id, { maxAge: 1000 * 60 * 60 * 24 })
          // 返回注册成功响应
          res.send({ code: 0, data: { username, type, _id: doc._id } })
       })
    } else { // 如果用户存在, 返回失败响应, 该用户已存在
      res.send({ code: 1, msg: '该用户已存在' })
    }
  })
})
~~~

###### ###### 

## express cookies 操作

~~~js
req.cookies // 获取cookies{....}  
res.clearCookie('[cookie_key]') // 告诉浏览器删除cookie
~~~

## express 获取请求参数

~~~js
router.get('/', (req,res)=>{
  req.query // 通常get携带参数的链接key=val
  req.body // 通常post携带参数的请求体key=val
})
~~~

## 实现自动登录逻辑

~~~jsx
componentDidMount() {
  	// 异步根据用户id获取用户数据并更新redux
    const userid = Cookies.getItem('userid')
    const {_id} = this.props.[reduxState]
    if(userid && !_id){
        this.props.getUser() // getUser() 是action方法, 用于更新redux的用户数据
    }
}
render () { 
  const userid = Cookies.getItem('userid')
  const {user} = this.props.[reduxState] 
  // 如果cookie中有userid, 但redux没有数据, 代表需要获取对应的用户数据, 则暂时不做任何展示
  if(userid && user){
    return null
  }else {
    // 当redux对应user有值, 将会重新渲染render, 并会进入以下判断

    let path = this.props.location.pathname

    // 判断是否是当前根路径
    if(path === '/'){
      // 根据用户信息重定向对应的路由界面(登录/主界面/信息完善界面)
      path = gerRedirectTo({user.type, user.header}
      return <Redirect to={path}/>
    }
  }
  // 如果有userid, 但是路径不是根路径, 则跳转到子路径
  return (
  	<Switch>
    	<Route path='/dasheninfo' component={DashenInit}/>
      <Route path='/laobaninfo' component={LaobanInit}/>
    </Switch>
  )
}

~~~

# antd-mobile 语法参考

~~~js
import {
    NavBar, // 导航栏
    WingBlank,  // 左右留白盒子
    List,   // 列表盒子
    InputItem, // input组件
    WhiteSpace, // 上下间隙
    Button, // 按钮
  	TextareaItem,
} from "antd-mobile";
~~~

## InputItem 表单api

~~~jsx
<InputItem
    placeholder='请输入用户名'	// (基本跟html标签一样)
    type='text'	// 类型
    onChange={val => this.handleChange('username', val)} // 改变回调
>用户名：</InputItem>

<TextareaItem
    count={2000} // 限制字符
    rows={6}		// 显示行数
    placeholder='请输入个人介绍'	// 提示
    onChange={val => { this.handleChange('info', val) }}	 // 改变回调
  	onFocus={val => { this.handleChange('info', val) }} // 焦点回调
/>
~~~

## Grid 宫格api

~~~jsx
// 解决Grid 显示异常bug
function show() {
  if(!this.state.isShow){ // 当要显示时
      setTimeout(() => {
          // 异步分发resize,  解决Grid显示与隐藏bug
          window.dispatchEvent(new Event('resize'))
      }, 0);
  }
}
<Grid
    data={this.headerArr}	// 传入每个宫格的文本以及图片[{text:'头像1', icon:require('a.png')}...]
    columnNum={5} // 一行显示的列数
    onClick={this.handleChange}	// 每个宫格的回调 回调参数是(el:{text,icon}, index:0)
  	carouselMaxRow={3} // 行最大限制
  	isCarousel // 超出数量是否轮播
  	onClick={el=>{}} // 每个元素点击事件 每个el对应text和其他数据
/>
~~~

## TabBar 标题栏api

~~~jsx
import { TabBar } from "antd-mobile";
// TabBar中有Item组件, 用于每一个框的样式设置
const TabBarItem = TabBar.Item;
<TabBar>
	<TabBarItem 
  	key={route.path}
    icon={{uri:require(`.img/a.png`)}} // 默认样式 
    selectedIcon={{uri:require(`.img/a-selected.png`)}} // 选中样式
    selected={true} // 是否被选中
    title={'个人信息'} // 标题框字体是什么 
    onPress={ ()=>{...} } // 标题框点击事件
  />
</TabBar>
~~~

## Result 结果页api

~~~jsx
import { Result } from "antd-mobile";
import img from '../img/p.png';
<Result
	img={{<img src={img}/>}} // 图片
  title={'张山'} // 结果文本
  message={'IBM'} // 描述
/>
~~~

## List 列表框api

~~~jsx
import { List } from "antd-mobile";
// 列表有Item组件, 代表一个列
const Item = List.Item
// Item有Brief, 代表一行简报
const Brief =Item.Brief;
<List renderHeader={'相关信息'}>
  <Item
   	extra={'右边提示文字'}
    onClick={()=>'点击回调'}
    thumb={require('左边图标')}
   >
  
  </Item>
</List>
~~~



## Modal 对话框api

~~~jsx
import { Modal } from "antd-mobile";
const {alert, // 警告对话框
       prompt, // 输入对话框
       operation, // 多个按钮对话框
} = Modal
~~~

## Card 卡片框api

~~~jsx
import { Card } from "antd-mobile";
const CardHeader = Card.Header; // 卡片的头部
const CardBody = Card.Body; // 卡片的内容
<Card>
  <CardHeader
  	title={} // 头部信息(右侧)
    thumb={require('./img/p.png')} // 头部图标(右边)
  />
  <CardBody> {/* 卡片内容 */}
  	This is content of `Card` 
  </CardBody>
</Card>
~~~

## Badge 标记数量图标(红色)

~~~jsx
<Badge text={0}/> // 0则没有任何显示
~~~

## 实现页面进出场动画

~~~jsx
import QueueAnim from 'rc-queue-anim';
<QueueAnim
  type='' // 动画类型
  >
	<div></div>
  <div></div>
  <div></div>
</QueueAnim>
~~~

# 实现实时聊天 socked.io

socket.io 是一个能实现多人远程实时通信(聊天)的库，它包装的是H5 WebSocket和轮询, 如果是较新的浏览器内部使用WebSocket, 如果浏览器不支持, 那内部就会使用轮询实现实时通信。
https://socket.io/get-started/chat/  https://blog.csdn.net/neuq_zxy/article/details/77531126

实现方式：`客户端进入聊天界面-->连接服务器; 客户端发送消息-->服务器接收存入数据库,服务器把数据发送给客户端与目标客户端-->客户端获取数据展现`

**前端脚手架与后端脚手架安装：**`cnpm i --save socket.io`

## 服务端

`socketIO/test.js`

~~~js
module.exports = function (server) {
    // 得到 IO 对象
    const io = require('socket.io')(server)

    // 监视连接, 当有一个客户端连接上的回调
    io.on('connection', function (socket) {
        console.log('用户成功连接')

        // 自定义监听事件,  接收单个客户端发送的消息
        socket.on('sendMsg', function (data) {
            console.log('服务器端接收浏览器的消息', data)
            
            // 自定义发送消息事件 (名称, 数据)
            // io与socket都可以绑定发送与监听事件, io是全体连接, socket是单个连接
            io.emit('receiveMsg', data.name + '_' + data.date)
        })
    })
}
~~~

`bin/www`

~~~js
var server = http.createServer(app);
// node服务器添加socketIO事件
require('../socketIO/test')(server)
~~~

## 客户端

`src/test/socketio_test.js`

~~~js
// 引入客户端 io
import io from 'socket.io-client'
// 连接服务器, 得到代表连接的 socket 对象
const socket = io('ws://localhost:4000')
// 绑定'receiveMessage'的监听, 来接收服务器发送的消息
socket.on('receiveMsg', function (data) {
  console.log('浏览器端接收到消息:', data)
})
// 向服务器发送消息
socket.emit('sendMsg', {name: 'Tom', date: Date.now()})
console.log('浏览器端向服务器发送消息:', {name: 'Tom', date: Date.now()})
~~~

# React-cli 常见问题&技巧

## 解决跨域问题

`/package.json`

~~~json
// 添加代理服务器
"proxy":"http://localhost:4000"
~~~

## 引入图片标签

小图片由路径引入, 引入方式支持`ES6,require`

~~~jsx
import imgBase64 from './a.png'
const img = <img src={imgBase64} />
// or
const imgBase64 require('./a.png')
const img = <img src={imgBase64} />
~~~

## React-router/Redirect的作用

Redirect可以在渲染render函数中重定向路由路径

~~~jsx
render() {
  const path = '/login'
  return <Redirect to={path} />
}
~~~



## React-router/ route 匹配任意路径

~~~jsx
<Switch>
    <Route path='/dasheninfo' component={DashenInit}/> 
    <Route path='/laobaninfo' component={LaobanInit}/>
  	{/*当不匹配上方任意路径时显示*/}
  	<Route component={NotFound}/>
</Switch>
~~~

## React-router/ 利用数组遍历路由组件

~~~jsx
//...
routes = [
	{path: '/laoban', component:Laoban},
  {path: '/dashen', component:Dashen}
  //.....
];
<Switch>
    { routes.map( route => <Route path={route.path} component={route.component} /> ) }
</Switch>
~~~

## React-PropTypes 简写插件规则

~~~js
pt // PropTypes
s,f,n,a,b // string func number array bool
r // isRequired
pt[s,f,n,a,b]r // ---> PropTypes.[string func number array bool].isRequired
cmd // ---> componentDidMount 渲染完毕执行函数(发送ajax请求,或者其他操作)
~~~

## React-router 非路由组件使用路由api

~~~jsx
import { withRouter } from "react-router-dom";
const dashen = () => {
  	const path = this.props.location.pathname
    return (
        <div></div>
    );
}

export default withRouter(dashen);
~~~

## 编译后页面空白

`/package.json`

~~~json
"homepage": "./", // 所有资源根路径
~~~

# 自定义redux和react-redux

## 理解redux模块

`redux模块整体是一个对象模块、内部包含几个函数`

~~~js
// reducers: function(state, action){ return newState}
createStore(reducers)  
// reducers: {reducer1, reducer2}  返回: function(state, action){ return newState}
combineReducers(reducers)
// 暂不实现
applyMiddleware()
~~~

## store对象的功能

~~~js
// 返回当前state
getState()
// 分发action: 调用reducers()得到新的总state, 执行所有已注册的监听函数
dispatch(action)
// 订阅监听: 将监听函数保存起来
subscibe(listener)
~~~

## 理解react-redux模块

`react-redux模块整体是一个对象模块、包含2个重要属性: Provider和connect`

~~~js
/ Provider
    值: 组件类
    作用: 向所有容器子组件提供全局store对象
    使用: // <Provider store={store}><Xxx/></Provider>
/ connect
    值: 高阶函数
    作用: 包装组件生成容器组件, 让被包装组件能与redux进行通信
    使用: // connect(mapStateToProps, mapDispatchToProps)(Component)
~~~

## 理解react-Context模块

Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

~~~jsx
//父组件:创建一个context
const {Provider, Consumer} = React.createContext(defaultValue);
//....
render () {
  // Provider: 生产者, 主要数据来源
  return (
    <Provider value={'contextQAq'}>
    	</son>
    </Provider>
  )
}
//....
~~~

~~~jsx
//子组件:接收父级的数据
const {Provider, Consumer} = React.createContext(defaultValue);
//....
render () {
  // Provider: 消费者, 使用数据
  return (
    <Consumer>
      {(name)=> 
      	<div>{name}</div>
      }
    </Consumer>
  )
}
//....
~~~

~~~jsx
// 子组件在生命回调中使用
const myContext = React.createContext(defaultValue);
//....
static contextType = MyContext;
componentDidMount () {
  console.log(this.context) // >> context的值：contextQAq
}
//....
~~~

