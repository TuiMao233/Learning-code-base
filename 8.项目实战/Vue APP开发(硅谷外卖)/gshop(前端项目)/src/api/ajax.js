import axios from 'axios';
// axios.defaults.baseURL = '/api' // 定义检测跨域链接参数
export const get = (url, params = {}) => (
    new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
)
export const post = (url, data = {}) => (
    new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
)