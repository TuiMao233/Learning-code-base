
//! 引入方法常量命名
import {IN_CREMENT, DE_CREMENT} from './action-types'

//! 引入redux创建储存库方法(store)
import store from './store'

const count = store((count=0, action)=>{
    //? 定义改变改数据的方法
    switch (action.type) {
        case IN_CREMENT:
            return count + action.data
        case DE_CREMENT:
            return count - action.data
        default:
            return count
    }
})
export {count}

