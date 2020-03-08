//! 7. 页面中定义引入类型，并使用储存库

import React, { Component } from 'react';
//? 引入限制传入类型方法库
import  PropTypes  from 'prop-types'



class Counter extends Component {
    static propTypes = { // 定义静态对象 ==> App.PropTypes = {...}
        count: PropTypes.number.isRequired,       //? 必要，并且是一个数值
        inCrement: PropTypes.func.isRequired, //? 必要，并且是函数
        inCrementAsync: PropTypes.func.isRequired
    }
    inAndDe(str) { // 相加通知
        //? 获取select的值
        let number = this.select.value*1
        //? 调用相加通知
        this.props.inCrement(number)

    }
    incrementIfOdd = () => { // 奇数相加通知
        //? 获取select的值
        let number = this.select.value * 1
        //? 获取储存库的值
        let count = this.props.count
        //? 判断是否是奇数
        if ((count % 2) === 1) {
            this.props.inCrement(number)
        }
    }
    incrementAsync = () => { // 异步相加通知
        //? 获取select的值
        let number = this.select.value * 1
        //? 调用储存库的相加通知
        this.props.inCrementAsync(number)
    }
    render() {

        return (
            <div>
                <h4>click {this.props.count} times</h4>
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

export default Counter
