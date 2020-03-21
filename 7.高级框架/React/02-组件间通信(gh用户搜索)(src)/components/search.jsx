import React, { Component } from 'react';

export class search extends Component {
    constructor(props) {
        super(props);
        this.state = {userInfos:[],gitStatus:0}
        this.searchBtn = this.searchBtn.bind(this)
    }

    searchBtn(el) {
        let name = this.searchTextInput.value
        let {setUserName} = this.props
        setUserName(name)
        el.preventDefault()
    }
    render() {
        return (
            <form onSubmit={this.searchBtn}>
                <input 
                    ref={input => this.searchTextInput = input}
                    type="text" className='form-control searchTextInput' />
                <input 
                 type='submit' value="search" className='btn btn-primary'/>
            </form>
        );
    }
}

export default search;
