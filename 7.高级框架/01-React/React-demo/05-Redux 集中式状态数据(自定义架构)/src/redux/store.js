import { createStore, applyMiddleware ,/* combineReducers */} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import count from './reducers'

// 多个储存库
// export default createStore(combineReducers(stores), composeWithDevTools(applyMiddleware(thunk)))

// 一个储存库
export default createStore(count, composeWithDevTools(applyMiddleware(thunk)))
