import React, { Component } from 'react';
import { connect } from 'react-redux';

// 引入样式组件
import { NavBar, TextareaItem, InputItem, Button } from 'antd-mobile'
import {Redirect} from 'react-router-dom';
import {updata} from '../../redux/actions';
// 引入头像选择器组件
import HeaderSelector from '../../components/header-selector/headerSelector';



// 引入请求更新
class LaobanInit extends Component {
    state = {
        header: '', // 头像
        post: '', // 职位
        info: '', // 个人或职位简介
        company: '', // 公司名称
        salary: '' // 月薪
    }
    handleChange = (type, val) => {
        this.setState({ [type]: val })
    }
    save = () => this.props.updata(this.state)
    
    setHeader = (header) =>this.setState({ header })
    render() {
        // 如果信息已经完善, 跳转对应的主界面
        const { header, type } = this.props.user
        if (header) { // 如果头像有值, 代表以及完善数据了
            return <Redirect to={`/${type}`}/>
        }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem
                    placeholder='请输入招聘职位'
                    onChange={val => { this.handleChange('post', val) }}
                >招聘职位:</InputItem>
                <InputItem
                    placeholder='请输入公司名称'
                    onChange={val => { this.handleChange('company', val) }}
                >公司名称:</InputItem>
                <InputItem
                    placeholder='请输入职位薪水'
                    onChange={val => { this.handleChange('salary', val) }}
                >职位薪水:</InputItem>
                <TextareaItem
                    count={2000}
                    rows={6}
                    placeholder='请输入职位要求'
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
)(LaobanInit);
