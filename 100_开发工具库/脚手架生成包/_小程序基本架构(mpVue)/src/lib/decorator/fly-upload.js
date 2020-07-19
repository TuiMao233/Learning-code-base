// fly.upload装饰器; author: Mr_Mao
// 对fly添加upload方法, 模拟fly请求执行环境, 自动调用拦截器和返回结果封装
export default function (context) {
  // 请求结果处理
  function handlerResponse(result, config) {
    const headers = result.header
    const request = config
    const status = result.statusCode
    const statusText = 'request:ok'
    let data = null
    try {
      data = config.parseJson ? JSON.parse(result.data) : result.data
    } catch (error) {
      data = result.data
    }
    return { headers, request, status, statusText, data }
  }
  // 请求错误处理
  function handlerError(result, config) {
    const message = result.errMsg ? 'request:no' : 'request:ok'
    const request = config
    let data = null
    try {
      data = config.parseJson ? JSON.parse(result.data) : result.data
    } catch (error) {
      data = result.data
    }
    const response = {
      data: data,
      headers: result.header,
      status: result.statusCode,
    }
    const status = result.statusCode
    if (!result.errMsg) {
      return { message, request, response, status }
    }
    return { message: result.errMsg, request, status: result.statusCode || 404 }
  }
  context.upload = function (config = {}) {
    config = {
      url: '',
      name: '',
      filePath: '',
      formData: {},
      baseURL: context.config.baseURL,
      header: context.config.headers,
      timeout: context.config.timeout,
      parseJson: true,
      ...config
    }
    // 保存拦截器
    const request_handler = context.interceptors.request.handler
    const response_handler = context.interceptors.response.handler
    const response_onerror = context.interceptors.response.onerror
    // 执行uploadFile, 模拟fly环境
    return new Promise((resolve, reject) => {
      request_handler(config)
      wx.uploadFile({
        url: config.baseURL + config.url,
        filePath: config.filePath,
        name: config.name,
        formData: config.formData,
        complete(result) {
          if (result.statusCode == 200) {
            const response = handlerResponse(result, config)
            const res_int = response_handler(response)
            res_int ? resolve(res_int) : resolve(response)
          } else {
            const error = handlerError(result, config)
            const err_int = response_onerror(error)
            err_int ? reject(err_int) : reject(error)
            if (!err_int._v) {
              throw new Error(`POST ${error.request.url} ${error.status} (Internal Server Error)`)
            }
          }
        }
      })
    })
  }
}
