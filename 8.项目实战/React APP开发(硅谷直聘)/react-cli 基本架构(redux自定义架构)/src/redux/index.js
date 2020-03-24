// 定义redux接口
// react定义redux储存库方法引入
import { stateSubStore /* , stateSubStoreAll */ } from './react-redux-subscribe'
import store from './store'
// import {...} from './actions' //通知改变函数引入



// 创建每个组件需要的数据与通知函数的回调
// (✪ω✪)绑定一个store
export const stateSubApp = stateSubStore({store})


// (；´д｀)ゞ 只要数据
// export const stateSusApp = stateSubStore({store})

// (ಥ_ಥ) 只需要方法
// export const stateSusApp = stateSubStore({store,need:false},{addComment})

//   ψ(*｀ー´)ψ绑定多个store, 默认是绑定全部
/* 
export const stateSubApp = stateSubStoreAll(
    { stores, filter:['comments'] },
    { delComment, initComment,addComment }
)
*/