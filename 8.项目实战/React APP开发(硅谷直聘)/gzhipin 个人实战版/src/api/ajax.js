import axios from 'axios'
/* 发送ajax任意请求的ajax函数 */

export default function ajax(url = '', data = {}, type = 'GET') {
    if (type === 'GET') {
        return axios.get(url, {
            params: data
        })
    } else if (type === 'POST') {
        return axios.post(url, data)
    }
}