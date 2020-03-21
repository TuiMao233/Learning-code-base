//? React插件引入
import React from 'react';
import ReactDOM from 'react-dom';

//? 组件引入
import App from './components/app';

//? 样式引入
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'

//? 渲染界面
ReactDOM.render(<App />, document.getElementById('root'));

