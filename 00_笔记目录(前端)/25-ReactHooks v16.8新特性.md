---
title: ReactHooks v16.8新特性
date: 2020-11-01
categories:
  - 前端学习笔记
tags: 
  - reacthooks
---
## [React Hooks 简介](https://jspang.com/detailed?id=50#toc33)

`React Hooks`就是用函数的形式代替原来的继承类的形式，并且使用预函数的形式管理`state`，有Hooks可以不再使用类的形式定义组件了。这时候你的认知也要发生变化了，原来把组件分为有状态组件和无状态组件，有状态组件用类的形式声明，无状态组件用函数的形式声明。那现在所有的组件都可以用函数来声明了。

### 使用步骤

使用`create-react-app`创建项目

~~~makefile
npm create-react-app i -g ## 安装脚手架

create-react-app [deom_name] ## 创建项目
	Creating a new React app in D:\Learning_code\06_高级框架&技术\React-hooks\react-hooks.
	
cnpm i react@16.9 react-dom@16.9 --save ## 更新版本
~~~

### class 组件写法

~~~jsx
import React, { Component } from 'react';
class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { count:0 }
    }
    render() { 
        return (<>
            <p>You clicked {this.state.count} times</p>
            <button onClick={this.addCount.bind(this)}>Chlick me</button>
        </>);
    }
    addCount(){ // 每次加一, 需访问this.state
        this.setState({count:this.state.count+1})
    }
}

export default Example;
~~~

### Hooks 写法

~~~jsx
import React, { useState } from 'react';
function CountHooks(){
    const [ count , setCount ] = useState(0);
    return (<>
        <p>You clicked {count} times</p>
        <button onClick={()=>{setCount(count+1)}}>click me</button>
    </>)
}
export default CountHooks;
~~~

## 必须在根函数中定义

~~~jsx
import React, { useState } from 'react';
let showSex = true
function Example(){
    // 声明了count状态, 接受了值与设置值的方法
    const [ age, setAge ] = useState(18);
    if (showSex) { // 报错
        const [ sex, setSex ] = useState('男');
        showSex = false;
    }
    const [ work, setWork ] = useState('前端工程师');
    return (<>
        <p>Mr_Mao 今年：{age} </p>
        <p>性别：{sex} </p>
        <p>工作是：{work} </p>
    </>)
}
export default Example;
~~~

## useEffect 声明生命周期的钩子

在使用`React Hooks`的情况下，我们可以使用`useEffect`完成上边代码的生命周期效果。

~~~jsx
import React, { useState, useEffect } from 'react';
function CountHooks(){
    const [ count, setCount ] = useState(0);
    //---关键代码---------start-------
    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)
    })
    //---关键代码---------end-------
    return (<>
        <p>You clicked {count} times</p>
        <button onClick={()=>{setCount(count+1)}}>click me</button>
    </>)
}
export default CountHooks;
~~~

React首次渲染和之后的每次渲染都会调用一遍`useEffect`函数，`useEffect`useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而`componentDidMonut`和`componentDidUpdate`中的代码都是同步执行的。

## useEffect 组件卸除时

每次组件更新时，都会先试着清除上次的副作用(`useEffect中的return function`)

~~~jsx
import React, { useState, useEffect } from 'react';
function CountHooks(){
    const [ count, setCount ] = useState(0);
    //---关键代码---------start-------
    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)
        return ()=>{
            // 返回一个副作用的解绑函数
        }
    })
    //---关键代码---------end-------
    return (<>
        <p>You clicked {count} times</p>
        <button onClick={()=>{setCount(count+1)}}>click me</button>
    </>)
}
export default CountHooks;
~~~

useEffect 还有第二个数组参数，用来指定所监听的 state 列表，该参数缺省的话默认应该是全监听的，明确提供空数组时，每次组件更新都不会再执行该“副作用”，只有最终组件卸载时，react 会兜个底，调用解绑回调。

~~~jsx
useEffect(()=>{
	console.log(`useEffect=>You clicked ${count} times`)
	return ()=>{/*组件销毁时执行*/}
}, [])
useEffect(()=>{
	console.log(`useEffect=>You clicked ${count} times`)
	return ()=>{/*count改变时*/}
}, [count])
~~~

## useContext 定义组件传参

在父子组件中传递，使用createContext与useContext传递父组件参数

~~~jsx
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
~~~

## useReducer 状态库的定义

