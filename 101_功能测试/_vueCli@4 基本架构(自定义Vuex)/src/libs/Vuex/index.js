import Vue from 'Vue'
export default {
    install(Vue, options) { // 插件对象必须有一个install()

    },
    Store: class {
        constructor ({ state, mutations, actions, getters }) {
            // 类构造器, 初始化Vuex基本属性
            this.state = state
            this.actions = actions
            this.mutations = mutations
            this.getters = getters
        }
        commit (mt_name, param) {
            this.mutations[mt_name](this.state, param)
        }
        dispatch (ac_name, param) {
            // 派遣函数, 调用该函数寻找对应的actions执行, 改变状态
            this.actions[ac_name]({commit:this.commit.bind(this)}, param)
        }
    }
}