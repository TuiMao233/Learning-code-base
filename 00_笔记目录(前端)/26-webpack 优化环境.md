# HMR热加载模块(开发)

没有进行优化，就会导致100个模块， 修改一个，100个模块全部重新打包。这样运行速度就会很慢，开发体验就会很不友好

**HMR：**`hot module replacement`热模块替换 / 模块热替换
	**作用：**一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块），可以极大的提升构建速度

**开发服务器 ( devServer ) 可以进行热加载配置**

~~~javascript
devServer: {
		contentBase: resolve(__dirname, 'build'), 
		compress: true, port: 3000, open: true,
    // 热加载启动
		hot: true
}
~~~

 **样式文件：**可以使用`HMR`功能：因为`style-loader`内部实现了~
 **`JS`文件：**默认不能使用`HMR`功能 --> 需要修改`js`代码，添加支持`HMR`功能的代码

~~~javascript
// 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
if (module.hot) {
  // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
  // 会执行后面的回调函数
  // 但不会初始化执行
  module.hot.accept('./print.js', function() {
    print();
  });
}
~~~

**`html`文件：** 默认不能使用`HMR`功能.会导致问题：`html`文件不能热更新了~ （不用做`HMR`功能，因为页面只有一个）
**解决：**修改`entry`接口，将`html`文件也引入

~~~javascript
entry: ['./src/js/index.js', './src/index.html'],
~~~

# source-map源代码映射(开发/生产)

`source-map`是一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

只需要在`webpack.config.js`的`module.exports`中添加

~~~javascript
devtool: 'eval-source-map'
~~~

**source-map的配置选项**

` [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`

**开发环境：**速度快，调试更友好
**考虑速度：**`eval-source-map`
**考虑调试：**`eval-cheap-module-souce-map`

**生产环境：**源代码要不要隐藏? 调试要不要更友好
**考虑速度：**`source-map`
**考虑调试：** `cheap-module-souce-map`
如果有需要隐藏代码,则加上`nosources,hidden`

	内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快
	source-map：外部
		  错误代码准确信息 和 源代码的错误位置
		  
	inline: 内嵌到配置js文件
		生成一个内联所有文件的map映射
		源代码错误代码的错误位置
		
	hidden: 外部创建一个 map 映射文件
		不能追踪源代码错误，只能提示到构建后代码的错误位置
	
	eval: 内嵌到配置js文件
		每个文件对应生成一个map映射在eval()中
		源代码错误代码的错误位置
	
	nosources: 外部创建一个 map 映射文件
		错误代码准确信息, 但是没有任何源代码信息(为了隐藏源代码而诞生)
	
	cheap: 外部创建一个 map 映射文件
		源代码错误代码的错误位置, 但只能精确到一行错误
	
	module: 外部创建一个 map 映射文件
		 module会将loader的source map加入
# oneOf优化loader(开发/生产)

默认`module: {rules:[]}`每次加载`loader`都会全部加载，这样性能就会不太好
`module: {rules:[]}`中，可以加入`oneOf:[]`，在这里面加入的插件当找到对应的loader时，就会停止查找，注意性能就会更好

但如果有多个插件配置处理一个文件类型，那`oneOf`找到后，后面的配置就不会进行处理，所以如果有这种情况，那就要把这个插件配置放到`oneOf`外面

~~~javascript
module: {rules:[
  // 多个插件配置处理一个文件时插件配置放在oneOf外面
  {oneOf: [
  // 配置.....
	]}
]}
~~~

# 开启babel缓存(生产)

开启babel缓存后，第二次构建时，会读取之前的缓存，当相应文件变化时，只会会改变相应文件，这样性能就会好很多

~~~javascript
// babel兼容性处理
{test: /\.js$/, exclude: /node_modules/,
	loader: 'babel-loader',
	options: {presets:[[
		'@babel/preset-env',
		// 设置按需加载兼容性处理
		{	useBuiltIns: 'usage', corejs: {version: 3},
     	// 指定从哪个浏览器版本开始做兼容性处理
			targets: { chrome: '60',firefox: '60',ie: '9',safari: '10',edge: '17'}
    }
	]],cacheDirectory: true
  	// 开启babel缓存
 }
},
~~~

# 浏览器强制缓存处理(开发/生产)

当项目上线后，用户访问就会把服务器文件强制缓存一小时，这样访问速度就会快很多，但也带来一个问题。当我们需要修改源代码时，因为浏览器强制缓存了，导致修改的代码无效。要解决这个问题，就要在webpack输出文件时设置文件名，加上hash值，这样代码修改后浏览器都能生效

