/* 
    1.函数的返回值为promise, 成功的结果为response, 失败的结果为error
    2.能处理多种类型的请求: GET/POST/PUT/DELETE
    3.函数的参数为一个配置对象
      {
        url: '',   // 请求地址
        method: '',   // 请求方式GET/POST/PUT/DELETE
        params: {},  // GET/DELETE请求的query参数
        data: {}, // POST或DELETE请求的请求体参数 
      }
    4.响应json数据自动解析为js的对象/数组
*/
function axios({
    url,
    method = 'GET',
    params= { }, //? GET/DELETE请求的query参数
    data= { }    //? POST或DELETE请求的请求体参数 
}) {
    return new Promise((resolve, reject) => {

        method = method.toUpperCase()

        var request = window.XMLHttpRequest ? new XMLHttpRequest() :
        window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : []

        //! 如果携带query，代表get请求需要携带参数
        const queryStr = Object.keys(params).map(key=>{
            return `${key}=${params[key]}`
        })
        if(queryStr.length > 0){url += '?' + queryStr.join("&")}
        request.open(method,`${url}`, true)
        if(method==='GET' || method === 'DELETE'){
            request.send()
        }else if(method=== 'POST' || method === 'PUT'){
            //! 如果是post请求，代表格式要设置成json，并把请求体转换为json,并发送请求
            request.setRequestHeader('Content-Type','application/json;charset=utf-8')
            request.send(JSON.stringify(data)) // 发送json格式请求体参数
        }
        
        //! 监听请求
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //! 判断请求是否完成
                if(request.status >= 200 && request.status < 300 || request.status === 304){
                        //! 判断是否请求成功
                        resolve({
                            data: JSON.parse(request.response),
                            statusText: request.statusText,
                            status: request.status
                        })
                }else{reject(new Error('request error status is '+ request.status))}
            }
        }
    })
}