import React, { Component } from 'react';
import { IN_CREMENT, DE_CREMENT } from '../redux/action-types'
import { store } from '../redux/reducers'
import stateSubs from '../redux/react-redux-sub'
class App extends Component {
    constructor(props) {
        super(props);
        //! 便捷式绑定数据
        stateSubs(this,{store})
    }
    //! 加减方法
    inAndDe(str) {
        //? 获取select的值
        let number = this.select.value * 1
        //? 判断+还是-
        if (str === '+') {
            store.dispatch({ type: IN_CREMENT, data: number })
        } else {
            store.dispatch({ type: DE_CREMENT, data: number })
        }

    }
    //! 奇数相加方法
    incrementIfOdd = () => {
        //? 获取select的值
        let number = this.select.value * 1
        //? 获取储存库store的值
        let count = store.getState()
        //? 判断是否是奇数
        if ((count % 2) === 1) {
            store.dispatch({ type: IN_CREMENT, data: number })
        }
    }
    //! 异步相加方法
    incrementAsync = () => {
        //? 获取select的值
        let number = this.select.value * 1
        //? 调用store的相加方法
        setTimeout(() => {
            store.dispatch({ type: IN_CREMENT, data: number })
        }, 1000);
    }
    render() {
        
        return (
            <div>
                <h4>click {this.state.store} times</h4>
                <select ref={select => this.select = select}>
                    <option value="1"> 1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.inAndDe.bind(this, '+')}>+</button>&nbsp;
                <button onClick={this.inAndDe.bind(this, '-')}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>
            </div>
        );
    }
}

export default App;