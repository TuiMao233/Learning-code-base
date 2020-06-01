import React, { Component } from 'react';
import './style.less';
import { Switch, Route, Link, Redirect } from "react-router-dom";

import {
    HomeOutlined, AppstoreOutlined, UserOutlined,
    ShareAltOutlined, AreaChartOutlined, CalendarOutlined,
    EditOutlined, RadarChartOutlined
} from '@ant-design/icons'
import { Menu } from 'antd';

import Home from '../Home';
import MerchManage from '../MerchManage';
import MethodManage from '../MethodManage';
import UserOption from '../UserOption';
import RoleOption from '../RoleOption';
import ImagingTable from '../ImagingTable';


const MenuItem = Menu.Item
const MenuSubMenu = Menu.SubMenu

class Msite extends Component {
    routeOptions = [
        { title: '首页', icon: <HomeOutlined />, path: '/msite/home', component: Home },
        {
            title: '商品', icon: <AppstoreOutlined />, path: '/msite/product', child: [
                { title: '品类管理', icon: <CalendarOutlined />, path: '/msite/product_index', component: MerchManage},
                { title: '商品管理', icon: <EditOutlined />, path: '/msite/product_save_update',  component: MethodManage}
            ]
        },
        { title: '用户管理', icon: <UserOutlined />, path: '/msite/user_option', component: UserOption },
        { title: '角色管理', icon: <ShareAltOutlined />, path: '/msite/role_option', component: RoleOption },
        {
            title: '图形图表', icon: <AreaChartOutlined />, path: '/msite/imaging_table', component: ImagingTable, child: [
                { title: '主界面', icon: <CalendarOutlined />, path: '/msite/imaging_table/index' },
                { title: '添加/更新', icon: <EditOutlined />, path: '/msite/imaging_table/save_update' },
                { title: '详情', icon: <RadarChartOutlined />, path: '/msite/imaging_table/detail' }
            ]
        },
    ]
    openKey = null
    // 菜单栏遍历操作
    menus = this.routeOptions.map((route, index) => {
        if (route.child) {
            const { pathname } = this.props.location
            if (!this.openKey) {
                this.openKey = route.child.find((childRoute) => childRoute.path === pathname) ? index : null
            }
            return (
                <MenuSubMenu
                    key={index}
                    title={
                        <span> {route.icon} <span>{route.title}</span> </span>
                    }
                >
                    {route.child.map((childRoute, child_index) => (
                        <MenuItem key={childRoute.path}>
                            <Link to={childRoute.path} replace>
                                {childRoute.icon}
                                <span>{childRoute.title}</span>
                            </Link>
                        </MenuItem>

                    ))}
                </MenuSubMenu>
            )
        } else {
            return (
                <MenuItem key={route.path}>
                    <Link to={route.path} replace>
                        {route.icon}
                        <span>{route.title}</span>
                    </Link>
                </MenuItem>
            )
        }
    })

    // 获取当前路径路由的配置
    getPathRoute= () =>{
        const { pathname } = this.props.location
        let findRoute
        const isFindOk = this.routeOptions.find((route) => {
            if(route.child){
                findRoute = route.child.find((childRoute)=>(pathname.match(childRoute.path)))
            }else{
                findRoute = pathname.match(route.path) ? route : null
            }
            if(findRoute){return 'ok'}else {return null}
        })
        return isFindOk ? findRoute : ''
    }
    render() {
        const { pathname } = this.props.location
        const findPathRoute = this.getPathRoute()
        const title = findPathRoute ? findPathRoute.title : ''
        return (
            <div className="msite">

                <div className="msite_menu">
                    <header>后台管理</header>
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[pathname]}
                        defaultOpenKeys={[this.openKey + '']}
                    >
                        {this.menus}
                    </Menu>
                </div>
                <div className="right_page">
                    <section className="header">
                        <div>欢迎 admin <a href="http://www.baidu.com">退出</a></div>
                    </section>
                    <section className="page_msg">
                        <div className="method">{title}</div>
                        <div className="time_weather">
                            2019-5-14 7:2:56
                           <span className="icon">图标</span>
                           晴天
                       </div>
                    </section>
                    <div className="route_switch">
                        <Switch>
                            {this.routeOptions.map((route) => {
                                if (route.child) {
                                    return route.child.map((childRoute) => (
                                        <Route
                                            path={childRoute.path}
                                            component={childRoute.component}
                                            key={childRoute.path}
                                        />
                                    ))
                                } else {
                                    return <Route
                                        path={route.path}
                                        component={route.component}
                                        key={route.path}
                                    />
                                }

                            })}
                            <Redirect to={'/msite/home'} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Msite;