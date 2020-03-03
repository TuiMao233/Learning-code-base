const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
/*
  PWA: 渐进式网络开发应用程序(离线可访问)
    workbox --> workbox-webpack-plugin
*/
module.exports = {
  entry: './src/js/index.js',
  output: {filename: 'js/built.[contenthash:10].js',path: resolve(__dirname, 'build')},
  mode: 'production', devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html',
      minify: {collapseWhitespace: true,removeComments: true}
    }),
	// 生成一个serviceworker 配置文件~~
	new WorkboxWebpackPlugin.GenerateSW({
		// 帮助serviceworker快速启动
		clientsClaim: true,
		// 删除旧的serviceworker
		skipWaiting: true
	})
  ]
};
