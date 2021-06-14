const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  mode: 'development',
  module: {rules: [
	  {	test: /\.js$/,
		// 扩展插件不需要检查
		exclude: /node_modules/,
		// eslint-loader会调用eslint进行检查
		loader: 'eslint-loader',
		// 自动修复eslint的错误
		options: {fix: true}
	  }
  ]},
  plugins: [ new HtmlWebpackPlugin({template: './src/index.html'})]
};
