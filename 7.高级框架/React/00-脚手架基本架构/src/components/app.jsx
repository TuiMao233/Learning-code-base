import React, { Component } from 'react';

//! 1.获取AppState绑定方法
import {AppStateSus} from '../redux'

class App extends Component {
    constructor(props) {
        super(props);
        //! 2.绑定this.state数据
        AppStateSus(this)
    }
    //? 加减方法
    inAndDe(str) {
        //? 获取select的值
        let number = this.select.value * 1
        //? 判断+还是-
        if (str === '+') {
            this.inCrement(number)
        } else {
            this.deCrement(number)
        }

    }
    //? 奇数相加方法
    incrementIfOdd = () => {
        //? 获取select的值
        let number = this.select.value * 1
        //? 获取储存库count的值
        let count = count.getState()
        //? 判断是否是奇数
        if ((count % 2) === 1) {
            this.inCrement(number)
        }
    }
    //? 异步相加方法
    incrementAsync = () => {
        //? 获取select的值
        let number = this.select.value * 1
        //? 调用count的相加方法
        this.inCrement(number)
    }
    render() {
        
        return (
            <div>
                <h4>click {this.state.count} times</h4>
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