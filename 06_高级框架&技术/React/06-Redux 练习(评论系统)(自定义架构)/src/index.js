//! React基本引入
import React from 'react';
import ReactDOM from 'react-dom';

//! 主组件引入
import App from './components/app/app';

//! 样式文件引入
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

//! 渲染组件
ReactDOM.render(<App />, document.getElementById('root'));

