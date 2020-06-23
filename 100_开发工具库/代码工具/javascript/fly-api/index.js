import fly from "./wx-fly-config";

/* 请求示例
 ? get方法, 第二参数是query参数, 通过对象传递, 第三个参数是请求配置, 可配置flyio的所有配置
 ? export const getTest = (a, b) => fly.get('/user/xxx', {id:1}, {})
 ? 请求相当于--> /user/xxx?id=1
 ?
 ? post方法, 第二参数是body参数, 通过对象传递, 第三个参数是请求配置, 可配置flyio的所有配置
 ? export const postTest = (a, b) => fly.post('/user/xxx', {id:1}, {})
 ? 请求相当于--> /user/xxx --> body:{id:1} 
*/