//浏览器中的javascript是没有文件操作的能力的
//但是node中的javascript具有文件操作的能力

//fs是file-sytem的简写，就是文件系统的意思
//在node中如果想要进行文件操作，就必须引入fs这个核心模块
//在fs这个核心模块中，就提供了所有文件操作相关的API
//例如：fs。readFile就是用来读取文件的
//error：未定义 data：数据
//error：报错   data：未定义
/*
	模块化
		- 在Node中，一个js文件就是一个模块
		- 在Node中，每个js文件的js代码都是独立运行在一个函数中
				而不是全局作用域，所有一个模块中的变量和函数在嵌套模块中无法访问	x
 */
var ms = require('./2-读取文件.js');
console.log(ms)