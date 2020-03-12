//! 改变储存值方法库

//? 引入命名空间
import { DEL_COMMENT, ADD_COMMENT, INIT_COMMENT } from './action-types'
//? 引入储存库

//? 暴露改变储存值方法库
export const addComment = (name, commentText) => ({
    type: ADD_COMMENT,
    data: { name, commentText }
})
export const delComment = (index) => ({ type: DEL_COMMENT, data: index })

let comments = [
    { name: '你大爷', commentText: 'React真是太bang了' },
    { name: '你老爹', commentText: 'React真是太⑥了' },
    { name: '你哥们', commentText: 'React真是太nb了啊' },
]
//? 异步操作
export const initComment = () => (
    dispatch => {
        setTimeout(() => {
            dispatch({ type: INIT_COMMENT, data: comments })
        }, 1000);
    }
)


