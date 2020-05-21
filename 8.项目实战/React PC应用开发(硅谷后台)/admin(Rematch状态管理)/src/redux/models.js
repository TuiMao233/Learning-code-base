import { reqUserInfo } from "../api";
import { message } from 'antd'
export const userInfo = {
    state:{},
    reducers: {
        // 接收用户信息
        receiveUserInfo: (state, userInfo)=> userInfo
    },
    effects: {
        // 获取用户信息
        async getUserInfo ({username, password}) {
            const result = await reqUserInfo(username, password)
            if (result.status === 0) {
                // 登录成功, 保存数据
                this.receiveUserInfo(result.data)
            }else {message.error(result.msg)}
        }
    }
}