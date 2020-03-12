import React, { Component } from 'react';
import './index.css'
import { ListStateSub } from '../../redux'
class List extends Component {
    constructor(props, context) {
        super(props, context);
        this.del = this.del.bind(this)
        ListStateSub(this)
        //! 初始化获取数据
        this.actions.initComment()
    }
    del(event) {
        let index = event.target.dataset.index
        this.actions.delComment(Number(index))
    }
    render() {
        //! 获取评论信息与删除函数
        let { comments } = this.state
        //? 如果没有数据，则返回提示信息
        let display = !comments[0] ? 'block' : 'none'
        return (
            <div className="col-md-7">
                <h3>评论回复</h3>
                <h2 style={{ display }}>暂无评论，点击左侧添加评论！！！</h2  >
                <div className="list">
                    {comments.map((item, index) => (
                        <div className="row" key={index}>
                            <h3>{item.name}说：</h3><br />
                            <p>{item.commentText}</p>
                            <button
                                data-index={index}
                                type="button"
                                className="btn btn-danger delComment"
                                onClick={this.del}
                            >删除</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default List;