import axios from 'axios';
axios.defaults.baseURL = '/api' //
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