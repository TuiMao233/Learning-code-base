import axios from 'axios'
// 定义弹出框
import { message } from 'antd'

// 定义默认路径

export const get = (url='', params={}) => new Promise((resolve) => {
    axios.get(url, { params })
        .then(response => resolve(response.data))
        .catch(error => message.error('请求错误' + error.message))
})
export const post = (url='', data={}, params={}) => new Promise((resolve) => {
    axios.post(url, data, { params })
        .then(response => resolve(response.data))
        .catch(error => message.error('请求错误' + error.message))
})