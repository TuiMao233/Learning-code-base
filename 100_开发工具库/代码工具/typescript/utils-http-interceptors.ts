/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
  if (config.custom?.load) {
  }
  return config;
});
/** 添加响应拦截器 */
http.interceptors.response.use(
  (response) => {
    if (response.config.custom?.load) {
    }
    return response;
  },
  (error) => {
    if (error.config.custom?.load) {
    }
    console.log(error);
    return Promise.reject(error);
  }
);