import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css'
class Commit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'ddd',
            comment: ''
        }
        this.commit = this.commit.bind(this)
    }
    commit(event) {
        //? 获取内容
        let name = this.nameInput.value,
            comment = this.commentInput.value
            let { addComment } = this.props
        //? 获取添加方法
        if(name && comment){ addComment(name, comment)}
        event.preventDefault()
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


Commit.propTypes = {
    addComment: PropTypes.func.isRequired
};


export default Commit;