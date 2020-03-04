import React, { Component } from 'react';

export class userList extends Component {
    constructor(props) {
        super(props);
        this.state = {userInfos:[],gitStatus:0}
        this.upStatus = this.upStatus.bind(this)
    }
    componentWillReceiveProps (newProps){
        let {userName} = newProps
        let $this = this
        let url = `https://api.github.com/search/users?q=${userName}`
        //? 进入搜索状态
        $this.upStatus(1);$this.setState({userInfos:[]})
        //? 进入请求状态
        fetch(url).then(function (response) { return response.json(); })
            //! 获取成功
            .then(function (data) {
                let userInfos = data.items.map((item, index)=>{
                    return {
                        name:item.login,
                        imgUrl:item.avatar_url
                    }
                })
                //? 进入请求成功状态
                $this.upStatus(2);$this.setState({userInfos})
            })
            //? 进入请求失败状态
            .catch(function (myJson) {$this.upStatus(3)});
    }
    //! 更新搜索状态
    upStatus (gitStatus) {this.setState({gitStatus})}
    render() {
        let {userInfos,gitStatus} = this.state
        let gitStatusTest = ''
        //! 判断数据
        switch (gitStatus) {
            case 0: gitStatusTest = 'Please enter content search';break;//? 初始化
            case 1: gitStatusTest = 'Loding..........';break;//? 搜索中
            case 2: gitStatusTest = '';break;//? 搜索成功
            case 3: gitStatusTest = 'Search failed';break;//? 搜索失败
        }
        return (
            <div className='userLists'>
                <h1>{gitStatusTest}</h1>
                {userInfos.map((item, index) => (
                    <div className='item' key={index}>
                        <img src={item.imgUrl} alt="" />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default userList;
