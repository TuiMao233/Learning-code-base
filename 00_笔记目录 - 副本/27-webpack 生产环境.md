# CSS提取成单独文件

**安装css打包工具：**`npm i mini-css-extract-plugin -D`

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入CSS提取文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/js/index.js', // 接口js文件相对路径
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},	// 输出配置js文件
  mode: 'development',
  module: {rules: [
		  { test: /\.css$/,
				use: [
					// 提取webpackjs中的css成单独文件
					MiniCssExtractPlugin.loader,
           // 合并css存入webpackjs
					'css-loader'
			]}
  ]},
  plugins: [ 
		// 自动解析打包内容并复制解析创建html
		new HtmlWebpackPlugin({template: './src/index.html'}),
		// 设置css文件结构与名字
    new MiniCssExtractPlugin({filename: 'css/built.css'})
		// 当html创建时会自动引入css独立文件
  ]
};
~~~

**命令行运行webpack**

# CSS兼容性处理

**安装css兼容工具：**`npm i postcss-loader postcss-preset-env -D`

**`postcss-preset-env`设置指定浏览器兼容**`(package.json)`
**详细配置：**https://github.com/browserslist/browserslist#environment-variables

~~~javascript
"browserslist": {
		"development": [// 开发环境
       // 兼容开发常用浏览器最近的一个版本
			"last 1 chrome version",
			"last 1 firefox version",
			"last 1 safari version"
		],
		"production": [// 生产环境
			// 兼容覆盖率大于0.2%的人使用的浏览器
			">0.2%",
			// 兼容没有死掉的浏览器
			"not dead",
			// 兼容除了OperaMini的浏览器
			"not op_mini all"
		]
}
~~~

**配置webpack.config.js的postcss插件设置**
要在`webpack`中使用`postcss`需要安装`postcss-loader`
`postcss-perset-env`可以帮`postcss`找到`package.json`中`browserslist`里面的配置，通过配置加载指定兼容的浏览器

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置是否是开发环境兼容，如果没有设置，默认是生产环境
// process.env.NODE_ENV = 'development';
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  mode: 'development'
  module: {rules: [
      { test: /\.css$/,
        use: [	MiniCssExtractPlugin.loader,
							 'css-loader',
							 {	loader: 'postcss-loader',
									options: {// 设置使用postcss-preset-env插件过滤兼容
										ident: 'postcss',
										plugins: () => [require('postcss-preset-env')()]
									},
								},
						],
	 		}
  ]},
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new MiniCssExtractPlugin({filename: 'css/built.css'})
  ],
};
~~~

**命令行运行webpack**

# CSS压缩

**安装css压缩工具：**`npm i optimize-css-assets-webpack-plugin -D`

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入CSS压缩插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  mode: 'development',
  module: {rules: [
      {	test: /\.css$/,
        use: [	
					MiniCssExtractPlugin.loader,'css-loader',
					{ 	loader: 'postcss-loader',
							options: {ident: 'postcss',plugins: [require('postcss-preset-env')()]}
					}
				]
      }
  ]},
  plugins: [
	// 进行复制解析打包html以及其他文件
    new HtmlWebpackPlugin({template: './src/index.html'}),
	// 设置CSS文件结构与名字
    new MiniCssExtractPlugin({filename: 'css/built.css'}),
	// 进行CSS压缩
    new OptimizeCssAssetsWebpackPlugin()
  ]
};
~~~

**命令行运行webpack**

# JS语法检查

**安装JS语法检测插件：**`npm i eslint eslint-loader eslint-config-airbnb-base  eslint-plugin-import -D`

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  mode: 'development',
  module: {rules: [
      {	test: /\.js$/,
        exclude: /node_modules/,
       	enforce: 'pre', // 优先处理
        loader: 'eslint-loader',
        options: {fix: true}// 自动修复eslint的错误
      }
  ]},
  plugins: [ new HtmlWebpackPlugin({template: './src/index.html'})]
};
~~~

**airbnb：**gitHub访问量很高的一个编码风格指南
**让eslint按照airbnb的bian编码风格进行语法检测需要安装：**`eslint-config-airbnb-base  eslint-plugin-import`
**然后在package.json中设置eslint编码风格**

~~~json
"eslintConfig": {
		"extends": "airbnb-base",
  	"env": {"browser": true}
}
~~~

`eslint`默认不认识`window...`这些变量，需要设置`evt{browser:true}`

**命令行运行webpack**

**忽略下一行不进行检查**

~~~javascript
// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line
console.log(60);
~~~

# JS兼容性处理

**安装兼容性处理插件：**`babel-loader @babel/preset-env @babel/core`

**基本js兼容性处理：**`@babel/preset-env`
**babel-loader插件设置：**`options:{presets:['@babel/preset-env']}}`
**问题：**`只能转换基本语法，promise高级语法不能转换`

