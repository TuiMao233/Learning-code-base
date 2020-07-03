function forIn(object, callback) {    // for in封装
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            callback(key, object[key])
        }
    }
    return object
}
class Store {
    subscriber = [] // 订阅者
    watcher = {} // 监视者
    constructor({ state = {}, mutations = {}, actions = {}, getters = {} }) {
        const _this = this
        // 类构造器, 初始化Vuex基本属性
        this.state = forIn(state, key => {
            let value = state[key]
            Object.defineProperty(state, key, {
                set(set_val) {
                    value = set_val
                    _this.subscriber.forEach(method => method(key, set_val))
                },
                get() {
                    return value
                }
            })
        })
        this.actions = actions
        this.mutations = mutations
        this.getters = forIn(getters, (key, method) => {
            Object.defineProperty(getters, key, {
                get() {
                    return method(_this.state)
                }
            })
        })
    }
    // 提交函数
    commit = (mt_name, params) => {
        this.mutations[mt_name](this.state, params)
    }
    // 派遣函数, 调用该函数寻找对应的actions执行, 改变状态
    dispatch(ac_name, params) {
        this.actions[ac_name]({ commit: this.commit.bind(this) }, params)
    }

    // 映射state与page产生数据绑定
    mapState(states_str, p_this) {
        // 初始化执行改变状态
        p_this.data = {
            ...p_this.data,
            ...states_str.reduce((total, key) => {
                total[key] = this.state[key]
                return total
            }, {})
        }
        p_this.setData(p_this.data)
        this.subscriber.push((key, val) => p_this.setData({ [key]: val }))
    }
    // 映射返回相应的action
    mapActions(actions_str, p_this) {
        actions_str.forEach(key => {
            p_this[key] = params => {
                this.actions[key](this, params)
            }
        })
    }
    // 映射返回相应的计算属性
    mapGetters(getters_str, p_this) {
    }
}



const store = new Store({
    state: {
        count: 0,
        userInfo: null
    },
    mutations: {
        // 添加1
        ADD_COUNT(state) { state.count += 1 },
        // 添加用户
        ADD_USER_INFO(state, userInfo) { state.userInfo = userInfo }
    },
    actions: {
        // 异步增加次数
        async addCountAsync({ commit }) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            commit('ADD_COUNT')
        },
        // 获取用户信息
        async getUserInfo({ commit }, userInfo) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            commit('ADD_USER_INFO', userInfo)
        }
    },
    getters: {
        calcul(state) {
            return state.count + 10
        }
    }
});


// 模拟小程序环境
const page = {
    setData(data) {
        this.data = { ...this.data, ...data }
        console.log('---page_1:setData---')
        console.log(this.data)
    },
    data: {
        a: 6
    },
    onLoad() {
        store.mapState(['count', 'userInfo'], this)
        store.mapActions(['addCountAsync', 'getUserInfo'], this)
        this.getUserInfo({
            username: 'Mr_Mao',
            password: '123456'
        })
    }
}

page.onLoad()


