export const count = {
    state: 0, // 定义数据初始值
    reducers: {
        // 定义同步修改状态行为函数
        increment(state, payload) {
            return state + payload
        },
    },
    effects: {
        // 定义异步行为函数
        async incrementAsync(payload, rootState) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            this.increment(payload)
        },
    }
}