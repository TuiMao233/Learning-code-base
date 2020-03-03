const { resolve } = require('path');
// 引入html打包工具
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入css打包工具
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
	// 接口js相对路径
	entry: './src/js/index.js',
	// 配置js输出路径
	output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
	// 开发/生产环境配置
	mode: 'development',
	module: {rules:[
		{
			test:/\.css$/,
			use:[MiniCssExtractPlugin.loader,'css-loader']
		}
	]},
	plugins: [
		// 自动解析打包内容并复制解析创建html
		new HtmlWebpackPlugin({template:'./src/index.html'}),
		// 设置css文件结构与名字
		new MiniCssExtractPlugin({filename:'css/built.css'})
		// 当html创建时会自动引入css独立文件
	]
};
