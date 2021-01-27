/*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
    当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    需求：需要运行 webpack.dll.js 文件
      --> webpack --config webpack.dll.js
*/
const { resolve } = require('path');
const { DllPlugin } = require('webpack')
module.exports = {
	// 需要dll打包处理的第三方扩展插件 [name]:['jquery'...]
	entry:{vendors:[
		'jquery'
	]},
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