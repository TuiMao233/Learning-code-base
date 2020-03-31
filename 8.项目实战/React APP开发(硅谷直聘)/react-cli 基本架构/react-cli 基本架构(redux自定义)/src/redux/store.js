// import { createStore, combineReducers } from 'redux'

// 自定义mini-redux
import { createStore, combineReducers } from 'redux'
import reducers from './reducers'

// 单个储存库
// export default createStore(reducer)

// 如果是多个储存库对象，则
export default createStore(combineReducers(reducers))