
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

