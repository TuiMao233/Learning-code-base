/* 
/ Provider
    值: 组件类
    作用: 向所有容器子组件提供全局store对象
    使用: // <Provider store={store}><Xxx/></Provider>
/ connect
    值: 高阶函数
    作用: 包装组件生成容器组件, 让被包装组件能与redux进行通信
    使用: // connect(mapStateToProps, mapDispatchToProps)(Component) 
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types'

// 初始化一个context默认值为{}
const StoreContext = React.createContext({});
// store封装组件类
class Provider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  render() {
    return (
      // 将store传入全局context中
      <StoreContext.Provider value={this.props.store} >
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}
// 链接redux组件功能函数
function connect(mapStateToProps, mapDispatchToProps) {
  return function (WarpComponent) {
    return class ConnectComponent extends Component {
      // 进行组件绑定context值
      static contextType = StoreContext;
      constructor(props, context) {
        super(props, context);
        const store = this.context
        // state初始化绑定redux数据
        this.state = mapStateToProps(store.getState())
        // 封装Dispatch方法为数组
        const dispatchKeys = Object.keys(mapDispatchToProps)
        // 对传进来的dispatch进行封装
        this.warpDispatchs = dispatchKeys.reduce(
          (total, key) => {
            total[key] = (...args) => store.dispatch(mapDispatchToProps[key](...args))
            return total
          }, {}
        )
      }
      componentDidMount() {
        // 订阅更新监听
        const store = this.context
        // 订阅监听store更新内部属性
        store.subscribe(() => {
          this.setState(mapStateToProps(store.getState()))
        })
      }
      // 将封装好的state与dispatch传入子组件
      render = () => <WarpComponent {...this.state} {...this.warpDispatchs} />
    }
  }
}
// 将方法暴露
export { Provider, connect }























// reducer创建并返回store的函数
export function createStore(reducer) {
  let state
  const listeners = []
  state = reducer(state, { type: '@mini-redux' })

  // 获取当前state
  function getState() {
    return state
  }
  // 当调用时执行action并返回新的state
  function dispatch(action) { // action:{type:'',data:...}
    // 调用reducer, 得到新的state, 保存
    state = reducer(state, action)
    // 执行监视器的所有函数
    listeners.forEach(listener => listener())
  }
  // 订阅一个state的监视
  function subscribe(listener) {
    listeners.push(listener)
  }
  return { getState, dispatch, subscribe }
}
// reducers创建并返回一个reducer函数
export function combineReducers(reducers) { // reducer(state, action) --> state
  return function (state = {}, action) {
    // 依次调用reducer并保存到state对象中
    const reducerkeys = Object.keys(reducers)
    reducerkeys.forEach(key => (
      state[key] = reducers[key](state[key], action)
    ))
    return state
  }
}

