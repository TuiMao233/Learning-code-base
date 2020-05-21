
// 运行: npx webpack-dev-server [--host 0.0.0.0]

// 内置核心模块,用于拼接绝对路径与相对路径
const {resolve} = require('path')
// 打包html方法
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 接口文件
    entry: ['./src/js/index.js', './src/index.html'],
    // 输出文件配置
	output: {filename: './built.[contenthash:10].js',path: resolve(__dirname, 'build')},
	mode: 'development',
	module: {rules:[{oneOf: [
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
    ]}]},
	// 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
	plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
	// 开发服务器(devServer)配置
	devServer: {
		contentBase: resolve(__dirname, 'build'),
		compress: true,port: 3000,open: true, hot: true
    },
    devtool: 'eval-source-map'
}