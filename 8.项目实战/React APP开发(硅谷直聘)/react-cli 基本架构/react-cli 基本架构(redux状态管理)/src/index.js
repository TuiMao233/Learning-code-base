import React from 'react';
import ReactDOM from 'react-dom';


// 定义路由功能组件引入
import { HashRouter, Route, Switch } from 'react-router-dom'

import { Provider } from "react-redux";
import store from "./redux/store";

// 页面渲染
ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    // 根路径显示路由
                    <Route component={Main}></Route>
                </Switch>
            </HashRouter>
        </Provider>
    ),
    document.getElementById('root')
);

