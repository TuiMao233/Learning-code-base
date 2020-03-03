/*
	1.同步文件读取
	2.异步文件读取
	3.简单文件读取
	 fs.readFile(path[, options], callback)
	 fs.readFileSync(path[, options])
	 	- path 要读取的文件的路径
	 	- options 读取的选项
	 	- callback回调函数，通过回调函数将读取到内容返回(err , data)
	 		err 错误对象
	 		data 读取到的数据，会返回一个Buffer
 */
var fs = require('fs');
fs.readFile('派大星.jpg',(err,data)=>{
	if(!err){
		//写入文件
		fs.writeFile('成了.jpg',data,(err)=>{console.log(!err ?'成功':'失败')})
	}else{console.log('读取出错')}
})