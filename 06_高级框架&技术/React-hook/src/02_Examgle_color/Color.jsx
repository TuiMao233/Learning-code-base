import React, { createContext, useReducer } from 'react'
// 定义一个全局上下文组件
export const ColorContext = createContext({})
// 定义action改变状态的常量
export const UPDATE_COLOR = "UPDATE_COLOR"
const reducer= (state,action)=>{
    switch(action.type){
        case UPDATE_COLOR:
            return action.color
        default:
            return state
    }
}

export const Color = props => {
    const [color, dispatch] = useReducer(reducer, "blue")
    return <>
        {/* 全局上下文中传入对象, 该对象可全局中每个组件使用useContext引用 */}
        {/* 传入使用useReducer定义的状态与派发方法, 形成全局都能看到与调用的状态库 */}
        <ColorContext.Provider value={{ color, dispatch }}>
            {props.children}
        </ColorContext.Provider>
    </>
}