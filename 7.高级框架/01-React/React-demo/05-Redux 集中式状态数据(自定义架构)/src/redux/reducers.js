
//! 引入方法常量命名
import {IN_CREMENT, DE_CREMENT} from './action-types'

const count = (state=0, action)=>{
    //? 定义改变改数据的方法
    switch (action.type) {
        case IN_CREMENT:
            return state + action.data
        case DE_CREMENT:
            return state - action.data
        default:
            return state
    }
}
// export default { comments, comments1 } (ಥ_ಥ) 多个储存库
export default count

