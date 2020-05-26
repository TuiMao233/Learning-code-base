import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavBar, TextareaItem, InputItem, Button } from 'antd-mobile'

import {Redirect} from 'react-router-dom';
import {updata} from '../../redux/actions';

import HeaderSelector from '../../components/header-selector/headerSelector';
class DashenInit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '', // 头像
            post: '', // 职位
            info: '', // 个人或职位简介
        }
    }
    handleChange = (type, val) => {
        this.setState({ [type]: val })
    }
    save = () => this.props.updata(this.state)
    setHeader = (header) => this.setState({ header })

    render() {
        // 如果信息已经完善, 跳转对应的主界面
        const { header, type } = this.props.user
        if (header) { // 如果头像有值, 代表以及完善数据了
            return <Redirect to={`/${type}`}/>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem
                    placeholder='请输入求职职位'
                    onChange={val => { this.handleChange('post', val) }}
                >求职职位:</InputItem>
                <TextareaItem
                    count={2000}
                    rows={6}
                    placeholder='请输入个人介绍'
                    onChange={val => { this.handleChange('info', val) }}
                />
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        );
    }
}
export default connect(
    state => ({user:state.user}),
    {updata}
)(DashenInit);
