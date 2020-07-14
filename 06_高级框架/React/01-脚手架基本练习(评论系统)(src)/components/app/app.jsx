import React, { Component } from 'react';
import ComponentCommit from '../component-commit/commit'
import ComponentList from '../component-list/list'
import './index.css'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [
                {name:'nmd',commentText:'神经病'},
                {name:'nmd',commentText:'神经a病'},
            ]
        }
        this.addComment = this.addComment.bind(this)
        this.delComment =  this.delComment.bind(this)
    }
    //? 添加方法
    addComment (name, commentText) {
        let {comments} = this.state
        comments.unshift({name,commentText:commentText})
        this.setState({comments})
    }
    //? 删除方法
    delComment (index) {
        let {comments} = this.state
        comments.splice(index,1)
        this.setState({comments})
    }
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
                     <ComponentCommit addComment={this.addComment}/>
                     <ComponentList {...this.state} delComment={this.delComment}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;