~~~jsx
import React, { useReducer } from 'react';
function ReducerDemo() {
    // 定义一个状态, useReducer参数一是Reducer的状态函数, 第二个参数是该状态的默认值
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
~~~

## Reducer与Context实现全局状态管理

useReducer 主要实现了状态管理采用Reducer模式管理，Context 主要实现了多个组件中数据的传递。两个结合起来就能实现一个全局的状态数据管理。

~~~jsx
import React, { createContext, useReducer } from 'react'
// 定义一个全局上下文组件
export const ColorContext = createContext({})
// 定义action改变状态的常量
export const UPDATE_COLOR = "UPDATE_COLOR"
// 定义一个纯函数reducer状态库
const reducer = (state,action)=>{
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
~~~

## useMemo 解决渲染性能问题

`useMemo`主要用来解决使用React hooks产生的无用渲染的性能问题。使用function的形式来声明组件，失去了`shouldCompnentUpdate`（在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。而且在函数组件中，也不再区分`mount`和`update`两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。

~~~jsx
import React, { useState, useMemo } from 'react';
function Example() {
    const [xiaohong, setXiaohong] = useState('小红待客状态')
    const [zhiling, setZhiling] = useState('志玲待客状态')
    return <>
        <button onClick={() => { setXiaohong(new Date().getTime()) }}>小红</button>
        <button onClick={() => { setZhiling(new Date().getTime() + ',志玲向我们走来了') }}>志玲</button>
        <ChildComponent name={xiaohong}>{zhiling}</ChildComponent>
    </>
}
function ChildComponent({ name, children }) {
    function changeXiaohong(name) {
        console.log('她来了，她来了。小红向我们走来了')
        return name + ',小红向我们走来了'
    }
    // 每当父组件状态发生改变都会执行该方法, 这样会导致性能出现问题
    const actionXiaohong = changeXiaohong(name)
    return <>
        <div>{actionXiaohong}</div>
        <div>{children}</div>
    </>
}

export default Example
~~~

这时候你会发现在浏览器中点击`志玲`按钮，小红对应的方法都会执行，结果虽然没变，但是每次都执行，这就是性能的损耗。目前只有子组件，业务逻辑也非常简单，如果是一个后台查询，这将产生严重的后果。所以这个问题必须解决。

其实只要使用`useMemo`，然后给她传递第二个参数，参数匹配成功，才会执行。代码如下：

~~~jsx
function ChildComponent({name,children}){
    function changeXiaohong(name){
        console.log('她来了，她来了。小红向我们走来了')
        return name+',小红向我们走来了'
    }
    const actionXiaohong = useMemo(()=>changeXiaohong(name),[name]) 
    return (
        <>
            <div>{actionXiaohong}</div>
            <div>{children}</div>
        </>
    )
}
~~~

这时在浏览器中点击一下`志玲`按钮，`changeXiaohong`就不再执行了。也节省了性能的消耗。从程序本身看到优化的作用。好的程序员对自己写的程序都是会进行不断优化的，这种没必要的性能浪费也是绝对不允许的，所以`useMemo`的使用在工作中还是比较多的。

## useRef 获取DOM元素

`useRef`在工作中虽然用的不多，但是也不能缺少。它有两个主要的作用:用`useRef`获取React JSX中的DOM元素，获取后你就可以控制DOM的任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制。或用`useRef`来保存变量，这个在工作中也很少能用到，我们有了`useContext`这样的保存其实意义不大，但是这是学习，也要把这个特性讲一下。

~~~jsx
import React, { useRef, useState, useEffect } from 'react';
function Example8() {
    const inputEl = useRef(null)
    const onButtonClick = () => {
        inputEl.current.value = "Hello ,useRef"
        console.log(inputEl)
    }
    //-----------关键代码--------start
    const [text, setText] = useState('jspang')
    const textRef = useRef()

    useEffect(() => {
        textRef.current = text;
        console.log('textRef.current:', textRef.current)
    })
    //----------关键代码--------------end
    return <>
        {/*保存input的ref到inputEl */}
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>在input上展示文字</button>
        <br />
        <br />
        <input value={text} onChange={(e) => { setText(e.target.value) }} />
    </>

}
export default Example8
~~~

这时候就可以实现每次状态修改，同时保存到`useRef`中了。也就是我们说的保存变量的功能。那`useRef`的主要功能就是获得DOM和变量保存。

## 自定义hooks函数

其实自定义Hooks函数和用Hooks创建组件很相似，跟我们平时用JavaScript写函数几乎一模一样，可能就是多了些`React Hooks`的特性，自定义Hooks函数偏向于功能，而组件偏向于界面和业务逻辑。由于差别不大，所以使用起来也是很随意的。如果是小型项目是可以的，但是如果项目足够复杂，这会让项目结构不够清晰。所以学习自定义Hooks函数还是很有必要的。

在实际开发中，为了界面更加美观。获取浏览器窗口的尺寸是一个经常使用的功能，这样经常使用的功能，就可以封装成一个自定义`Hooks`函数，记住一定要用use开头，这样才能区分出什么是组件，什么是自定义函数。

编写一个每次修改状态的方法`onResize`，这个方法使用`useCallback`，目的是为了缓存方法(useMemo是为了缓存变量)。

~~~jsx
import React, { useState ,useEffect ,useCallback } from 'react';
function useWinSize(){
    const [ size , setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })
    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    },[]) 
    useEffect(()=>{
        window.addEventListener('resize',onResize)
        return ()=>{
            window.removeEventListener('resize',onResize)
        }
    },[])
    return size;
}
function Example9(){
    const size = useWinSize()
    return <div>页面Size:{size.width}x{size.height}</div>
}
export default Example9 
~~~

