//! 引入redux创建储存库(store)
import { createStore } from 'redux'
//! 引入方法常量命名
import {IN_CREMENT, DE_CREMENT} from './action-types'

//! 2.定义指定储存库(store)与改变数据方法(reducer)
//? store储存库默认值是 0 
//? action.type是改变数据的类型
//? action可以携带任意数据, 用于改变储存值状态
export const store = createStore((state = 0, action) => {
    //? 定义改变改数据的方法
    switch (action.type) {
        case IN_CREMENT:
            return state + action.data
        case DE_CREMENT:
            return state - action.data
        default:
            return state
    }
})