// 接口主文件, 定义接口并向外暴露
import axios from "./axios";

// 请求登录
export const reqLogin = (email, password) => axios.post('/login', {email, password})
// 请求注册
export const reqRegister = (name, email, password) => axios.post('/register', {name, email, password})