
// 引入爬取热门电影函数
const moviesCrawler = require('./movies_crawler');
// 引入爬取预告片定义函数
const trailerCrawler = require('./trailer_crawler')
// 引入保存数据库方法
const saveMovies = require('../save/save_movies');
const saveTrailers = require('../save/save_trailer')

// 引入上传至七牛云数据库方法
const upDatatoQiniu = require('../qiniu')
/* 爬取热门电影 */
async function moviesCrawlerStart () {
    const result = await moviesCrawler()
    console.log(`-----数据爬取成功,共爬取${result.length}条数据-----`)
    console.log(`-----数据格式为以下-----`)
    console.log(result[0])
    const {Model, mongoose} = await saveMovies(result)
    console.log('-----准备上传至七牛服务器-----')
    await upDatatoQiniu(Model, 'poster_url', 'poster_key')
    console.log(`-----数据爬取完毕,准备关闭数据库-----`)
    mongoose.disconnect()
}

/* 爬取预告片电影 */
async function trailerCrawlerStart () {
    const result = await trailerCrawler()
    console.log(`-----数据爬取成功,共爬取${result.length}条数据-----`)
    console.log(`-----数据格式为以下-----`)
    console.log(result[0])
    const {Model, mongoose} = await saveTrailers(result)
    console.log('-----准备上传至七牛服务器-----')
    await upDatatoQiniu(Model, 'poster_url', 'poster_key')
    await upDatatoQiniu(Model, 'video_cover_url', 'video_cover_key')
    await upDatatoQiniu(Model, 'video_url', 'video_key')
    console.log(`-----数据爬取完毕,准备关闭数据库-----`)
    mongoose.disconnect()
}

// 执行爬取热门电影
// moviesCrawlerStart()

// 执行爬取预告片定义
trailerCrawlerStart()
