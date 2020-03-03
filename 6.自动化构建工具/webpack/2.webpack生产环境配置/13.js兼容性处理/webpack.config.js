const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js', path: resolve(__dirname, 'build')},
  mode: 'development',
  module: {rules: [
      /*
        js兼容性处理：babel-loader @babel/core  @babel/preset-env core-js
          1. 基本js兼容性处理 --> @babel/preset-env
			 插件设置options:{presets:['@babel/preset-env'}}
             问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill  
			 接口文件引入import '@babel/polyfill'
             问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */
	 {	test: /\.js$/,
		exclude: /node_module/,
		loader: 'babel-loader',
		options:{presets:[[
			'@babel/preset-env',
			{	useBuiltIns: 'usage', // 按需加载
				corejs: {version: 3}, // 指定core-js版本
				targets: {			  // 指定从哪个浏览器版本开始做兼容性处理
					chrome: '60',
					firefox: '60',
					ie: '9',
					safari: '10',
					edge: '17'
				}
			}
		]]},
	 }
  ]},
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
};
