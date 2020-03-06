//? react-state-redux-subscript
//? react的state与redux的储存的数据绑定
export default function (comThis,keyVal) {
    let obj = {}
    for (const key in keyVal) {
        obj[key] = keyVal[key].getState()
        keyVal[key].subscribe(()=>{
            comThis.setState({[key] : keyVal[key].getState()})
        })
    }
    comThis.state = obj
}
