import React, { Component } from 'react';
import { connect } from "react-redux";
import UserList from '../../components/user-list/user-list'
import { getUserList } from "../../redux/actions";
class DaShen extends Component {
    componentDidMount() {
        this.props.getUserList('laoban')
    }
    
    render() {
        return (
            <div>
                <UserList userList={this.props.userList}/>
            </div>
        );
    }
}

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(DaShen);


