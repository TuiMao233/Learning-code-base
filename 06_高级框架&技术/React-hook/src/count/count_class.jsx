import React, { Component } from 'react';

class CountClass extends Component {
    state = {
        count: 0
    }
    addCount = () => this.setState({ count: this.state.count + 1 })
    componentDidMount () { //  组件实例初始化
        console.log(`componentDidMount=>You clicked ${this.state.count} times`);
    }
    componentDidUpdate () { // 组件数据更新
        console.log(`componentDidMount=>You clicked ${this.state.count} times`);
    }
    render() {
        return (
            <div>
                <span>You clicked {this.state.count} times</span>
                <button onClick={this.addCount}>click me</button>
            </div>
        );
    }
}

export default CountClass;
