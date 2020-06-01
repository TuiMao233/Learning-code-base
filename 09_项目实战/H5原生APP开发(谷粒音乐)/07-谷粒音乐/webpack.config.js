/*
  开发环境配置：能让代码运行
    运行项目指令：
      webpack 会将打包结果输出出去
      npx webpack-dev-server 只会在内存中编译打包，没有输出
*/
/* 
	cnpm i webpack webpack-dev-server html-loader url-loader file-loader css-loader style-loader less-loader less html-webpack-plugin -D
 */
// 内置核心模块,用于拼接绝对路径与相对路径
const {resolve} = require('path')
// 打包html方法
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	// js接口文件
	entry: ['./src/js/index.js', './src/index.html'],
	// 输出文件
	output: {
		filename: './built.js',
		path: resolve(__dirname, 'build')
	},
	// 开发/生成模式
	mode: 'development',
	// 插件配置
	module: {rules:[
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
	plugins: [new HtmlWebpackPlugin({
		template: './src/index.html'
	})],
	// 开发服务器(devServer)配置
	devServer: {
		contentBase: resolve(__dirname, 'build'), // 项目构建后路径
		compress: true,	port: 3000, open: true, hot: true
	}
}