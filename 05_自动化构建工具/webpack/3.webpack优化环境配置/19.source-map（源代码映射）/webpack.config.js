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
	entry: './src/js/index.js',
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
	// 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
	plugins: [new HtmlWebpackPlugin({
		template: './src/index.html'
	})],
	// 开发服务器(devServer)配置
	devServer: {
		contentBase: resolve(__dirname, 'build'), 
		compress: true,	port: 3000, open: true,
		// 启动热加载
		hot: true
	},
	devtool: 'eval-source-map'
}
/*
  source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
	内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快
	开发环境：速度快，调试更友好
	  速度快(eval>inline>cheap>...)
	    eval-cheap-souce-map
	    eval-source-map
	  调试更友好  
	    souce-map
	    cheap-module-souce-map
	    cheap-souce-map
	速度快一点: eval-source-map
	调试好一点: eval-cheap-module-souce-map
	
	生产环境：源代码要不要隐藏? 调试要不要更友好
	  内联会让代码体积变大，所以在生产环境不用内联
	  nosources-source-map 全部隐藏
	  hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
	速度快一点: source-map
	调试好一点: cheap-module-souce-map
	如果有需要隐藏代码,则加上nosources,hidden
	 
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
	
	
	
    source-map：外部
		源代码错误代码的错误位置
		错误代码准确信息 和 源代码的错误位置
	  
    inline-source-map：内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
	  
    hidden-source-map：外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
	  
    eval-source-map：内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误位置
	  
    nosources-source-map：外部
      错误代码准确信息, 但是没有任何源代码信息
	  
    cheap-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      只能精确的行
	  
    cheap-module-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      module会将loader的source map加入

    内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好
      速度快(eval>inline>cheap>...)
        eval-cheap-souce-map
        eval-source-map
      调试更友好  
        souce-map
        cheap-module-souce-map
        cheap-souce-map

      --> eval-source-map  / eval-cheap-module-souce-map

    生产环境：源代码要不要隐藏? 调试要不要更友好
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

      --> source-map / cheap-module-souce-map
*/