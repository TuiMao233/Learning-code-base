/* 注册路由 */
import React, { Component } from 'react';

// 引入react-redux链接函数
import { connect } from "react-redux";
// 引入action 通知方法
import { register } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
// 引入对应的样式组件
import {
    NavBar, // 导航栏
    WingBlank,  // 左右留白盒子
    List,   // 列表盒子
    InputItem,
    WhiteSpace, // 上下间隙
    Radio, // 单选框
    Button, // 按钮
} from "antd-mobile";

// 引入logo组件
import Logo from '../../components/logo/logo'
import '../../assets/css/index.less'


const ListItem = List.Item
class Register extends Component {
    state = {
        username: '',   // 用户名
        password: '',   // 密码
        password2: '',  // 确认密码
        type: 'laoban',       // 用户类型
    }
    register = () => {
        this.props.register(this.state)
    }
    handleChange = (type, val) => {
        // 根据表单改变state数据
        this.setState({ [type]: val })
    }
    toLogin = () => {
        this.props.history.replace('/login')
    }
    render() {
        const { msg, redirectPath } = this.props.user
        if (redirectPath) { // 如果重定向路径有值, 则跳转
            return <Redirect to={redirectPath}/>
        }
        return (
            <div style={{marginBottom:50,marginTop:50}}>
                <NavBar>B&nbsp;5&nbsp;直&nbsp;聘</NavBar>
                <Logo />
                {/* 如果错误信息有值, 提示错误信息 */}
                {msg? <span className='error_text'>{msg}</span> : null }
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

                        <InputItem
                            placeholder='请输入确认密码'
                            type='password'
                            onChange={val => this.handleChange('password2', val)}
                        >确认密码： </InputItem>

                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio
                                checked={this.state.type === 'dashen'}
                                onChange={() => this.handleChange('type', 'dashen')}
                            >大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio
                                checked={this.state.type === 'laoban'}
                                onChange={() => this.handleChange('type', 'laoban')}
                            >老板</Radio>
                        </ListItem>

                        <WhiteSpace />
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user }), // 需要的数据
    { register } // 需要的方法
)(Register);