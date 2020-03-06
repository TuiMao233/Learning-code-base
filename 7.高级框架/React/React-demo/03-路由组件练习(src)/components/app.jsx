//? React与React.Component引入
import React, { Component } from 'react';
//? React路由引入
import { BrowserRouter, HashRouter,
        NavLink, Route, Switch, Redirect
} from 'react-router-dom';

//? 路由组件引入
import About from '../views/about'
import Home from '../views/home'

//! 自定义路由链接类名
function MyNavLink(props) {
    return (<NavLink {...props} activeClassName='active'/>);
}

class App extends Component {
    render() {
        return (
            /* 路由控制区域 */
            <BrowserRouter >
                <div className='container app'>
                    <div className='title'><h1>Search GitHub Users</h1></div>
                    <hr /><br />
                    <div className="content clearfix">
                        <div className='content-button-box'>
                            {/* 路由链接标签 */}
                            <MyNavLink to='/about'>About</MyNavLink><br />
                            <MyNavLink to='/home'>Home</MyNavLink>
                        </div>
                        <Switch>{/* 路由显示区域 */}
                            <Route path='/about' component={About}/>
                            <Route path='/home' component={Home}/>
                            {/* 路由默认路径 */}
                            <Redirect to='/about'/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;