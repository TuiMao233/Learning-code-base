import React, { Component } from 'react';

// import { connect } from "react-redux";
// 引入自定义react-redux
import { connect } from "../../libs/react-redux";
import { addCount,addMsg } from "../../redux/actions";
class Main extends Component {
    addCount = ()=>{
        this.props.addCount(1)
    }
    asyncAddCount = ()=>{
        setTimeout(() => {
            this.props.addCount(1)
        }, 1000);
    }
    addMsg = ()=>{
        this.props.addMsg('这是消息')
    }
    render() {
        const { count, msgs } = this.props
        return (<>
            <button onClick={this.addCount}>点击增加</button>
            <button onClick={this.asyncAddCount}>延迟增加</button>
            <div>count: {count}</div>

            <button onClick={this.addMsg}>点击增加信息</button>
            {msgs}
        </>);
    }
}


export default connect(
    state => ({count:state.count, msgs:state.msgs}),
    { addCount,addMsg } 
)(Main);