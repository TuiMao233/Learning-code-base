// reducers: function(state, action){ return newState}
// createStore(reducers)  
// reducers: {reducer1, reducer2}
// combineReducers(reducers)

// 返回当前state
// getState()
// 分发action: 调用reducers()得到新的总state, 执行所有已注册的监听函数
// dispatch(action)
// 订阅监听: 将监听函数保存起来
// subscribe(listener)


// reducer创建并返回store的函数
function createStore(reducer) {
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
// 定义一个reducer
const store = createStore((state = 0, action) => {
    switch (action.type) {
        case 'add_count':
            return state + action.data
        default: return state
    }
})
// 订阅state的监视
store.subscribe(() => console.log('监视器执行了'))
// 执行分发并更新state任务
store.dispatch({ type: 'add_count', data: 1 })
// 获取当前state的值
console.log(store.getState())












function createStore(reducer) {
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
function combineReducers(reducers) { // reducer(state, action) --> state
    return function (state = {}, action) {
        // 依次调用reducer并保存到state对象中
        reducerkeys = Object.keys(reducers)
        reducerkeys.forEach(key => (
            state[key] = reducers[key](state[key], action)
        ))
        return state
    }
}
// 定义多个reducer的store集合
const stores = createStore( 
    // 传入多个reducer, 转换成一个reducer, 数据将变成对象, 将多个reducer的结果以key=val的形式保存
    combineReducers({
        count: (state = 5, action) => {
            switch (action.type) {
                case 'add_count':
                    return state + action.data
                default: return state
            }
        },
        msg: (state = '老铁666', action) => {
            switch (action.type) {
                case 'add_msg':
                    return state + action.data
                default: return state
            }
        },
    })
)

// 订阅state的监视
stores.subscribe(() => console.log('监视器执行了'))
// 执行分发并更新state任务
stores.dispatch({ type: 'add_count', data: 1 })
// 获取当前state的值
console.log(stores.getState())

