// 引入库
const cheerio = require('cheerio')
// 加载dom字符串
const $ = cheerio.load('<h2 class="title">Hello world</h2>')

// dom查询操作
$('h2.title').text('Hello there!')
// dom添加操作
$('h2').addClass('welcome')

// 转换为html
$.html()
//=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>