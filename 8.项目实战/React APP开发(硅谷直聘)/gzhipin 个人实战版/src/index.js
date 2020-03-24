import React from 'react';
import ReactDOM from 'react-dom';


// 定义路由功能组件引入
import { HashRouter, Route, Switch } from 'react-router-dom'

// 引入路由组件
import Register from './routes/register/register';
import Login from './routes/login/login';
import Main from './routes/main/main';

// 引入redux管理组件
import { Provider } from "react-redux";
// 引入数据库
import store from './redux/store'

// 页面渲染
ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route component={Main}></Route>
                </Switch>
            </HashRouter>
        </Provider>
    ),
    document.getElementById('root')
);

