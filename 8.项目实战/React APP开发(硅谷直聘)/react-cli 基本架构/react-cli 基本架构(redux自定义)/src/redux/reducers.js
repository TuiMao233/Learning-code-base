//! 定义储存数据库

// 常量方法名引入
import { ADD_COUNT,ADD_MSG } from "./action-type";
// 定义储存库
const count = (state = 0, action) =>{
    switch (action.type) {
        case ADD_COUNT:
            return state + action.data
        default: return state
    }
}
const msgs = (state = '', action) =>{
    switch (action.type) {
        case ADD_MSG:
            return state + action.data
        default: return state
    }
}
export default {count, msgs}