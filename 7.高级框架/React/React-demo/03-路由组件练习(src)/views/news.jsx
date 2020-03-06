import React, { Component } from 'react';

export class news extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsArr: [
                'new001',
                'new002',
                'new003'
            ]
        }
    }

    render() {
        return (
            <ul>{this.state.newsArr.map((item, index) => (
                <li key={index}>{item}</li>
            ))}</ul>
        );
    }
}

export default news;
