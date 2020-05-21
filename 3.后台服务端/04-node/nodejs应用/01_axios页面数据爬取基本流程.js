// 爬取网页数据
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

async function run() {
    // 请求页面将得到html文件字符串
    // axios请求html时, 会自动将请求头设置为
    // Upgrade-Insecure-Requests: 1
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36
    const URL = 'http://yuc.wiki/'
    const result = await axios(URL)
    const html_str = result.data.replace(/\n/g, "")
    
    // 利用正则对html_str查询提取数据....

    fs.writeFileSync('index.html',html_str)
}
run()
