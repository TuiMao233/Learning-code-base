import React, { Component } from 'react';
const datails = [
    { id: 0, title: 'msessagews001', CONTENT:'世界毁灭' },
    { id: 1, title: 'msessagews002', CONTENT:'人间蒸发' },
    { id: 2, title: 'msessagews003', CONTENT:'宇宙大爆炸' }
]
export class msessagewsDatail extends Component {
    getDatails(id){
        return datails.find((item)=> item.id === Number(id))
    }
    render() {
        let datail = this.getDatails(this.props.match.params.id) ||  { id: 99, title: 'msessagews-none', CONTENT:'虚无' }
        return (
            <ul>
                <li>id:{datail.id}</li>
                <li>title:{datail.title}</li>
                <li>CONTENT:{datail.CONTENT}</li>
            </ul>
        );
    }
}

export default msessagewsDatail;
