//! 5. 定义react-redux接口

import React from 'react';
import ReactDOM from 'react-dom';

//? 引入react-redux的 redux状态管理组件
import { Provider } from 'react-redux'
//? 引入count储存库
import {count} from './redux/reducers'

import App from './containters/app';

//? App 封装在Provider(状态管理组件中)
ReactDOM.render(
    //? 将储存库传入状态管理组件中
    (<Provider store={count}>
        <App />
    </Provider>)
    , document.getElementById('root'));

