//! 定义通知改变方法

// 引入常量名
import {
    AUTH_SUCCESS, ERROR_MSG, RESET_USER,
    RECEIVE_USER, RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST, RECEIVE_MSG, RECEIVE_MSG_READ
} from "./action-type";

// 引入ajax方法
import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList, reqMsgList, reqReadMsg } from '../api';

import io from 'socket.io-client'

function initIo(dispatch, userid) {
    // 连接并绑定箭头
    if (!io.socket) {
        io.socket = io('/') // ws://localhost:4000
        io.socket.on('receiveMsg', function (data) {
            // 由于是接收所有消息, 所以进行过滤
            if (data.from === userid || data.to === userid) {
                data.userid = userid
                dispatch(receiveMsg(data))
            }
        })
    }
}
// 发送消息的异步action
export const sendMsg = ({ to, from, content }) => {
    return dispatch => {
        io.socket.emit('sendMsg', { to, from, content })
    }
}

// 注册/登录同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 失败信息action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接收用户信息
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户信息
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
// 接收用户列表数据
const receiveUserList = (UserList) => ({ type: RECEIVE_USER_LIST, data: UserList })
// 接收用户消息列表
const receiveMsgList = (msgList) => ({ type: RECEIVE_MSG_LIST, data: msgList })
// 接收单条消息
const receiveMsg = (msg) => ({ type: RECEIVE_MSG, data: msg })
// 接收更新为已读的数量
const receiveReadMsg = (from,to,count) => ({ type: RECEIVE_MSG_READ, data: {from,to,count} })

// 注册获取数据的异步action
export const register = (user) => {
    // 前端验证
    const { username, password, password2, type } = user
    if (!username) {
        return errorMsg('用户名必须指定!')
    } else if (password !== password2) {
        return errorMsg('密码并不一致!')
    } else if (!password) {
        return errorMsg('密码必须指定!')
    }

    return async dispatch => {
        // 发送并接受请求
        const response = await reqRegister({ username, password, type })  // {code:0, data:{}}
        // 获取响应数据
        const result = response.data
        // 判断响应为成功还是失败
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}
// 登录获取数据的异步action
export const login = (user) => {
    // 前端验证
    const { username, password, type } = user
    if (!username) {
        return errorMsg('用户名必须指定!')
    } else if (!password) {
        return errorMsg('密码必须指定!')
    }

    return async dispatch => {
        // 发送并接受请求
        const response = await reqLogin({ username, password, type })  // {code:0, data:{}}
        // 获取响应数据
        const result = response.data
        // 判断响应为成功还是失败
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}
// 更新获取数据的异步action
export const updata = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        // 判断成功还是失败
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
// 获取用户数据的异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
// 获取用户列表的异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}
// 异步获取消息列表函数
async function getMsgList(dispatch, userid) {
    initIo(dispatch, userid)
    const response = await reqMsgList()
    const result = response.data
    if (result.code === 0) {
        result.data.userid = userid
        dispatch(receiveMsgList(result.data))
    }
}
// 异步更新已读数量
export function upReadMsg(from,to) {
    return async  dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveReadMsg(from,to,result.data))
        }
    }
}