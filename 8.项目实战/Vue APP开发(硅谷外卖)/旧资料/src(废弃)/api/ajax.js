import axios from 'axios'
// ajax请求函数模块
// 返回值:promise对象(异步返回的数据是: response.data)
export default function (url = '', data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        // 执行异步ajax请求
        let promise
        if (type === 'GET') { // 如果type是get方法
          let dataStr = '' //
          Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
          })
          if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
            url += '?' + dataStr
          }
          // 发送get请求
          promise = axios.get(url)
        } else {
          // 发送post请求
          promise = axios.post(url, data)
        }
        promise.then(function (response) {
          resolve(response.data)
        }).catch(function (error) {
          reject(error)
        })
    })
}
