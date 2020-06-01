// 预告片爬虫程序

const puppeteer = require('puppeteer');
const url = 'https://movie.douban.com/coming'
const { resolve } = require('path')

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


    // 对预告片列表页面进行爬取数据
    const result = await page.evaluate(() => (
        $.map($('#wrapper>#content .article table tbody>tr'), item => {
            const $tr = $(item).find('td')
            // 定义一个预告片的信息
            const oneMovieTrailer = {}
            // 爬取片名
            oneMovieTrailer.title = $tr.eq(1).find('a').attr('title')
            // 爬取链接
            oneMovieTrailer.link = $tr.eq(1).find('a').attr('href')
            // 爬取想看人数
            oneMovieTrailer.like = Number($tr[4].innerText.replace(/\s|人/g, ''))
            // 将数据返回
            return oneMovieTrailer
        })
    ))
    for (let i = 0; i < result.length; i++) {
        // 获取详情页面的网址
        const movie_doban_url = result[i].link
        // 跳转详情页面网址, 并等待网络空闲时，在跳转加载页面
        await page.goto(movie_doban_url, { waitUntil: 'networkidle2' });

        // 对加载好的页面进行dom操作
        const detailResult = await page.evaluate(() => {
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
            oneDetail.screenwriter = $.map(info_span.eq(1).find('.attrs a'), item => item.innerText).join(' / ')
            // 爬取主演
            oneDetail.starring = $.map(info_span.eq(2).find('.attrs a'), item => item.innerText).slice(0, 6).join(' / ')
            // 爬取简介, 并去除空格与换行
            oneDetail.summary = $("[property='v:summary']").text().replace(/\s/g, "")
            // 爬取上映日期
            oneDetail.release_area = $("[property='v:initialReleaseDate']").text().replace(/\s/g, "")
            // 爬取海报图
            oneDetail.poster_url = $('#content .article .indent #mainpic .nbgnbg img').attr('src')
            // 如果有视频(不等于undefind), 则爬取视频信息
            if ($('.related-pic-video')[0]) {
                // 爬取视频详情页面链接
                oneDetail.video_page_url = $('.related-pic-video').attr('href')
                // 爬取封面图
                oneDetail.video_cover_url = $('.related-pic-video').css('background-image').replace(/url\("|"\)/g, "")
            }
            return oneDetail
        })


        // 如果有跳转视频页面则爬取视频链接
        if (detailResult.video_page_url) {
            // 跳转页面
            await page.goto(detailResult.video_page_url, { waitUntil: 'networkidle2' });
            // 爬取一条视频链接
            const video_url = await page.evaluate(() => $('video source').attr('src'))
            // 保存数据
            detailResult.video_url = video_url
            delete detailResult.video_page_url
        }

        delete result[i].link
        // 在evaluate无法读取服务器中的变量, 所以在外面进行添加数据
        result[i] = { ...result[i], ...detailResult }
    }
    // 关闭浏览器
    await browser.close();

    return result
}

function timeout() { return new Promise(resolve => setTimeout(resolve, 2000)) }