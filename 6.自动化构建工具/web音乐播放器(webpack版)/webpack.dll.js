const { resolve } = require('path')
const { DllPlugin } = require('webpack')

module.exports = {
    // 需要dll处理的第三方扩展库
    entry: {vendors: ['jquery']},
    // 打包后dll.js文件目录与文件名
    output: {
        filename: '[name]-dll.js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_lib'
    },
    plugins: [
        new DllPlugin({
            //  映射名称
            name: '[name]_lib',
            // 映射库输出路径
            path: resolve(__dirname, 'dll/[name]-manifest.json')
        })
    ]
}