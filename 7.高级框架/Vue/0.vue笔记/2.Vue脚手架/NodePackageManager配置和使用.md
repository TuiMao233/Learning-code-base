# NPM(Node Package Manager)

CommonJS包规范是理论，NPM是其中一种实践。
对于Node而言，NPM帮助其完成了第三方模块的发布、安装和依赖等。借助NPM，Node与第三方模块之间形成了很好的一个生态系统。

~~~
– 查看版本
	• npm –v
– 帮助说明
	• npm
– 查看所有模块的版本
	• npm version
– 搜索模块包
	• npm search 包名
–下载当前项目所依赖的包
	• npm install
– 在当前目录安装包
	• npm install 包名
– 全局模式安装包（全局安装的包一般都是一些工具）
	• npm install 包名 –g
– 安装包并指定版本
	• npm install 包名@1	|-这里会下1点几版本的最新版本，也可以指定详细版本1.2.4....-| 
– 安装包并添加到依赖中
	• npm install 包名 –save-dev 简写：-S-D
– 删除一个模块
	• npm remove 包名
– 从本地安装
	• npm install 文件路径
– 从镜像源安装
	• npm install 包名 –registry=地址
– 设置镜像源
   • npm config set registry 地址

~~~

## 通过npm下载的包都放到node_modules文件夹中

我们通过npm下载的包，直接通过包名引入即可
node在使用模块名字来引入模块时，它会首先在当前目录的node_modules中寻找是否含有该模块
如果有则直接使用，如果没有则去上一级目录的node_modules中寻找
如果有则直接使用，如果没有则再去上一级目录寻找，直到找到为止
直到找到磁盘的根目录，如果依然没有，则报错

## NPM本地仓库地址配置

1. **配置本地仓库地址**
   在指定地址创建`node_global`和`node_cache`
   运行配置指令`npm config set prefix "D:\nodejs\node_global"`
   					  `npm config set cache "D:\nodejs\node_cache"`
2. **检测本地仓库**
   `npm list -global`
3. **配置镜像站**
   `npm install -g cnpm --registry=https://registry.npm.taobao.org`
4. **查看c盘配置文件仓库地址**
   `C:\Users\Administrator\.npmrc`
5. **添加新的环境变量**
   `环境变量NODE_PATH内容是：D:\nodejs\node_global\node_modules`
6. **编辑环境变量PATH**
   `D:\nodejs\node_global`

**Browserify**
`npm install browserify -g`
`npm install uniq --save`
**vue，vue-cll**
`npm install vue -g`
`npm install vue-router -g`
`npm install Vue-cli -g`

## package.json文件说明解释

~~~javascript
{
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

## Node文件引入包

~~~javascript
// 语法：require('包名')
var math = require('math')
console.log(math.add(123,456))
~~~

## ES6引入包

~~~javascript
// 语法：xxx 
import xxx = 'xxx'
~~~
