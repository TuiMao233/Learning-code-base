# webpack基础概念

webpack 是一种前端资源构建工具，一个静态模块打包器(module bundler)。 在 webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理。 它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)

![1582766241(1)](.\img\wepack官方图.jpg)

## webpack 五个核心

**Entry：**入口`(Entry)`指示 `webpack` 以哪个文件为入口起点开始打包，分析构建内部依赖图。
**Output：**输出`(Output)`指示 `webpack` 打包后的资源 `bundles` 输出到哪里去，以及如何命名。
**loader：**`Loader `让 `webpack` 能 够 去 处 理 那 些 非 `JavaScript` 文 件 `(webpack 自 身 只 理 解 JavaScript)`
**Plugins：**插件`(Plugins)`可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩， 一直到重新定义环境中的变量等。
**Mode：**模式(Mode)指示 webpack 使用相应模式的配置。

| 选项        | 描述                                                         | 特点                        |
| ----------- | ------------------------------------------------------------ | :-------------------------- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 | 能让代码本地调试 运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线 运行的环境 |

# webpack基础命令

**安装：**`npm install webpack webpack-cli -g`

**开发环境指令：**`webpack src/js/index.js -o build/js/built.js --mode=development`
**功能：**webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成 浏览器能识别的语法。

**生产环境指令：**`webpack src/js/index.js -o build/js/built.js --mode=production`
**功能：**在开发配置功能上多一个功能，压缩代码。

1. `webpack` 能够编译打包 `js` 和 `json` 文件。
2. 能将 `es6` 的模块化语法转换成浏览器能识别的语法。
3. 不能编译打包 `css、img` 等文件，
4. 不能将 `js` 的 `es6` 基本语法转化为 `es5` 以下语法。

**node绝对路径与相对路径片段拼接：**`path.resolve(absoPath, relaPath)` 
**相对路径(rela)：**`build/js`
**绝对路径(abso)：**`D:\web学习库\6.自动化构建工具\webpack\02.webpack初体验`
**resolve拼接：**`D:\web学习库\6.自动化构建工具\webpack\02.webpack初体验\build\js`

**配置接口`js`文件**

~~~javascript
// 引入资源
import data from './data.json';
console.log(data);
function add(x, y) { return x + y; }
console.log(add(1, 2));
~~~

**创建配置文件**`webpack.config.js`

~~~javascript
const { resolve } = require('path'); // node 内置核心模块，用来处理路径问题。
module.exports = {
  // 接口文件
	entry: './src/js/index.js', 					
	// 输出配置
	output: { 
		filename: './built.js', 						// 输出文件名
		path: resolve(__dirname, 'build/js') // 输出文件路径配置
	},
	mode: 'development' //开发环境
};
~~~

**运行指令：** `webpack`，此时功能只能编译打包`js`和`json`

[^注意]:输出配置路径必须得是绝对路径

**页面进行引入**

~~~html
<script src="build/js/built.js" type="text/javascript" charset="utf-8"></script>
~~~

# webpack 打包样式资源

**安装 loader 包：**`npm i css-loader style-loader less-loader less -D`

**配置接口`js`文件**

~~~javascript
// 引入样式资源
import './index.css';
import './index.less';
~~~

**配置`webpack.config.js`文件**

~~~javascript
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');
module.exports = {
	entry: './src/index.js',		// 接口js
	output: {...},						 // 输出配置
	mode: 'development',			 // 开发模式
	// module{rules}插件配置的集合
	module: {rules:[ // rules是loader配置
      {	 test: /\.css$/,
				// 配置所需的loader插件进行处理
				// use数组中loader执行顺序：从右到左，从下到上 依次执行
				// 顺序可以利用reverse进行倒叙排序 这样符合人类思维
				use: ['css-loader', 'style-loader'].reverse(),
				// css-loader: 将css文件变成commonjs模块加载js中，里面内容是样式字符串
				// style-loader: 创建style标签,将js中的样式字符串资源插入行,添加到head中生成
			},
			{	test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
				// less-loader: 将less编译为css,然后在通过 css-loader,style-loader创建的style标签插入head中
			}
	]}
}
~~~

**运行指令：** `webpack`

**页面进行引入**

~~~html
<script src="build/js/built.js" type="text/javascript" charset="utf-8"></script>
~~~

# webpack 打包html资源

**安装plugin：**`npm i html-webpack-plugin -D`
**功能：**默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）

**配置`webpack.config.js`文件**

~~~javascript
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');
// 引入webpack html打包插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/index.js',		// 接口js
	output: {...},						 // 输出配置
	mode: 'development',			 // 开发模式
	module: {rules:[....]} 		 // module{rules} loader：插件的配置
  plugins: [ // plugins的配置
		new HtmlWebpackPlugin({
			template: './src/index.html'
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
		})
	],
}
~~~

**运行指令：** `webpack`

# webpack 处理html图片资源

**安装三个插件：**`npm install html-loader url-loader file-loader --save-dev`
**html-loader：**将HTML导出为字符串
**url-loader：**将HTML中的url链接文件调用`file-loader`进行预处理
**选项：**`limit:number`当文件小于多少时转换为`base64 URI`
	   	`esModule: fool`是否开启`es6`模块化解析，关闭时启用`commonjs`模块化解析
	   	`name:name` 给处理后的文件起名字，内置表达式`[hash:10]`表示哈希值前10位，`[ext]`表示文件后缀