**全部js兼容性处理：**`@babel/polyfill`
 **接口js引入：**`import '@babel/polyfill'`
**问题：**`我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了`

**解决：**设置`core-js`兼容性处理规则
**babel-loader插件设置**

~~~javascript
options:{presets:[[
  '@babel/preset-env',
  {useBuiltIns: 'usage', // 按需加载
   corejs: {version: 3}, // 指定core-js版本
   // 指定从哪个浏览器版本开始做兼容性处理
   targets: {	chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' }
  }
]]}}
~~~

**安装兼容性处理插件：**`babel-loader @babel/core core-js`

**配置webpack.config.js的babel插件**

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js', path: resolve(__dirname, 'build')},
  mode: 'development',
  module: {rules: [
	 {	test: /\.js$/,
			exclude: /node_module/,
			loader: 'babel-loader',
			options:{presets:[[
					'@babel/preset-env',
					{	useBuiltIns: 'usage', // 按需加载
						corejs: {version: 3}, // 指定core-js版本
						// 指定从哪个浏览器版本开始做兼容性处理
  					targets: {	chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' }
					}
			]]},
	 	}
  ]},
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
};
~~~

**命令行运行webpack**

# 压缩JS

~~~javascript
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
  // 生产环境下会自动压缩js代码
  mode: 'production'
};
~~~

# 压缩html

~~~javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {// 压缩html代码
        collapseWhitespace: true,// 移除空格
        removeComments: true// 移除注释
      }
    })
  ],
};
~~~

# webpack生产环境配置集

**安装插件：**`cnpm i webpack webpack-cli css-loader less-loader less html-webpack-plugin mini-css-extract-plugin postcss-loader postcss-preset-env optimize-css-assets-webpack-plugin eslint eslint-loader eslint-config-airbnb-base  eslint-plugin-import babel-loader @babel/preset-env @babel/core core-js html-loader url-loader file-loader -D`

**打包输出到文件夹：**`webpack` 

~~~javascript
// 绝对路径拼接相对路径方法
const { resolve } = require('path');
// 引入webpack打包HTML文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入webpack提取CSS为文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入webpack压缩CSS文件的插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 共用处理css数组
const commtCssOptions = [
	// 提取css字符串为单独css文件
	MiniCssExtractPlugin.loader,
	// 合并css存入webpackjs为字符串
	'css-loader',
	// css兼容处理
	{loader: 'postcss-loader',
		options:{ident: 'postcss', plugins: [require('postcss-preset-env')]}
	}
];
module.exports = {
	// 接口js文件相对路径
	entry: './src/js/index.js', 
	// 输出文件设置
	output: {filename: 'js/built.js', path: resolve(__dirname, 'build')},
	// 生产模式 自动压缩js
	mode: 'production',
	// 插件设置
	module:{rules:[
		// 处理css
		{test: /\.css$/, use: [...commtCssOptions]},
		// 处理less
		{test: /\.less$/, use: [...commtCssOptions, 'less-loader']},
		// js语法检测
		{test: /\.js$/, exclude: /node_modules/, enforce: 'pre', // 优先处理
			loader: 'eslint-loader',
			options: {fix: true} // 自动修复js语法错误
		},
		// JS兼容性处理
		{test: /\.js$/, exclude: /node_modules/,
			loader: 'babel-loader',
			options: {presets:[[
				'@babel/preset-env',
				// 设置按需加载兼容性处理
				{useBuiltIns: 'usage', corejs: {version: 3},
				targets: { // 指定从哪个浏览器版本开始做兼容性处理
					chrome: '60',
					firefox: '60',
					ie: '9',
					safari: '10',
					edge: '17'
				}}
			]]}
		},
		// 处理htmlSrcImg资源
		{test: /\.html$/, loader: 'html-loader'},
		{test: /\.(jpg|png|gif)/,
			loader: 'url-loader',
			options: {limit: 8*1024, esModule: false, name: '[hash:10].[ext]'}
		},
		// 处理其他资源
		{exclude: /\.(css|js|html|less|jpg|png|gif)$/,
			loader: 'file-loader',
			options: {name: '[hash:10].[ext]'}
		}
	]},
	plugins: [
		// 自动解析打包内容并复制解析创建html
		new HtmlWebpackPlugin({template: './src/index.html',
		minify: { // 压缩html代码
			collapseWhitespace: true, // 移除空格
			removeComments: true 	  // 移除注释
		}
		}),
		// 设置CSS文件结构与名字
		new MiniCssExtractPlugin({filename: 'built.css'}),
		// 进行CSS文件压缩
		new OptimizeCssAssetsWebpackPlugin()
	]
}
~~~

