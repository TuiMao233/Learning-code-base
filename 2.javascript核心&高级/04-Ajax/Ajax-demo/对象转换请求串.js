// ajax请求函数模块
// 返回值:promise对象(异步返回的数据是: response.data)
export default function (url = '', data = {}, type = 'GET') {
        // 执行异步ajax请求
        if (type === 'GET') { // 如果type是get方法
          let dataStr = '' //
          Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&' // '属性名=属性值&属性名=属性值&'
          })
          if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&')) // '属性名=属性值&属性名=属性值'
            url += '?' + dataStr // 'url?属性名=属性值&属性名=属性值'
          }
          // 发送get请求
		  
        } else {
          // 发送post请求
        }
    })
}
