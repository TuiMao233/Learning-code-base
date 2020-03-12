import {addComment, delComment, initComment} from './actions'

//? 引入react-redux-store订阅库
import {stateSubStore} from 'react-redux-subscribe'

import comments from './store'


export const CommitStateSub = stateSubStore({comments,need:false},{addComment})

export const ListStateSub = stateSubStore({comments}, {delComment, initComment})



// (✪ω✪)绑定一个
// export const AppStateSub = stateSubStore({stores}, {addComment, delComment, initComment})

// (ಥ_ಥ) 只需要方法
// export const CommitStateSus = stateSubStore({store,need:false},{addComment})

//   ψ(*｀ー´)ψ绑定多个, 并进行筛选(可选)
/* export const AppStateSub = stateSubStoreAll({
    stores,
    filter:['comments']
},{delComment, initComment,addComment}) */

