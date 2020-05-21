import ajax from './ajax'
// 请求注册接口
export const reqRegister = (user) => ajax(`/register`, user, 'POST')
// 请求登录接口
export const reqLogin = ({username, password}) => ajax(`/login`, {username, password}, 'POST')
// 更新用户接口
export const reqUpdateUser = (user) => ajax(`/updata`, user, 'POST')
// 获取用户数据
export const reqUser = () => ajax(`/user`)
// 获取用户列表
export const reqUserList = (type) => ajax(`/userlist`,{type})
// 获取用户消息列表
export const reqMsgList = () => ajax(`/msglist`)
// 修改当前聊天信息为已读
export const reqReadMsg = (from) => ajax(`/readmsg`,{from}, 'POST')