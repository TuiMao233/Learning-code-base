//! 1. 定义store包装函数

//? 引入创建库方法 和 异步处理方法
import { createStore, applyMiddleware } from 'redux'
//? 引入异步处理中间件
import thunk from 'redux-thunk'
//? 引入开发者扩展工具支持包
import { composeWithDevTools } from 'redux-devtools-extension'
/*  (*^▽^*)
    ! 封装store回调
    ! 第一个参数的储存库
    ! 第二个参数是使用异步与第三方扩展的固定写法
*/
export default (reducer) =>createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
    )