/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-30 13:49:08
 * @LastEditTime: 2020-12-19 16:43:19
 * @Description: http 入口模块
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
  if (config.custom?.loading) {
  }
  return config;
});
/** 添加响应拦截器 */
http.interceptors.response.use(
  (response) => {
    if (response.config.custom?.loading) {
    }
    return response;
  },
  (error) => {
    if (error.config.custom?.loading) {
    }
    console.log(error);
    return Promise.reject(error);
  }
);