import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
export default (reducer) => createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))