**file-loader：**将文件进行预处理

~~~javascript
const { resolve } = require('path');
module.exports = {	
	entry: './src/index.js',		// 接口js
	output: {...},						 // 输出配置
	mode: 'development',			 // 开发模式
	module: {rules:[
    // 处理less
    {test: /\.less$/,use: ['style-loader', 'css-loader', 'less-loader']},
    // 解析html为字符串，这样操作html标签的方法才能拿到数据
    {	test: /\.html$/,loader: 'html-loader' },
    // 处理html字符串中url链接的jpg|png|gif文件
    {	test: /\.(jpg|png|gif)$/,
			loader: 'url-loader',
			options: {
       // 当文件小于多少时转换为base64-uri
			limit: 8 * 1024,
       // 因为html-loader的数据是用commonjs定义的，但是url-loader是用ES6解析的，
       // 所以要将url-loader的解析模式设置	  为commonjs模块解析，这样url-loader才能拿到数据
       // esModule: false 关闭ES6模块解析，开启commonjs模块解析
			esModule: false,
       // 给处理过的文件重新命名，哈希值前10位.文件后缀
			name: '[hash:10].[ext]'
			}
		}
  ]}
  // 复制处理后的html到指定位置,并自动引入打包输出
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],	
}
~~~

**运行指令：** `webpack`

# webpack 处理其他资源

**插件：**`file-loader`

~~~javascript
const { resolve } = require('path');
module.exports = {	
	entry: './src/index.js',		// 接口js
	output: {...},						 // 输出配置
	mode: 'development',			 // 开发模式
	module: {rules:[
    // 处理css
    {test: /\.css$/, use: ['style-loader', 'css-loader']},
    // 打包其他资源 
    {exclude: /\.(css|js|html|less|jpg|png|gif)$/, // 排除css/js/html资源
     loader: 'file-loader',
     options: {name: '[hash:10].[ext]'}// 资源重命名
     }
  ]}
  // 复制html到指定位置,并自动引入打包输出
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],	
}
~~~

# devServer 开发服务器

**项目安装webpack：**`npm i webpack -D`
**安装webpack-dev-server：**`npm i webpack-dev-server -D`
**开发服务器 devServer：**自动编译，自动打开浏览器，自动刷新浏览器~~
										编译时只会在内存中编译打包，不会有任何输出
**启动devServer指令：**`npx webpack-dev-server`

~~~javascript
const { resolve } = require('path');
module.exports = {	
	entry: './src/index.js',		// 接口js
	output: {...},						 // 输出配置
	mode: 'development',			 // 开发模式
	module: {rules:[
    // 处理css
    {test: /\.css$/, use: ['style-loader', 'css-loader']},
    // 打包其他资源 
    {exclude: /\.(css|js|html|less)$/,  loader: 'file-loader',options: {name: '[hash:10].[ext]'}}
  ]}
  // 复制html到指定位置,并自动引入打包输出
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],	
  // 设置开发服务器
  devServer: {
    contentBase: resolve(__dirname, 'build'),	// 项目构建后路径
    compress: true,													// 启动gzip压缩,可以提升运行速度
    port: 3000,															// 端口号
    open: true															// 自动打开浏览器
  }
}
~~~

[^注意]:hot模块只在本地的webpack的目录下查找，找不到就报错，全局安装webpack也不行，所以必须得在局部安装一遍

# webpack开发环境配置集

**插件：**`cnpm i webpack webpack-dev-server html-loader url-loader file-loader css-loader style-loader less-loader less html-webpack-plugin -D`
**打包输出到文件夹：**`webpack` 
**内存编译运行项目：** `npx webpack-dev-server`

~~~javascript
// 内置核心模块,用于拼接绝对路径与相对路径
const {resolve} = require('path')
// 打包html方法
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: './src/js/index.js',// js接口文件
	output: {filename: './built.js',path: resolve(__dirname, 'build')},// 输出文件
	mode: 'development',			// 开发/生成模式
	module: {rules:[ // 插件配置
		{   // 打包css样式
			test: /\.css$/,
			use:['style-loader','css-loader']
		},{ // 编译打包less样式
			test: /\.less$/,
			use:['style-loader','css-loader','less-loader']
		},{ // 解析html为字符串
			test: /\.html$/,
			loader: 'html-loader'
		},{ // 处理html字符串的图片url,并打包图片
			test: /\.(jpg|png|gif)$/,
			loader: 'url-loader',
			options: {limit: 8*1024, esModule: false, name:'[hash:10].[ext]'}
		},{ // 处理打包其他资源
			exclude: /\.(css|js|html|less|jpg|png|gif)$/,
			loader: 'file-loader',
			options: {name: '[hash:10].[ext]'}
		}
	]},
	// 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
	plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
	// 开发服务器(devServer)配置
	devServer: {
		contentBase: resolve(__dirname, 'build'),
		compress: true,port: 3000,open: true
	}
}
~~~

