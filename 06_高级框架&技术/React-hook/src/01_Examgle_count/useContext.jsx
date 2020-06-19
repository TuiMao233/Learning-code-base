import React, { useState, createContext, useContext } from 'react';
// 创建count上下文
const CountContext = createContext()
// 子组件
function Counter() {
    let count = useContext(CountContext)
    return <h2>{count}</h2>
}
// 父组件
function CountHooks() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>click me</button>
            {/* 创建一个上下文组件, value存放需要传递的值, 标签内传入组件 */}
            <CountContext.Provider value={count}>
                <Counter />
            </CountContext.Provider>
        </div>
    )
}
export default CountHooks;