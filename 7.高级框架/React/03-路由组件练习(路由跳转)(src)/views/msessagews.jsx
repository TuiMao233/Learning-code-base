import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import MsessagewsDatail from "./msessagews-datail";
export class msessagews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsArr: [
                { id: 0, title: 'msessagews001' },
                { id: 1, title: 'msessagews002' },
                { id: 2, title: 'msessagews003' }
            ]
        }
    }
    render() {
        return (
            <div>
                <ul>{this.state.newsArr.map((item, index) => (
                    <li key={index}>
                        <NavLink to={`/home/Msessagews/MsessagewsDatail/${item.id}`}>{item.title}</NavLink>
                    </li>
                ))}</ul>
                <hr></hr>
                <Route path='/home/Msessagews/MsessagewsDatail/:id' component={MsessagewsDatail}/>
            </div>
        );
    }
}

export default msessagews;
