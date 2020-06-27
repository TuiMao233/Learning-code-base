interface ConFig {
    type: string // 请求类型
    url: string // 请求url
    data?: any // 请求体参数
    dataType: string // 数据类型
}

function ajax(config:ConFig) {
    const xhr = new XMLHttpRequest()
    xhr.open(config.type,config.url, true)
    xhr.send(config.data)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('---成功---');
            if (config.dataType == 'json'){
                JSON.parse(xhr.responseText)
            }
            console.log(xhr.responseText);
        }
    }
}

ajax({
    type: 'GET',
    url: 'http://www.baidu.com',
    dataType: 'json'
})