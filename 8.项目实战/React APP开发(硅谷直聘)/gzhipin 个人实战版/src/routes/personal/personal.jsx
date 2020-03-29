// 信息界面
import React, { Component } from 'react';
import { connect } from "react-redux";
import Cookies from 'js-cookies';
import { Result, List, WhiteSpace, Button, Modal } from "antd-mobile";

import { resetUser } from "../../redux/actions";


const Item = List.Item
const Brief = Item.Brief
class Personal extends Component {
    out = () => {
        Modal.alert('退出', '确定退出吗?', [
            { text: '取消' },
            {text: '确认', onPress: () => {
                // 清除cookie的userid
                Cookies.removeItem('userid')
                // 重置redux数据
                this.props.resetUser('')
            }}
        ])
    }
    render() {
        /* header: String, // 头像
        post: String, // 职位
        info: String, // 个人或职位简介
        company: String, // 公司名称
        salary: String // 月薪 */
        const user = this.props.user
        return (
            <div>
                <Result
                    img={<img
                        src={require('../../assets/img/头像1.png')}
                        style={{ width: 50 }}
                        alt=''
                    />}
                    title={user.username}
                    message={user.company}
                />
                <List renderHeader={'相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {user.post}</Brief>
                        <Brief>简介: {user.info}</Brief>
                        {user.salary ? <Brief>薪资: {user.salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <Button type='warning' onClick={this.out}>退出登录</Button>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { resetUser }
)(Personal);