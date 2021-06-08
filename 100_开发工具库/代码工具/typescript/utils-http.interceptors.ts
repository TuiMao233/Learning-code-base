/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-30 13:49:08
 * @LastEditTime: 2021-06-08 16:14:53
 * @Description: http 入口模块
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

/** 添加拦截器 loading 处理 start */
http.interceptors.request.use((config) => {
  if (config.custom?.loading) {
    throw Error('未处理请求加载')
  }
  return config
})
http.interceptors.response.use(
  (response) => {
    if (response.config?.custom?.loading) {
      throw Error('未处理请求加载')
    }
    return response
  },
  (error) => {
    if (error.config?.custom?.loading) {
      throw Error('未处理请求加载')
    }
    return error
  }
)
/** 添加拦截器 loading 处理 end */

/** 添加响应拦截器错误处理 start */
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
/** 添加响应拦截器错误处理 end */