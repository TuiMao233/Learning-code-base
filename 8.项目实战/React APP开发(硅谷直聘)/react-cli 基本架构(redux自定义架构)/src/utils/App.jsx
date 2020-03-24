import React, { Component } from 'react';
// redux订阅方法引入
import { stateSubApp } from "./redux";

// 引入路由链接组件,路由显示区域组件, 默认路由组件, 路由组件
// import { NavLink, Switch, Redirect, Route  } from 'react-router-dom';

// 引入antd样式库组件
import { Button } from 'antd-mobile'

class App extends Component {
    constructor(props) {
        super(props);

        // store订阅
        stateSubApp(this)
    }
    render() {
        return (
            <div>
                <Button>这是一个按钮</Button>
                <h1 className='title'>这是react组件</h1> 
            </div>
        );
    }
}

export default App;