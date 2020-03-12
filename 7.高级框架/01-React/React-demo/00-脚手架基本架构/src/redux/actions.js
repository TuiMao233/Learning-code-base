//! 改变储存值方法库

//? 引入命名空间
import { IN_CREMENT, DE_CREMENT } from './action-types'
//? 引入储存库

//? 暴露改变储存值方法库
export const inCrement = (number) => ({ type: IN_CREMENT, data: number })
export const deCrement = (number) => ({ type: DE_CREMENT, data: number })
//? 异步操作
export const inCrementAsync = (number) => (
    dispatch => {
        setTimeout(() => {
            dispatch(inCrement(number))
        }, 1000);
    }
)


