import React, { Component } from 'react';
import { connect } from "react-redux";
class NotFound extends Component {
    render() {
        return (
            <div>
                NotFound
            </div>
        );
    }
}

export default connect(
    state => ({user:state.user})
)(NotFound);