import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { connect } from "react-redux"; // 链接redux
import { Redirect } from 'react-router-dom'; //  重定向

import Cookies from "js-cookies"; // 操作cookies的对象, set(),get(),remove()

import { NavBar } from "antd-mobile";

// 根据头像与类型判断重定向路径
import { gerRedirectTo } from '../../utils';
// 获取异步获取更新redux数据的函数
import { getUser } from "../../redux/actions";

// 大神/老板信息完善界面
import DashenInit from '../dashen-init/dashenInit';
import LaobanInit from '../laoban-init/laobanInit';
// 大神/老板主界面
import Dashen from '../dashen/dashen';
import Laoban from '../laoban/laoban';
// 聊天信息界面
import Message from '../message/message';
// 个人界面
import Personal from '../personal/personal';
// 路径错误界面
import NotFound from '../../components/not-found/not-found'
// 底部导航组件
import NavFooter from '../../components/nav-footer/nav-footer';
// 聊天界面界面
import Chat from '../chat/chat';
class Main extends Component {
    componentDidMount() {
        const userid = Cookies.getItem('userid')
        const { _id } = this.props.user
        if (userid && !_id) { // 如果cookie中有id数据, 但redux中没有, 代表需要发送ajax获取数据存入redux中
            this.props.getUser()
        }
    }
    // n个路由的配置
    routeList = [
        {
            path: '/laoban', // 路由路径
            component: Laoban, // 对应组件
            title: '大神列表', // 对应头部字符串
            icon: 'laoban', // 底部导航对应图标
            text: '大神',   // 对应导航对应字符串
        }, {
            path: '/dashen',
            component: Dashen,
            title: '老板列表',
            icon: 'dashen',
            text: '老板'
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]
    render() {
        const userid = Cookies.getItem('userid')
        // 判断是否已经登录, 如果没有登录, 跳转到登录界面
        if (!userid) {
            return <Redirect to={'/login'} />
        }
        // 判断是否完成信息
        const { _id, header, type } = this.props.user
        if (!_id) { // 如果redux没有_id 暂时不做任何显示
            return null
        } else { // 如果有, 代表已经登录了, 显示对于的界面
            const path = this.props.location.pathname
            if (path === '/') { // 如果是main界面, 不是则根据当前路径跳转到对应的路由↓↓↓↓
                // 根据type和header判断重定向路径
                return <Redirect to={gerRedirectTo({ type, header })} />
            }
        }
        const { routeList } = this
        const path = this.props.location.pathname
        /* 判断是否是路由配置列表的路径 */
        const currentRoute = routeList.find(route => route.path === path)
        return (
            <div style={{ marginBottom: 50, marginTop: 50 }}>
                {/* 如果是配置列表列表的路径, 显示头部 */}
                {currentRoute ? <NavBar>{currentRoute.title}</NavBar> : null}
                <Switch>
                    {routeList.map(
                        (route, index) => <Route
                            path={route.path}
                            component={route.component}
                            key={index}
                        />
                    )}
                    <Route path='/dasheninfo' component={DashenInit} />
                    <Route path='/laobaninfo' component={LaobanInit} />
                    <Route path='/chat/:userid' component={Chat} />
                    <Route component={NotFound} />
                </Switch>
                {/* 如果是配置列表的路径, 显示底部 */}
                {currentRoute ? <NavFooter routeList={routeList} userType={type} /> : null}
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { getUser }
)(Main);
/*
1. 实现自动登陆:
  1. componentDidMount()
    登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
  2. render()
    1). 如果cookie中没有userid, 直接重定向到login
    2). 判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
    3). 如果有, 说明当前已经登陆, 显示对应的界面
    4). 如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
*/