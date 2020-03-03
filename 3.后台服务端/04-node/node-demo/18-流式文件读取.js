/*
	4.流式文件读取
 */
var fs = require('fs');

//创建一个可读流

var rs = fs.createReadStream('test.mp4')
var ws = fs.createWriteStream('HuoGuoP.mp4')
//pipe() 可以将可读流中的内容，直接输出到可写流中，并且自动关闭
rs.pipe(ws)