/*
 * @Author: 毛先生
 * @Date: 2020-06-08 10:45:36
 * @LastEditTime: 2020-08-29 13:58:29
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
const puppeteer = require('puppeteer');
const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'

const options = {
  args: ['--no-sandbox'], // --no-sandbox 以沙盒模式打开
  headless: false // 以无头浏览器打开浏览器, 没有界面(进行关闭)
}

module.exports = async () => {
  // 打开浏览器
  const browser = await puppeteer.launch(options)
  // 新建标签页
  const page = await browser.newPage();
  // 标签页跳转网址, 并等待网络空闲时，在跳转加载页面
  await page.goto(url, { waitUntil: 'networkidle2' });

  // 开启延时器，延时2秒在开始爬取数据
  await timeout();

  // 等待网址加载完毕，开始爬取数据

  // 对加载好的页面进行dom操作
  const result = await page.evaluate(() => {

    // 所有爬取的数据
    const result = []

    // 获取所有热门电影的a标签, 转换为真数组, 并截取为8条数据
    const $list = Array.from($('#content .article>.gaia>.list-wp>.list>.item')).slice(0, 8)

    $list.forEach(item => {
      // 爬取标题
      const title = $(item).find('div img').attr('alt')
      // 爬取评分
      const score = $(item).find('p>strong').text()
      // 爬取详情页面链接
      const link = $(item).attr('href')
      // 爬取海报图
      const poster_url = $(item).find('div img').attr('src')
      result.push({
        title, score, link, poster_url
      })
    })
    // 将爬取数据返回
    return result
  })
  for (let i = 0; i < result.length; i++) {
    // 获取详情页面的网址
    const movie_doban_url = result[i].link
    // 跳转详情页面网址, 并等待网络空闲时，在跳转加载页面
    await page.goto(movie_doban_url, { waitUntil: 'networkidle2' });

    // 对加载好的页面进行dom操作
    const itemResult = await page.evaluate(() => {
      const oneDetail = {}
      // 爬取信息栏的所有标签
      const info_span = $('#content .article .indent #info > span')
      // 爬取豆瓣ID
      oneDetail.doban_id = Number($('.a_show_login.lnk-sharing').attr('share-id'))
      // 爬取类型
      oneDetail.genre = $.map($("[property='v:genre']"), item => item.innerText).join(' / ')
      // 爬取导演
      oneDetail.director = $.map($("[rel='v:directedBy']"), item => item.innerText).join(' / ')
      // 爬取编剧
      oneDetail.screenwriter = $.map($(info_span[1]).find('.attrs a'), item => item.innerText).join(' / ')
      // 爬取主演
      oneDetail.starring = $.map($(info_span[2]).find('.attrs a'), item => item.innerText).slice(0, 6).join(' / ')
      // 爬取简介, 并去除空格与换行
      oneDetail.summary = $("[property='v:summary']").text().replace(/\s/g, "")
      return oneDetail
    })
    delete result[i].link
    // 在evaluate无法读取服务器中的变量, 所以在外面进行添加数据
    result[i] = { ...result[i], ...itemResult }
  }

  // 关闭浏览器
  await browser.close();

  return result
}

function timeout() { return new Promise(resolve => setTimeout(resolve, 2000)) }