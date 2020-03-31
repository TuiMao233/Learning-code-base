//! 定义通知改变方法

// 引入常量名
import { ADD_COUNT,ADD_MSG } from "./action-type";
// 将方法暴露
export const addCount = (number) => ({type:ADD_COUNT,data:number})
export const addMsg = (msg) => ({type:ADD_MSG,data:msg})
// 通知方法返回值格式是对象{ type: 方法常量, data: 改变的数据 }