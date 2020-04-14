const axios = require('axios')

const get = (url, params = {}) => (
    new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then(response => resolve(response.data))
            .catch(error => resolve('数据获取失败'))
    })
)
const post = (url, data = {}, params = {}) => (
    new Promise((resolve, reject) => {
        axios.post(url, data, {params})
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
)

module.exports = {get, post}
