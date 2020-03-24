/* 注册路由 */
import React, { Component } from 'react';

// 引入logo组件
import Logo from '../../components/logo/logo'

// 引入对应的样式组件
import {
    NavBar, // 导航栏
    WingBlank,  // 左右留白盒子
    List,   // 列表盒子
    InputItem, // input组件
    WhiteSpace, // 上下间隙
    Button // 按钮
} from "antd-mobile";
class Register extends Component {
    state = {
        username: '',   // 用户名
        password: '',   // 密码
    }
    login = () => {
        console.log(this.state);
    }
    handleChange = (type, val) => {
        // 根据表单改变state数据
        this.setState({ [type]: val })
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }
    render() {
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem
                            placeholder='请输入用户名'
                            type='text'
                            onChange={val => this.handleChange('username', val)}
                        >用户名：</InputItem>
                        <WhiteSpace />

                        <InputItem
                            placeholder='请输入密码'
                            type='password'
                            onChange={val => this.handleChange('password', val)}
                        >密码： </InputItem>

                        <WhiteSpace />
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default Register;