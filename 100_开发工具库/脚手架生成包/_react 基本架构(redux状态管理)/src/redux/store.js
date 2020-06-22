import { createStore, applyMiddleware/* , combineReducers */ } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'

// 单个储存库
// export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

// 如果是多个储存库对象，则
export default createStore(combineReducers(reducer),composeWithDevTools(applyMiddleware(thunk)))