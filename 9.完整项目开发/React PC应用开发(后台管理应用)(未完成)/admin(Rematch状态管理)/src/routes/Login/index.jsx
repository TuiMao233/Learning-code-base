import './style.less'
import Background from '../../assets/images/bg.jpg';
import React, { Component } from 'react';
import { connect } from "react-redux";



// 引入antd组件
import { PageHeader, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// antd表单验证配置列表
const RuleConfig = [
    { min: 4, message: '长度小于4个字符!' },
    { max: 12, message: '长度超出12个字符!' },
    { pattern: /^[A-Za-z0-9_]*$/g, message: '格式要求字母数字或下划线!' }
]
class Login extends Component {
    onFinish = (fromData) => { // 进行登录
        const { getUserInfo } = this.props
        getUserInfo(fromData)
    }
    componentDidUpdate () {
        const { _id } = this.props.userInfo
        if(_id) { this.props.history.replace('/') }
    }
    render() {
        return (
            <div className="masking" style={{ backgroundImage: `url(${Background})` }}>

                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="后台管理系统"
                    subTitle="This is a subtitle"
                />

                <Form name="normal_login" className="login-form" onFinish={this.onFinish} >
                    <h1>进行登录</h1>


                    <Form.Item
                        name="username"
                        rules={[...RuleConfig, { required: true, message: '请输入账号!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                    </Form.Item>


                    <Form.Item
                        name="password"
                        rules={[...RuleConfig, { required: true, message: '请输入密码!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >登录</Button>
                    </Form.Item>


                </Form>
            </div>
        );
    }
}


export default connect(
    // 对组件传入数据
    state => ({ userInfo: state.userInfo }),
    // 对组件传入行为方法
    ({ userInfo: { getUserInfo } }) => ({ getUserInfo })
)(Login)