import axios from 'axios';

// 定义检测跨域链接参数
// axios.defaults.baseURL = '/api' 

// axios.config.headers.token = "ZxX7E9jpYOrw8G5Nusel2kDAWn6FS3mR"
// axios.config.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  if (config.load) {
    throw Error('错误! 加载模板并未被实现!')
  }
})

// 添加响应拦截器
axios.interceptors.response.use(
  // 响应成功直接取数据
  response => response.data,
  // 响应失败弹出警告框
  error => {
    console.log(error)
    throw Error('错误! 请求错误未做处理!')
  }
)
export default axios