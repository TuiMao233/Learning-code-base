//! 定义储存数据库

// 常量方法名引入

// 定义储存库
const reducer = (state = {}, actions) =>{
    switch (actions.type) {
        case '': 
            return ''
        default: 
            return state
    }
}
export default reducer