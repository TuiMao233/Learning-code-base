const axios = require('axios')

const URL = 'http://testsea.diyiwl.wang/ssszz.php?top=10&q=迷糊餐厅&dect=0'

async function run() {
    const result =await axios(URL)
    // 打印结果
    console.log(result)
}

run()