import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from "react-router-dom";

import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import QueueAnim from 'rc-queue-anim'
const CardHeader = Card.Header // 卡片的头部
const CardBody = Card.Body // 卡片的内容
class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired,
    }
    render() {
        /* 获取用户父组件传入的用户列表 */
        const { userList } = this.props
        return (
            <div>
                <WingBlank>
                    <QueueAnim
                     type='scale'
                    >
                        {userList.map((userMsg, index) => (
                            <div key={userMsg._id}>
                                <WhiteSpace />
                                <Card onClick={() => this.props.history.push(`/chat/${userMsg._id}`)}>
                                    <CardHeader
                                        title={userMsg.username}
                                        thumb={require(`../../assets/img/${userMsg.header}.png`)}
                                    />
                                    <CardBody>
                                        <div>
                                            {userMsg.post ? <span>职位:{userMsg.post}&nbsp;&nbsp;&nbsp;&nbsp; </span> : null}
                                            {userMsg.company ? <span>公司:{userMsg.company} </span> : null}
                                            <br /><br />
                                            {userMsg.salary ? <span>月薪:{userMsg.salary}&nbsp;&nbsp;&nbsp;&nbsp;</span> : null}
                                            {userMsg.info ? <span>描述:{userMsg.info} </span> : null}
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </QueueAnim>

                </WingBlank>
            </div>
        );
    }
}


export default withRouter(UserList);