//! 4. 定义通知改变函数

//? 引入方法常量命名
import {IN_CREMENT} from './action-types'
//? 引入count储存库

//? 定义通知改变函数 in-->加 de-->捡 
//? 返回一个通知类型函数，此方法由react-redux调用
export const inCrement = (number)=>({ type: IN_CREMENT, data: number })

//! 异步执行方法
export const inCrementAsync = (number)=>(
    dispatch => {
        setTimeout(() => {
            dispatch(inCrement(number))
        }, 1000);
    }
)