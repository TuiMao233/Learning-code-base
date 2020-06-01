
//! 引入方法常量命名
import { ADD_COMMENT, DEL_COMMENT, INIT_COMMENT } from './action-types'

const comments = (state = [], action) => {
    //? 定义改变改数据的方法
    switch (action.type) {
        case INIT_COMMENT:
            return action.data
        case ADD_COMMENT:
            return [action.data, ...state]
        case DEL_COMMENT:
            return state.filter((comments, index)=> index!==action.data)
        default:
            return state
    }
}

// export default { comments, comments1 }
export default comments