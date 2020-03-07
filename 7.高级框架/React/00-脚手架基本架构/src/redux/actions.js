//! 改变储存值方法库

//? 引入命名空间
import {IN_CREMENT, DE_CREMENT} from './action-types'
//? 引入并暴露储存库
import {count} from './reducers'

//? 暴露改变储存值方法库
export const inCrement = (number)=>{count.dispatch({ type: IN_CREMENT, data: number })}
export const deCrement = (number)=>{count.dispatch({ type: DE_CREMENT, data: number })}
//? 异步操作
export const inCrementAsync = (number) => {
    setTimeout(() => inCrement(number), 1000);
}
