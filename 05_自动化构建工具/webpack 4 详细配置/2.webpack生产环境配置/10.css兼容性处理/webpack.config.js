const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.js',path: resolve(__dirname, 'build')},
  mode: 'development',
  module: {rules: [
	  { test: /\.css$/,
		use:[ MiniCssExtractPlugin.loader,
				'css-loader',
				{ 	loader: 'postcss-loader',// css兼容浏览器插件
					options: { // 设置使用postcss-preset-env插件过滤兼容
						ident: 'postcss',
						plugins: [require('postcss-preset-env')]
					}
				}
		]
	  }
  ]},
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new MiniCssExtractPlugin({filename: 'css/built.css'})
  ],
};
