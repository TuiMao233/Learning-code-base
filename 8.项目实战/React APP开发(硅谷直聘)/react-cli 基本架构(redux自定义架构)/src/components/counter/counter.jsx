// 主页面
import React, { Component } from 'react';
//? 引入限制传入类型方法库
import  PropTypes  from 'prop-types'

class Counter extends Component {
    static propTypes = { // 定义接收数据类型
        store: PropTypes.object.isRequired  //? 必要，并且是一个对象
    }
	render() {
        return <div></div>
    }
}
export default Counter