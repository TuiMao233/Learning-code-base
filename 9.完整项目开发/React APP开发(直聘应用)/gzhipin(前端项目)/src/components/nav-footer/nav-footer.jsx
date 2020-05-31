import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const TabBarItem = TabBar.Item
class navFooter extends Component {
    static propTypes = {
        routeList: PropTypes.array.isRequired,
        userType: PropTypes.string.isRequired, // 获取用户类型
    }
    render() {
        let { routeList, userType } = this.props
        // 根据用户类型判断不显示哪个大神/老板 --> 如果是老板, 不显示老板标题框, 如果是大神, 不显示大神标题框
        userType === 'laoban' ? routeList[1].code = true : routeList[0].code = true
        routeList = routeList.filter(route => !route['code'])
        const path = this.props.location.pathname
        const {unReadCount} = this.props.chat
        return (
            <div>
                <TabBar>
                    {routeList.map(route => (
                        <TabBarItem
                            key={route.path}
                            icon={{ uri: require(`./images/${route.icon}.png`) }} // 默认样式 
                            selectedIcon={{ uri: require(`./images/${route.icon}-selected.png`) }} // 选中样式
                            selected={route.path === path} // 是否被选中
                            title={route.text} // 标题框是什么
                            onPress={() => this.props.history.replace(route.path)} // 标题框点击事件
                            // badge={route.path === '/message' ? unReadCount : null}  // 标记数量
                        />
                    ))}
                </TabBar>

            </div>
        );
    }
}


export default connect(
    state => ({chat:state.chat}),
    {}
)(withRouter(navFooter));