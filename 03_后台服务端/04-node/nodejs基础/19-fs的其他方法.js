var fs = require('fs');

// - 检查一个文件是否存在
var isExists = fs.existsSync('asd.mp3')
// console.log(isExists)




/*
	fs.stat(path,callback)
	fs.statSync(path)
		- 获取文件的状态
		- 他会给我们返回一个对象，
		  这个对象保存了当前对象状态的相关信息
 */
fs.stat('test.mp4',(err,stat)=>{
		//size 文件的大小
		//isFile()是否是个文件
		//isDirectory()是否是一个文件夹（目录）
	if(!err){
		console.log(stat)
		console.log(stat.isFile(),stat.isDirectory())
	}
})




// – fs.unlink(path, callback)
// – fs.unlinkSync(path)
// - 删除文件
// fs.unlinkSync('hello.txt');




/*
	– fs.readdir(path[, options], callback)
	– fs.readdirSync(path[, options])
	- 读取文件目录结构
		files是一个字符串数组,每一个元素就是一个文件夹或者文件的名字
*/

fs.readdir('.',(err,files)=>{
	if(!err){
		console.log(files)
	}
})

/*
	fs.truncate(path,len,callback)
	fs.truncateSync(path,len)
		- 截断文件，将文件修改为指定的大小
 */
fs.truncateSync('hello.txt',3)


/* 
	– fs.mkdir(path[, mode], callback)
	– fs.mkdirSync(path[, mode])
		- 创建一个目录
	fs.rmdir(path,callback)
	fs.rmdirSync(path)
		- 删除一个目录
 */

// 创建一个目录
// fs.mkdirSync('www')
// 删除一个目录
// fs.rmdirSync('www')


/*
 	– fs.rename(oldPath, newPath, callback)
 	– fs.renameSync(oldPath, newPath)
	- 修改文件名
	- 参数：
		oldPath 旧的路径
		newPath 新的路径
		callback 回调函数
 */
// fs.renameSync('ddd','www')



/* 
	– fs.watchFile(filename[, options], listener)
	- 监视文件修改
	- 参数：
		filename 要监视的文件的名字
		options 配置选项
		listener 回调函数，当文件发生变化时，回调函数会执行
			在回调函数中会有两个参数
				curr 当前文件的状态
				prev 修改前文件的状态
					-这两个对象都是stat对象
*/

fs.watchFile('hello.txt',{interval:1000},(curr,prev)=>{
	console.log( '修改前文件大小：' + prev.size )
	console.log( '修改后文件大小：' + curr.size )
})