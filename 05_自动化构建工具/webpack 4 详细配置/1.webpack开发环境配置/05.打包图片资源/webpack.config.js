const {
	resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 接口js相对路径
	entry: './src/index.js',
	// 绝对路径输出
	output: {
		// 解析文件js名称
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {rules:[
		// 处理less
		{test: /\.less$/, use:['style-loader','css-loader','less-loader']},
		// 解析html为字符串，这样操作html标签的方法才能拿到数据
		{test: /\.html$/, loader: 'html-loader'},
		{
			test: /\.(jpg|png|gif)$/,
			loader: 'url-loader',
			options: {
				// 当文件小于多少时转换为base64-uri
				// 小图片进行base64处理,大图片不进行处理,这样可以减少请求
				limit: 8 * 1024,
				// 因为html-loader的数据是用commonjs定义的，但是url-loader是用ES6解析的，
				// 所以要将url-loader的解析模式设置	  为commonjs模块解析，这样url-loader才能拿到数据
				// esModule: false 关闭ES6模块解析，开启commonjs模块解析
				esModule: false,
				// 给处理过的文件重新命名，哈希值前10位.文件后缀
				name: '[hash:10].[ext]'
			}
		}
	]},
	// 复制处理后的html到指定位置,并自动引入打包输出
	plugins: [new HtmlWebpackPlugin({
			template: './src/index.html'
	})],
	mode: 'development'
};
