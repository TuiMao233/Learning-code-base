/*
	4.流式文件读取
 */
var fs = require('fs');

//创建一个可读流

var rs = fs.createReadStream('test.mp4')
var ws = fs.createWriteStream('HuoGuoP.mp4')
//监听流的开启和关闭
rs.once('open',()=>{console.log('读取流打开了~~~~')})
//数据读取完毕，关闭可写流
rs.once('close',()=>{console.log('读取流关闭了~~~~');ws.end()})
ws.once('open',()=>{console.log('写入流打开了~~~~')})
ws.once('close',()=>{console.log('写入流关闭了~~~~')})
//如果要读取一个可读流中的数据，必须要为可读流绑定一个data事件
//data事件绑定完毕，它会自动开始读取数据
rs.on('data',(data)=>{
	ws.write(data)
})
const URL_Info = new URL('https://translate.google.cn/?search=6#view=home');
console.log(URL_Info)