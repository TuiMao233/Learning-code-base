// 信息界面
import React, { Component } from 'react';
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";
import QueueAnim from 'rc-queue-anim'
const Item = List.Item
const Brief = Item.Brief
class Message extends Component {
    // 获取每个对应聊天用户的最后一条消息的数组
    getLastMsgs = (chats, userid) => {
        // 对获取的当前用户聊天信息进行时间升序
        const chatsTimeAscending = chats.sort(
            (chat_a, chat_b) => chat_a.create_time - chat_b.create_time
        )
        // 过滤聊天信息为chat_id:{...}  这样就可以过滤掉重复的chat 因为会覆盖掉
        const chatsfilterObjs = chatsTimeAscending.reduce(
            (total, item) => {
                // 进行统计对方发给我的未读数量
                const myRead = item.from == userid && !item.read
                if (total[item.chat_id]) { // 如果已经赋值
                    if (total[item.chat_id].readCount) {
                        // 如果有统计
                        total[item.chat_id].readCount += myRead ? 1 : 0
                    } else {
                        // 如果没统计
                        total[item.chat_id].readCount = myRead ? 1 : 0
                    }
                    // 进行合并
                    total[item.chat_id] = { ...item, readCount: total[item.chat_id].readCount }
                } else { // 如果没有赋值
                    total[item.chat_id] = item
                }
                return total
            }, {}
        )
        // 转为数组并在进行排序
        const lastChatArr = Object.values(chatsfilterObjs).sort(
            (chat_a, chat_b) => chat_b.create_time - chat_a.create_time
        )
        return lastChatArr
    }
    render() {
        const { chats, users } = this.props.chat
        const userid = this.props.user._id
        // 获取最后一条的消息数组, 并统计对方发给我的未读数量
        const lastMsgs = this.getLastMsgs(chats, userid)
        return (
            <div>
                <List>
                    <QueueAnim
                    type='bottom'
                    >
                        {lastMsgs.map((item, index) => {
                            // 计算对方ID
                            const otherid = userid !== item.from ? item.from : item.to
                            return (
                                <Item
                                    key={index}
                                    // extra={<Badge text={item.readCount} />}
                                    onClick={() => this.props.history.push(`/chat/${otherid}`)}
                                    thumb={
                                        users[otherid].header ?
                                            require(`../../assets/img/${users[otherid].header}.png`) :
                                            null
                                    }
                                >
                                    <span>{users[otherid].username}</span>
                                    <Brief>{item.content}</Brief>
                                </Item>
                            )
                        })}
                    </QueueAnim>

                </List>
            </div >
        );
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat })
)(Message);