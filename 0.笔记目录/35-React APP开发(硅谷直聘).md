# 项目准备

## 项目描述

1) 此项目为一个前后台分离的招聘的 `SPA`, 包括前端应用和后端应用 
2) 包括用户注册/登陆, 大神/老板列表, 实时聊天等模块 
3) 前端: 使用 `React` 全家桶+`ES6`+`Webpack` 等技术 
4) 后端: 使用 `Node` + `express` + `mongodb` + `socketIO` 等技术 
5) 采用模块化、组件化、工程化的模式开发

## 项目技术栈

![技术栈](D:\web学习库\0.笔记目录\img\React web App\技术栈.png)

## 前端路由

![前端路由](D:\web学习库\0.笔记目录\img\React web App\前端路由.png)

## API接口

![API接口](D:\web学习库\0.笔记目录\img\React web App\API接口.png)

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

![目录设计](D:\web学习库\0.笔记目录\img\React web App\目录设计.png)



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

![antd组件](D:\web学习库\0.笔记目录\img\React web App\antd组件.png)

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

# 创建数据库&MD5加密

**后端脚手架安装：**`cnpm i mongoose blueimp-md5 --save`

## 创建模型集合

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

# 定义注册的后台路由

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

###### 