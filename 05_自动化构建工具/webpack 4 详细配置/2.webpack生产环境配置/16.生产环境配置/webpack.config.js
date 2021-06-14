/* 
npm i 
css-loader less-loader less
html-webpack-plugin mini-css-extract-plugin
postcss-loader postcss-preset-env
optimize-css-assets-webpack-plugin
eslint eslint-loader eslint-config-airbnb-base  eslint-plugin-import
babel-loader @babel/core core-js
html-loader url-loader file-loader
 */
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