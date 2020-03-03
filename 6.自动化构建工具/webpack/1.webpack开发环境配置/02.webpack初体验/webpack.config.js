// path.resolve(absoPath, relaPath) 将一个绝对路径和一个相对路径片段拼接为一段绝对路径
/* 
	D:\web学习库\6.自动化构建工具\webpack\02.webpack初体验
	build/js
	D:\web学习库\6.自动化构建工具\webpack\02.webpack初体验\build\js
 */
const { resolve } = require('path')
module.exports = {
	// 入口文件
	entry: './src/index.js',
	// 输出配置
	output: {
		// 输出名称
		filename: 'built.js',
		// 输出绝对路径
		path: resolve(__dirname,'build/js')
	},
	//开发环境
	mode: 'development' ,
		// production
}