/*
 * @Author: 毛先生
 * @Date: 2020-06-08 10:45:36
 * @LastEditTime: 2020-08-29 14:07:56
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
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
    axios.post(url, data, { params })
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
)

module.exports = { get, post }
