const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DllReferencePlugin } = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {filename: 'built.js',path: resolve(__dirname, 'build')},
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
	// 告诉webpack哪些第三方库创建了dll链接库,不需要进行打包
	new DllReferencePlugin({manifest:resolve(__dirname, 'dll/vendors-manifest.json')}),
	// 将打包的第三方库dll.js输出至当前打包目录, 并在html中自动引入资源
	new AddAssetHtmlWebpackPlugin({filepath: resolve(__dirname, 'dll/vendors-dll.js')})
  ],
  mode: 'production'
};
