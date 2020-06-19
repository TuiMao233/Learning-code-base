import React, { useReducer } from 'react';
function ReducerDemo() {
    // 定义一个状态, useReducer参数一是Reducer的状态, 第二个参数是该状态的默认值
    const [count, dispatch] = useReducer((state, action) => {
        switch (action) {
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            default: return state;
        }
    }, 0)

    return <>
        <div>
            <h2>现在的分数是{count}</h2>
            {/* 点击进行派发, 改变count的状态 */}
            <button onClick={() => dispatch('add')}>Increment</button>
            <button onClick={() => dispatch('sub')}>Decrement</button>
        </div>
    </>
}
export default ReducerDemo