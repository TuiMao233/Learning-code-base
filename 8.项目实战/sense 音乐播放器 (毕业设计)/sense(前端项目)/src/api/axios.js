// axios配置js, 向外暴露配置好的axios
import axios from "axios";
import { Notification } from "element-ui";

// 定义检测跨域链接参数
axios.defaults.baseURL = '/api'

// 添加响应拦截器
axios.interceptors.response.use(
  // 响应成功直接取数据
  response => response.data,
  // 响应失败弹出警告框
  error => Notification.error({ title: "请求发生错误", message: error })
);
export default axios;
