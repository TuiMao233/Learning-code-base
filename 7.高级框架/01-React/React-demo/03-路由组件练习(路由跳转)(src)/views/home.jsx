import React, { Component } from 'react';
import { NavLink, Route, Switch, Redirect,
} from 'react-router-dom';


import News from './news'
import Msessagews from './msessagews'

export class home extends Component {
    render() {
        return (
            <div className='router home'>
                <h1>Home 组件内容</h1>

                <div className="button-box">
                    <NavLink to='/home/News'>News</NavLink>
                    <NavLink to='/home/Msessagews'>Msessagews</NavLink>
                </div>

                <hr />

                <Switch>
                    <Route path='/home/News' component={News}/>
                    <Route path='/home/Msessagews' component={Msessagews}/>
                    <Redirect to='/home/News'/>
                </Switch>
                
            </div>
        );
    }
}

export default home;
