import React from 'react';
import ReactDOM from 'react-dom';


// 定义路由功能组件引入
import { HashRouter, Route, Switch } from 'react-router-dom'

// 引入路由组件
import Main from './routes/main/main';

// 页面渲染
ReactDOM.render(
    (<HashRouter>
        <Switch>
            <Route component={Main}></Route>
        </Switch>
    </HashRouter>),
    document.getElementById('root')
);

