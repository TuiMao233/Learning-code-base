import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";
class Main extends Component {
    render() {
        return (
            <>
                <button onClick={() => this.props.incrementAsync(1)}>点击异步操作</button>
                {this.props.count}
                <Switch>
                    <Route />
                </Switch>
            </>
        );
    }
}
export default connect(
    // 对组件传入数据
    state => ({ count: state.count }),
    // 对组件传入行为方法
    ({ count }) => ({
        incrementAsync: count.incrementAsync
    })
)(Main)