import '../assets/style/reset.css';
import '../assets/style/index.less';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";

// 引入cookies库
import Cookies from "js-cookies";

// 引入组件
import Login from './Login'
import Msite from './Msite';
class Main extends Component {

    render() {
        const { _id } = this.props.userInfo
        const cookieId = Cookies.getItem('userid')
        const path = (_id || cookieId) ? '/msite' : '/login'
        
        return (<>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/msite" component={Msite} />
                <Redirect to={path}/>
            </Switch>
        </>);
    }
}
export default connect(
    // 对组件传入数据
    state => ({ userInfo: state.userInfo }),
    // 对组件传入行为方法
    ({ userInfo: { getUserInfo } }) => ({ getUserInfo })
)(Main)