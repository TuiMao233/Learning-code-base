/*
	简单文件写入
	 fs.writeFile(file, data[, options], callback)
	 fs.writeFileSync(file, data[, options])
		- file 要操作的文件的路径
		- data 要写入的数据
		- options 选项，可以对写入进行一些设置
		- callback 当写入完成以后执行的函数
		- flag
			r 只读
			w 可写
			a 追加
 */
var fs = require('fs');
fs.writeFile('C:/Users/Administrator/Desktop/hello.txt','这是通过writeFile写入的内容',{flag:'w'},(err)=>{
	if(!err){console.log('写入成功~~~')}else{console.log('失败')}
})