~~~javascript
// 输出文件设置
output: {filename: 'js/built.[hash:10].js', path: resolve(__dirname, 'build')},
// 设置CSS文件结构与名字
new MiniCssExtractPlugin({filename: 'built.[hash:10].css'}),
~~~

但这也有问题，因为`[hash]`是每次`webpack`构建时生成的一个唯一的hash值，这样就会导致重新打包时，所有文件缓存都会失效（所有资源文件都会被重命名），但可能我只改动了一个文件

**`[chunkhash]`：**根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
`chunk`：一个文件代表一个`chunk`，如果用`[chunkhash]`也有问题，`js`和`css`是在同一个`js`中生成的，属于同一个`chunk`，当重新打包时，`js与css`的hash值还是一样的。

**`[contenthash]`：**根据文件的内容生成hash值，不同文件hash值一定是不一样的，所以我们用`[contenthash]`就不会导致因为hash值一样而导致缓存失效（所有资源文件都会被重命名）

~~~javascript
// 输出文件设置
output: {filename: 'js/built.[contenthash:10].js', path: resolve(__dirname, 'build')},
// 设置CSS文件结构与名字
new MiniCssExtractPlugin({filename: 'built.[contenthash:10].css'}),
~~~

# tree shaking去除无用代码(生产)

在`webpack`的生产环境中，没有使用`ES6`语法引入的方法，变量，将会被清除。这样就可以减轻代码的体积

在不同`webpack`版本中会有不同的差异，不同版本可能会把 `css /  @babel/polyfill` 或者其他引入给清除掉。这时候，我们就需要在`package.json`中配置 `sideEffects`
**`"sideEffects": false`：** 所有代码都没有副作用（都可以进行`tree shaking`）
**`"sideEffects": ["*.css", "*.less"]`：**数组内资源不进行`tree shaking`

# code split分割(开发/生产)

`code split`将`JS`接口文件进行分割处理，这样的好处就是可以实现接口文件的并行加载，这样加载的速度就会更加的快。而且这样还可以实现按需加载。所以`JS`接口文件的分割在某种条件中是很重要的

### 设置多个JS入口

**设置`webpack.config.js`配置**

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 单入口 entry: './src/js/index.js'
  entry: {
    // 多入口：有一个入口，最终输出就有一个bundle
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]：对应入口左边的名字 index.js / test.js
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [ new HtmlWebpackPlugin({ template: './src/index.html',minify: {collapseWhitespace: true,removeComments: true}})],
  mode: 'production'
};
~~~

### 分割node_modules的代码

当我们使用一些第三方扩展库的时候，会加载入引入的chunk中，这样就会导致一个文件体积会很大，这样对性能优化就会不好。而且在分割多个JS入口后，如果多个入口JS引入一个第三方扩展库，就会导致每个入口JS都会重新加载一次第三方库。这样对性能优化是一件不好的事

**设置`webpack`提供的`optimization`设置，分割`node_modules`代码单独打包一个chunk最终输出**

~~~javascript
module.exports = {
  entry: {index: './src/js/index.js',test: './src/js/test.js'},
  output: {filename: 'js/[name].[contenthash:10].js',path: resolve(__dirname, 'build')},
  mode: 'production',
  plugins: [new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {collapseWhitespace: true,removeComments: true}
  })],
  /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
~~~

### 通过入口`JS`分割多个chunk

在`webpack`中，当我们引入`JS`的时候，`import`会返回一个`then`方法，里面的返回值就是引入的文件。同时`then`执行后也有个返回值，代表是文件加载失败的回调函数

~~~javascript
// 分割出来的chunk命名是通过文件id命名的 这样就不太友好，这时候可以通过在import中加入注释 webpackChunkName: name 可以更改显示的固定名字
import(/* webpackChunkName: 'test' */'./test')
  .then((result) => {
    // 文件加载成功~
  })
  .catch(() => {
    // 文件加载失败~
  });
~~~

# lazy loading加载(开发/生成)

### 懒加载

封装引入模块路径，当触发某个条件时，在进行加载对应模块。

~~~javascript
// 当点击时，加载test模块并调用test的mul
document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'test' */'./test').then( (result) => {
    console.log(result.mul(4, 5));
  });
};
~~~

### 预加载

正常加载可以认为是并行加载（同一时间加载多个文件），这样当加载了一个模块但是不需要用的时候，就会浪费加载资源，这样对于优化是一件不好的事情
在懒加载的注释表达式上，有一个 `webpackPrefetch`选项，开启这个选项就会等其他资源加载完毕，浏览器空闲了，再偷偷加载资源，但`Prefetch`技术有**兼容性问题**，只能在一些PC高版本浏览器运行

