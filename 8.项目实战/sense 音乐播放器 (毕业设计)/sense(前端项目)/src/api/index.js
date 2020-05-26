// 接口主文件, 定义接口并向外暴露
import axios from "./axios";

// 请求登录
export const reqLogin = (username, password) => axios.post('/login', {username, password})
// 请求注册
export const reqRegister = (username, password) => axios.post('/register', {username, password})