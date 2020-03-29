import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from "react-redux";

import store from "./redux/store";
import Main from "./routes/main/main";

import { Provider } from "./libs/react-redux";
// 页面渲染
ReactDOM.render(
    <div>
        <Provider store={store} >
            <Main />
        </Provider>
    </div>
    ,
    document.getElementById('root')
);