~~~javascript
document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};
~~~

# PWA离线可访问技术(开发/生产)

渐进式网络开发应用程序(离线可访问)
**安装`workbox`插件：**`npm i workbox-webpack-plugin -D`
sw代码必须运行在服务器代码上，如果需要测试则安装serve工具，使用serve [路径] 启动静态服务器

**配置`webpack.config.js`的`workbox`插件**

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.[contenthash:10].js',path: resolve(__dirname, 'build')},
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html',
      minify: {collapseWhitespace: true,removeComments: true}
    }),
    new WorkboxWebpackPlugin.GenerateSW({ // 生成一个 serviceworker 配置文件~
      // 帮助serviceworker快速启动
      clientsClaim: true,
      // 删除旧的 serviceworker
      skipWaiting: true
    })
  ]
};
~~~

**接口`JS`注册`serviceWorker`**

~~~javascript
if ('serviceWorker' in navigator) { // 兼容性处理 判断navigator有没有serviceWorker属性
  // 当widow加载完后执行
  window.addEventListener('load', () => {
    // 注册serviceWorker
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}
~~~

# 多进程打包技术(开发/生产)

当一个`loader`处理时间比较长时，开启一个多线程处理这个`loader`，如果处理时间短不需要开启，因为开启进程启动大概为`600ms`，进程通信也有开销。只有工作消耗时间比较长，才需要多进程打包

**安装多线程打包插件：**`npm i thread-loader -D`

**在处理某个文件时，开启多线程**

~~~javascript
{test: /\.js$/,
	use:[ 'thread-loader', [loader]... ]
}
~~~

**参数可以设置分配多少个线程**

~~~javascript
{test: /\.js$/,
	use:[ 
    {loader: 'thread-loader'
     	options:{workers: 2} // 分配两个线程
    },
    [loader] 
  ]
}
~~~

# externals拒绝第三方插件打包

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
  mode: 'production',
  externals: {
    // 拒绝jQuery被打包进来
    jquery: 'jQuery'
  }
};
~~~

**拒绝后如果要使用jquery包那就在html引入CDN连接**

~~~javascript
// js使用
import $ from 'jquery'
~~~

~~~html
<!-- html引入CDN -->
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
~~~

# dll动态链接库(开发/生产)

使用`dll`技术，对某些库（第三方库：`jquery`、`react`、`vue...`）进行单独打包，生成映射`json`，这样当我们引入第三方库时，可以查找映射关系，引入打包了的第三方库。这样就不用每次都打包第三方库了

**创建`dll`第三方库打包文件`webpack.dll.js`**

~~~javascript
const { resolve } = require('path');
const { DllPlugin } = require('webpack')
module.exports = {
	// 需要dll打包处理的第三方扩展插件 [name]:['jquery'...]
	entry:{vendors:['jquery']},
	// 打包后dll.js文件目录与文件名
	output:{
		filename: '[name]-dll.js',
		path: resolve(__dirname, 'dll'),
		// dll.js向外暴露的变量名
		library: '[name]_lib'
	},
	plugins: [
		new DllPlugin({
			// 映射库(manifest.json)映射名称,必须要和向外暴露打包文件的变量名一致
			name: '[name]_lib',
			// 映射库输出路径与名称
			path: resolve(__dirname, 'dll/[name]-manifest.json')
		})
	]
}
~~~

**安装插件：**`add-asset-html-webpack-plugin`
该插件会将给定的`JS`或`CSS`文件添加到`Webpack`指定的文件中，并将其放入`html-webpack-plugin`注入到生成的`html` 的文件列表中。将插件添加到您的配置中，为其`html`提供文件路径
**配置`webpack.config.js`**

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { DllReferencePlugin } = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {filename: 'built.js',path: resolve(__dirname, 'build')},
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    
		// 告诉webpack哪些第三方库创建了dll链接库,不需要进行打包
		new DllReferencePlugin({manifest:resolve(__dirname, 'dll/vendors-manifest.json')}),
		// 将打包的第三方库dll.js输出至当前打包目录, 并在html中自动引入资源
		new AddAssetHtmlWebpackPlugin({filepath: resolve(__dirname, 'dll/vendors-dll.js')})
    
  ],
  mode: 'production'
};
~~~

**命令行运行**

```ruby
$ webpack --config webpack.dll.config.js
$ webpack --config webpack.config.js
```

