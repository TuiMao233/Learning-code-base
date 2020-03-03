const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入压缩CSS插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  mode: 'development',
  module: {rules: [
      {	test: /\.css$/,
        use: [ // 进行css兼容处理以及合并
			MiniCssExtractPlugin.loader,'css-loader',
			{ 	loader: 'postcss-loader',
				options: {ident: 'postcss',plugins: [require('postcss-preset-env')()]}
			}
		]
      }
  ]},
  plugins: [
	// 进行复制解析打包html以及其他文件
    new HtmlWebpackPlugin({template: './src/index.html'}),
	// 进行提取css文件
    new MiniCssExtractPlugin({filename: 'css/built.css'}),
	// 进行压缩
	new OptimizeCssAssetsWebpackPlugin()
  ]
};
