/* add-asset-html-webpack-plugin */
// 路径拼接
const { resolve } = require('path')
// html打包
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 读取dll信息库
const { DllReferencePlugin } = require('webpack')
// 引入dll库
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
// npx webpack-dev-server
module.exports = {
    // 引入JS接口
    entry: ['./src/js/index.js', './src/index.html'],
    output: { filename: './built.js', path: resolve(__dirname, 'built') },
    mode: 'development',
    module: {rules: [{oneOf:[
            {   // 打包css样式
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, { // 编译打包的less样式
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, { // 解析html代码为字符串
                test: /\.html$/,
                loader: 'html-loader'
            }, { // 处理html字符串的图片url，并打包图片
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: { limit: 8 * 1024, esModule: false, name: '[]' }
            }, { // 处理打包其他资源
                exclude: /\.(css|html|js|less|jpg|png|gif)/,
                loader: 'file-loader',
                options: {name: '[hash:10].[ext]'}
            }
    ]}]},
    plugins: [
        // 打包hmtl
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        // 读取dll信息库
        new DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/vendors-manifest.json')
        }),
        // 引入dll库
        new AddAssetHtmlWebpackPlugin({filepath: resolve(__dirname, 'dll/vendors-dll.js')})
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        port: 3000,
        open: true,
        hot: true, // 热加载模块
        clientLogLevel: 'none', // 不启动服务器日志
        overlay: false, // 禁止全屏显示错误
        quiet: true, // 基本启动信息除外其他的不显示
        watchOptions: {ignored:'/node_modules'} // 忽略文件
    },
    devtool: 'eval-cheap-module-souce-map'
}
