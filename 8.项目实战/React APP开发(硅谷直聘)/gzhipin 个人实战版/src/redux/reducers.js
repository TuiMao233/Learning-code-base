//! 定义储存数据库

// 常量方法名引入
import {
    ERROR_MSG, AUTH_SUCCESS, RECEIVE_USER,
    RESET_USER, RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST, RECEIVE_MSG, RECEIVE_MSG_READ
} from './action-type';
// import { gerRedirectTo } from '../utils';
const initUser = {
    username: '', // 用户
    type: '', // 用户类型 dashen/laoban
    msg: '', // 错误提示信息
    redirectPath: ''
}

// 定义储存库
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: // data是user
            return { ...action.data, redirectPath: '/' } // 成功时重定向路径为根路径
        case ERROR_MSG: // data是msg
            return { ...state, msg: action.data }
        case RECEIVE_USER: // data是user, 接收数据
            return action.data
        case RESET_USER: // data是msg, 重置数据
            return { ...initUser, msg: action.data }
        default: return state
    }
}
const userList = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default: return state
    }
}
const initChat = {
    users: {}, // 对应当前用户的聊天用户的消息
    chats: [], // 当前用户所有相关的msg数组
    unReadCount: 0 //总的未读属性
}
const chat = (state = initChat, action) => {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chats, userid } = action.data
            return {
                users, chats,
                // 计算总未读数量
                unReadCount: chats.reduce((total, item) => total + ((item.from === userid && !item.read) ? 1 : 0), 0)
            }
        case RECEIVE_MSG:
            return { // 接收一条消息
                users: state.users,
                chats: [...state.chats, action.data],
                unReadCount: state.unReadCount + ((action.data.from === action.data.userid && !action.data.read) ? 1 : 0)
            }
        case RECEIVE_MSG_READ:
            const {from, to,count} = action.data
            return {
                users:state.users,
                chats:state.chats.map(item=>{
                    if(item.from === to && item.to === from && !item.read ){
                        return {...item, read:true}
                    }else {
                        return item
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default: return state
    }
}
export default { user, userList, chat }