/**
	异步文件写入
 fs.open(path, flags[, mode], callback)
 	- 用来打开一个文件
    - 异步调用的方法，结果都是通过回调函数的参数返回的
 	- 回调函数两个参数：
 		err 错误对象，如果没有错误则为null
 		fd  文件的描述符
 fs.write(fd, string[, position[, encoding]], callback)
 	- 用来异步写入一个文件

 fs.close(fd, callback)
 	- 用来关闭文件

 */
var fs = require('fs');

//打开文件
var fd = fs.open('hello.txt','w',function(err,fd){if(!err){//判断是否出错
		//如果没有出错，则对文件进入写入
		fs.write(fd,'这是异步写入的内容',function(err){ //文件写入
			if(!err){console.log('写入成功')}
			fs.close(fd,function(){console.log('文件已关闭')})//关闭文件
			
		})
}else{console.log(err)}})//如果出错则弹出错误

