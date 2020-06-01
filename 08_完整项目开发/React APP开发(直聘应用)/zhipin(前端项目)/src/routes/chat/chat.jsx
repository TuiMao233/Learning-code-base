// 聊天框路由
import React, { Component } from 'react';

import { connect } from "react-redux";
import { sendMsg } from "../../redux/actions";
import { upReadMsg } from "../../redux/actions";
import { NavBar, List, InputItem, Icon, Grid } from "antd-mobile";
const Item = List.Item
class Chat extends Component {
    state = {
        content: '',
        isShow: false
    }
    handleSend = () => {
        const to = this.props.user._id
        const from = this.props.match.params.userid
        const content = this.state.content.trim()
        if (content) {
            // 如果content有值, 则发送消息请求
            this.props.sendMsg({ to, from, content })
        }
        // 每次发送后重置表单值
        this.setState({ content: '' })
    }
    toggleShow = () => { // 显示/隐藏宫格
        this.setState({isShow: !this.state.isShow})
        if(!this.state.isShow){
            setTimeout(() => {
                // 异步分发resize,  解决Grid显示与隐藏bug
                window.dispatchEvent(new Event('resize'))
            }, 0);
        }
    }
    emoji = [
        '😀', '🤣', '😒', '👨‍🦳', '🙉', '🙃', '😀', '🤣', '😒', '👨‍🦳', '🙉', '🙃',
        '😀', '🤣', '😒', '👨‍🦳', '🙉', '🙃', '😀', '🤣', '😒', '👨‍🦳', '🙉', '🙃',
        '😀', '🤣', '😒', '👨‍🦳', '🙉', '🙃', '😀', '🤣', '😒', '👨‍🦳', '🙉', '🙃',
        '😀', '🤣', '😒', '👨‍🦳', '🙉', '🙃', '😀', '🤣', '😒', '👨‍🦳', '🙉', '🙃',
    ].map(item => ({ text: item }))

    componentDidMount() {
        const documentEl = document.documentElement
        setTimeout(() => { // 当渲染时滑动到底部
            documentEl.scrollTop = documentEl.scrollHeight-documentEl.clientHeight   
        });
        const to = this.props.user._id
        const from = this.props.match.params.userid
        // 当访问聊天框时, 更新为已读
        this.props.upReadMsg(from, to)
    }
    componentWillUnmount() {
        const to = this.props.user._id
        const from = this.props.match.params.userid
        // 当退出聊天框时, 更新为已读
        this.props.upReadMsg(from,to)
    }
    
    componentDidUpdate () {
        const documentEl = document.documentElement
        setTimeout(() => { // 当页面更新时滑动到底部
            documentEl.scrollTop = documentEl.scrollHeight-documentEl.clientHeight   
        });
    }

    render() {
        // 获取聊天信息
        const { chat } = this.props
        const { chats, users } = chat

        // 计算聊天id
        const to = this.props.user._id
        const from = this.props.match.params.userid
        const chat_id = [from, to].sort().join('_')
        // 根据自身的id与from的id比较过滤chats数组, 拿到对应的聊天信息
        // console.log(users)
        const chatMsg = chats.filter(item => item.chat_id === chat_id)
        // 获取目标用户头像
        let fromHeader = null
        if (users[from] && users[from]['header']) {
            fromHeader = require(`../../assets/img/${users[from].header}.png`)
        }
        return (
            <div>
                <NavBar
                    icon={<Icon type="left" onClick={() => this.props.history.goBack()} />}
                >标题栏</NavBar>
                <List className='chat-list'>
                    {
                        chatMsg.map((msg, index) => {
                            if (from === msg.from) { // 我发给他的
                                return <Item
                                    key={index}
                                    className='chat-me'
                                    extra='我'
                                >{msg.content}</Item>
                            } else {// 他发给我的
                                return <Item
                                    key={index}
                                    thumb={fromHeader}
                                >{msg.content}</Item>
                            }
                        })
                    }
                </List>
                <div className='chat-input'>
                    <InputItem
                        onFocus={()=>this.setState({isShow:false})}
                        placeholder='发送消息'
                        value={this.state.content}
                        onChange={val => this.setState({ content: val })}
                        extra={
                            <span>
                                <span onClick={this.toggleShow}>😃</span>
                                <span onClick={this.handleSend}>发送&nbsp;&nbsp;</span>
                            </span>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid
                            data={this.emoji}
                            columnNum={8}
                            carouselMaxRow={3}
                            isCarousel={true}
                            onClick={item => {
                                this.setState({ content: this.state.content + item.text })
                            }}
                        />
                    ) : null}

                </div>

            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg,upReadMsg }
)(Chat);