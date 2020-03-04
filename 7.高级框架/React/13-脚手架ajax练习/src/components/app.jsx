import React, { Component } from 'react';
import Search from './search'
import UserList from './userList'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {userInfos:[],gitStatus:0,userName:''}
        this.setUserName = this.setUserName.bind(this)
    }
    setUserName (userName) {this.setState({userName})}

    render() {
        return (
            <div className='container app'>
                <div className='title'>
                    <h1>Search GitHub Users</h1>
                    <Search setUserName={this.setUserName}/>
                </div>
                <UserList userName={this.state.userName}/>
            </div>
        );
    }

    
}

export default App;