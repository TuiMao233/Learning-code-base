import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile'

import PropTypes from 'prop-types';

class HeaderSelector extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.headerArr = []
        for (let i = 0; i < 20; i++) {
            this.headerArr.push({
                icon: require(`../../assets/img/头像${i + 1}.png`),
                text: `头像${i + 1}`
            })
        }
    }
    state = {
        icon: null
    }
    handleChange = ({text, icon}) => {
        // 更改自身组件状态
        this.setState({icon})
        // 将状态传入父组件
        this.props.setHeader(text)
    }
    render() {
        const {icon} = this.state
        const listHeader = !icon ? '请选择头像' : (<div>已选择头像:<img src={icon} alt=""/></div>)
        return (
            <List renderHeader={() => listHeader}>
                <Grid
                    data={this.headerArr}
                    columnNum={5}
                    onClick={this.handleChange}
                />
            </List>
        );
    }
}

export default HeaderSelector;