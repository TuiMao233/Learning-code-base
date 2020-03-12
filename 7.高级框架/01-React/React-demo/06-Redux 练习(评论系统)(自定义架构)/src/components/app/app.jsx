import React, { Component } from 'react';
import './index.css'
import List from '../component-list/list'
import Commit from '../component-commit/commit'
class App extends Component {
    render() {
        return (
            <div className='warp'>
                <div className="container-fluid title-box">
                    <div className="title">
                        <h1>请发表React的评论</h1>
                    </div>
                </div>

                <div className="container-fluid contact">
                    <div className="row">
                        <Commit />
                        <List />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;