import React from 'react';
import ReactDOM from 'react-dom';


// 定义路由功能组件引入
import { HashRouter } from 'react-router-dom'

// 引入react-redux支持库
import { Provider } from 'react-redux'

// 引入redux数据库(store)
import store from './redux/init';

// 引入主组件
import Main from './routes/Main'

// 页面渲染
ReactDOM.render(
    (<HashRouter>
        <Provider store={store}>
            <Main />
        </Provider>
    </HashRouter>),
    document.getElementById('root')
);

