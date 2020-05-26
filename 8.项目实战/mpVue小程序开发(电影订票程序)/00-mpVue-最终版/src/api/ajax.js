var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly
export const get = (url, params = {}) => (
    new Promise((resolve, reject) => {
        fly.get(url, { params })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
)
export const post = (url, data = {}) => (
    new Promise((resolve, reject) => {
        fly.post(url, data)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
)