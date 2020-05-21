//浏览器中的javascript是没有文件操作的能力的
//但是node中的javascript具有文件操作的能力

//fs是file-sytem的简写，就是文件系统的意思
//在node中如果想要进行文件操作，就必须引入fs这个核心模块
//在fs这个核心模块中，就提供了所有文件操作相关的API
//例如：fs。readFile就是用来读取文件的
//error：未定义 data：数据
//error：报错   data：未定义
var fs = require('fs')
fs.readFile('hello.txt',function(error,data){
	console.log(data.toString())
})




exports.x = '我是2-读取文件.js中的x';
exports.y = '我是y';
exports.fn = function(){
	console.log('我是函数')
}