/*
  webpack.config.js  webpack的配置文件
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
*/

// resolve用来拼接绝对路径的方法
const {
	resolve
} = require('path');

module.exports = {
	// 接口js
	entry: './src/index.js',
	// 输出
	output: {
		// 输出文件名
		filename: 'built.js',
		// 输出路径
		// __dirname nodejs的变量，代表当前文件的目录绝对路径
		path: resolve(__dirname, 'build')
	},
	// 模式
	mode: 'development', 

	// loader,插件配置的集合
	module: {rules:[
	    {	test: /\.css$/,
			// 配置所需的loader插件进行处理
			// use数组中loader执行顺序：从右到左，从下到上 依次执行
			// 顺序可以利用reverse进行倒叙排序 这样符合人类思维
			use: ['css-loader', 'style-loader'].reverse(),
			// css-loader: 将css文件变成commonjs模块加载js中，里面内容是样式字符串
			// style-loader: 创建style标签,将js中的样式字符串资源插入行,添加到head中生成
		},{	
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'less-loader'],
			// less-loader: 将less编译为css,然后在通过 css-loader,style-loader创建的style标签插入head中
		}
	]}
}
