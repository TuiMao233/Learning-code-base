# NPM  包管理工具

`CommonJS`包规范是理论，`NPM (Node Package Manager)` 是其中一种实践。对于`Node`而言，`NPM`帮助其完成了第三方模块的发布、安装和依赖等。借助`NPM`，`Node`与第三方模块之间形成了很好的一个生态系统。

~~~markdown
# 查看版本
	• npm –v
# 帮助说明
	• npm
# 查看所有模块的版本
	• npm version
# 搜索模块包
	• npm search 包名
# 下载当前项目所依赖的包
	• npm install
# 在当前目录安装包
	• npm install 包名
# 全局模式安装包（全局安装的包一般都是一些工具）
	• npm install 包名 –g
# 安装包并指定版本
	• npm install 包名@1	|-这里会下1.几版本的最新版本，也可以指定详细版本1.2.4....-| 
# 安装包并添加到依赖中
	• npm install 包名 –save-dev 简写：-S-D
# 删除一个模块
	• npm remove 包名
# 从本地安装
	• npm install 文件路径
# 从镜像源安装
	• npm install 包名 –registry=地址
# 设置镜像源
	• npm config set registry 地址
# 初始化项目
	• npm init
# 用户登录 (本机第一次发布包)
	• npm adduser
# 用户登录 (非第一次发布项目)
	• npm login
# 上传该项目
	• npm publish
~~~

## NPM 包的引入机制

通过`npm`下载的包，直接通过包名引入即可。`node`在使用模块名称来引入模块时，它会先在当前目录的node_modules中寻找是否含有该模块。如果有则直接使用，如果没有则去上一级目录的`node_modules`中寻找，如果有则直接使用，如果没有则再去上一级目录寻找，直到找到磁盘的根目录，如果依然没有，则报错。

## NPM 本地仓库地址配置

1. **配置本地仓库地址**
   在指定目录创建`node_global`和`node_cache`

2. **运行配置指令**

~~~nginx
npm config set prefix "D:\nodejs\node_global"
npm config set cache "D:\nodejs\node_cache"
~~~

## NPM 基本配置命令

1. **检测本地仓库**
   `npm list -global`
2. **配置镜像站**
   `npm install -g cnpm --registry=https://registry.npm.taobao.org`
3. **查看c盘配置文件仓库地址**
   `C:\Users\Administrator\.npmrc`
4. **添加新的环境变量**
   `环境变量NODE_PATH内容是：D:\nodejs\node_global\node_modules`
5. **编辑环境变量PATH**
   `D:\nodejs\node_global`


## package 文件代码解析

~~~javascript
{
  "scripts":{}, // 包命令
  "name": "myName",	// 包的名字
  "version": "1.x.1",	// 包的版本
  "description": "description",	// 包的描述
	"homepage": "www.xxx.com",	// 包的官网url
  "dependencies": {...},	// 生产依赖环境
  "devDependencies": {...},	// 开发s依赖环境
  "repository": {...}, // 包代码的Repo信息
  "main":"./...",	// main 字段指定了程序的主入口文件
  "keywords":"xx" // 关键字
}
~~~

## JS 中引入NPM 包

~~~javascript
// node.js语法：require('包名')
var math = require('math')
console.log(math.add(123,456))
// ES6语法:import xxx from '包名'
var xxx from 'math'
~~~

