import count from './store'
import {inCrement, deCrement, inCrementAsync} from './actions'

//? 引入react-redux-store订阅库
import {stateSubStore, /* stateSubStoreAll */} from 'react-redux-subscript'

export const AppStateSus = stateSubStore({count},{inCrement,deCrement,inCrementAsync})


// (✪ω✪)绑定一个
// export const AppStateSub = stateSubStore({stores}, {addComment, delComment, initComment})

// (ಥ_ಥ) 只需要方法
// export const CommitStateSus = stateSubStore({store,need:false},{addComment})

//   ψ(*｀ー´)ψ绑定多个, 并进行筛选(可选)
/* export const AppStateSub = stateSubStoreAll({
    stores,
    filter:['comments']
},{delComment, initComment,addComment}) */