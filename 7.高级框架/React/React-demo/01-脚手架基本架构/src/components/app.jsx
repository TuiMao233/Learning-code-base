import React, { Component } from 'react';
import logo from '../logo.svg'
class App extends Component {
    render() {
        return (
            <div>
                <img className='logo' src={logo} alt=""/>
                <h1 className='title'>这是react组件</h1> 
            </div>
        );
    }
}

export default App;