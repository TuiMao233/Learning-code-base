import './index.css'
import React, { Component } from 'react';
import {CommitStateSub} from '../../redux'
class Commit extends Component {
    constructor(props) {
        super(props);
        //! 数据进行绑定
        CommitStateSub(this)
        this.commit = this.commit.bind(this)
    }
    commit(event) {
        event.preventDefault()
        //? 获取内容
        let name = this.nameInput.value,
        commentText = this.commentInput.value
        //? 添加内容
        if (name && commentText) { 
            this.actions.addComment(name, commentText) 
        }
        
    }
    render() {
        return (
            <form className="col-md-5 commit" onSubmit={this.commit}>
                <b>用户名</b>
                <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    ref={input => this.nameInput = input}
                />
                <b>评论内容</b>
                <textarea
                    className="form-control"
                    rows="8"
                    placeholder="comment"
                    ref={input => this.commentInput = input}
                />
                <button className="btn btn-info commit-btn">提交</button>
            </form>
        );
    }
}




export default Commit;