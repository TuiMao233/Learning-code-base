---
title: webpack 详细配置
date: 2020-11-01
categories:
  - 前端学习笔记
tags: 
  - webpack
---
## entry: 入口起点

**接口：`string --> './src/index.js'`**

~~~javascript
entry:'./src/index.js'
~~~

打包形成一个`chunk`。 输出一个`bundle`文件。此时chunk的名称默认是 `main`。

**多接口：`array  --> ['./src/index.js', './src/add.js']`**

~~~javascript
entry:['./src/index.js', './src/add.js']
~~~

所有接口文件最终只会形成一个`chunk`, 输出一个`bundle`文件。在用`HMR`热加载的时候，让`html`生效的时候加上`html`文件的路径，此时`chunk`的名称是`main`。

**多接口：`object  --> {key:value,key:value.....}`**

~~~javascript
entry:{index: './src/index.js', add: './src/add.js'}
~~~

 有几个入口文件就形成几个`chunk`，输出几个`bundle`文件， 此时`chunk`的名称是 `key`

**特殊用法：`object + array --> {key:array}`** 

~~~javascript
entry:{index: ['.src/index.js', '/src/conut.js'], add:'./src/add.js'}
~~~

## output 输出对象

**文件名称（指定名称+目录）**
` filename: 'js/[name].js',`

**输出文件目录（将来所有资源输出的公共目录）**
`path: resolve(__dirname, 'build'),`

**所有资源引入公共路径前缀** `--> 'imgs/a.jpg' --> '/imgs/a.jpg'`
` publicPath: '/'`
**当前路径下查找** `imgs/a.jpg`
**服务器根目录查找** `/imgs/a.jpg` 一般用于生产环境

**非入口chunk的名称** `在js中通过import('path').then(()=>{})的非入口chunkjs名称`
`chunkFilename: 'js/[name]_chunk.js'`

**输出库向外暴露的变量名**
` library: '[name]'`
**暴露变量名添加到某个属性上**
`libraryTarget: 'window' // 变量名添加到哪个上 browser`
`libraryTarget: 'global' // 变量名添加到哪个上 node`
`libraryTarget: 'commonjs'`

~~~javascript
module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
    // library: '[name]', // 整个库向外暴露的变量名
    // libraryTarget: 'window' // 变量名添加到哪个上 browser
    // libraryTarget: 'global' // 变量名添加到哪个上 node
    // libraryTarget: 'commonjs'
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
};
~~~

## loader的配置

`module:{rules:[loader...]}`

**多个loadwer用use**

~~~javascript
{test: /\.css$/,use: ['style-loader', 'css-loader']},
~~~

**单个loader用loader**

~~~javascript
{test: /\.js$/,loader: 'eslint-loader'},
~~~

**排除node_module下的js文件** `exclude`

~~~javascript
{test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'},
~~~

**只检查src下的js文件** `include`

~~~javascript
{test: /\.js$/, include: resolve(__dirname, 'src'), loader: 'eslint-loader'},
~~~

**执行顺序**  `enforce`

~~~javascript
{test: /\.js$/, enforce: 'pre', loader: 'eslint-loader'},
  // pre 优先执行，post 延后执行
~~~

**只生效一个loader** `oneOf[]`

~~~javascript
{oneOf:[loader...]}
~~~

**loader配置选项** `options`

~~~javascript
{test: /\.js$/, options:{...}}
~~~

## resolve 配置

`resolve:{....}`

**配置解析模块路径别名:** 优点简写路径 缺点路径没有提示

~~~javascript
// resolve{alias:{}}
alias: {$css: resolve(__dirname, 'src/css')}
// index.js
import '$css/index.css'
~~~

**配置省略文件路径的后缀名**

~~~javascript
// resolve{extensions:[]}
extensions: ['.js', '.json', '.jsx', '.css']
// index.js
import '$css/index'
~~~

 **webpack 解析模块路径** `默认会上级查找到根目录(硬盘)`

~~~javascript
// resolve{modules:[]}
modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
~~~

## devServer 配置

`devServer:{...}`

**运行代码的目录**
`contentBase: resolve(__dirname, 'build'),`

**启动gzip压缩**
` compress: true,`

**端口号**
 `port: 5000,`

**自动打开浏览器**
`open: true,`

**开启热加载(hot)**
`hot: true,`

**不要显示启动服务器日志信息**
 `clientLogLevel: 'none',`

**如果出错了，不要全屏提示~**
 `overlay: false,`

**除了一些基本启动信息以外，其他内容都不要显示**
 `quiet: true,`

**监视 contentBase 目录下的所有文件，一旦文件变化就会 reload**
`  watchContentBase: true,`

**忽略文件**
`watchOptions: {ignored:'/node_modules'}`

**服务器代理 --> 解决开发环境跨域问题**

~~~javascript
 proxy: { // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      '/api': {
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''}
      }
}
~~~

## optimization 配置

分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk

### 基本配置

`optimization:{splitChunks:{....}}`

**选择哪些块进行优化**
`chunks:''`这表明将选择哪些块进行优化。当提供一个字符串，有效值为`all`，`async`和`initial`。提供`all`可能特别强大，因为它意味着即使在异步和非异步块之间也可以共享块。

**分割chunk最小值**
`minSize: 30 * 1024`

**分割chunk最大值**
`maxSiza: 0` // 0表示最大没有限制

**提取chunk最少被引入多少次**
`minChunks: 1`

**按需加载时并行加载的文件的最大数量**
`maxAsyncRequests: 5`

**入口js文件最大并行请求数量**
`maxInitialRequests: 3`

**名称连接符**
`automaticNameDelimiter: '~'`

**可以使用命名规则**
`name: true`

### chunk 组分割

`optimization:{splitChunks:{cacheGroups:{....}}}`

`node_modules`文件会被打包到 `vendors` 组的`chunk`中。`--> vendors~xxx.js`
并且需要满足上面的公共规则，如：大小超过30kb，至少被引用一次。

~~~javascript
cacheGroups: { // 分割chunk的组
  // test：正则，priority：优先级
	vendors: {test: /[\\/]node_modules[\\/]/, priority: -10},
  // minChunks：要提取的chunk最少被引用次数，priority：优先级
  // euseExistingChunk：如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
	default: {minChunks: 2,priority: -20,euseExistingChunk: true} 
}
~~~

**将当前模块的记录其他模块的hash单独打包为一个文件 runtime`optimization: {runtimeChunk:{...}}`**

解决：修改a文件导致b文件的`contenthash`变化

~~~javascript
runtimeChunk: {name: entrypoint => `runtime-${entrypoint.name}`}
~~~

**配置生产环境的压缩方案`optimization: {minimizer:[.....]}`**
**安装：**`cnpm i html-webpack-plugin -D`

~~~javascript
// 引入库
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 配置生产环境的压缩方案：js和css
new TerserWebpackPlugin({
	// 开启缓存
	cache: true,
	// 开启多进程打包
	parallel: true,
	// 启动source-map
	sourceMap: true
})
~~~

