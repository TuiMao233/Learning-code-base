import {post} from './ajax';

// 请求用户信息
export const reqUserInfo = (username, password) => post(`/login`, {username, password})