import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css'
class List extends Component {
    constructor(props, context) {
        super(props, context);
        this.del = this.del.bind(this)
    }
    del(event) {
        let index = event.target.dataset.index
        let { delComment } = this.props
        delComment(Number(index))
        
    }
    render() {
        //! 获取评论信息与删除函数
        let { comments } = this.props
        //? 如果没有数据，则返回提示信息
        let display = !comments[0]? 'block' :'none'
        return (
            <div className="col-md-7">
                <h3>评论回复</h3>
                <h2 style={{display}}>暂无评论，点击左侧添加评论！！！</h2  >
                <div className="list">
                    {comments.map((item, index) => {
                        return (
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
                        )
                    })}
                </div>
            </div>
        );
    }
}
List.propTypes = {
    comments: PropTypes.array.isRequired,
    delComment: PropTypes.func.isRequired,
};
export default List;