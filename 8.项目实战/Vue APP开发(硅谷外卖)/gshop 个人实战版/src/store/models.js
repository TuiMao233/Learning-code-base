import * as mutationTypes from './models-types'
Object.keys(mutationTypes).forEach((key) => {
    window[key] = mutationTypes[key]
})
import {
    reqFootTypes, reqAddress, reqShops,
    reqSearchShops, reqUserInfo
} from '../api'
export default {
    state: {
        latitude: 40.10038,   // 纬度
        longitude: 116.36867, // 经度
        address: {},     // 地址信息对象
        categorys: [],   // 分类数组
        shops: [],       // 商家数组
        searchShops: [], // 搜索的商品列表
        user: {}          // 用户信息
    },
    mutations: {
        [RECEIVE_CATEGORYS]: (state, categorys) => { state.categorys = categorys },
        [RECEIVE_ADDRESS]: (state, address) => { state.address = address },
        [RECEIVE_SHOP]: (state, shops) => { state.shops = shops },
        [RECEIVE_SEARCH_SHOPS]: (state, searchShops) => { state.searchShops = searchShops },
        [RECEIVE_USER]: (state, user) => { state.user = user }
    },
    actions: {
        async getCategorys({ commit }) { // 获取食物分类列表
            const result = await reqFootTypes()
            if (result.code === 0) { commit(RECEIVE_CATEGORYS, result.data) }
        },
        async getAddress({ commit, state }) { // 获取位置信息
            const { longitude, latitude } = state
            const result = await reqAddress(`${latitude},${longitude}`)
            if (result.code === 0) { commit(RECEIVE_ADDRESS, result.data) }
        },
        async getShops({ commit, state }) { // 获取附近商品
            const { longitude, latitude } = state
            const result = await reqShops(longitude, latitude)
            if (result.code === 0) { commit(RECEIVE_SHOP, result.data) }
        },
        async getSearchShops({ commit, state }, keyword) { // 获取搜索商品
            const { longitude, latitude } = state
            const result = await reqSearchShops(`${latitude},${longitude}`, keyword)
            commit(RECEIVE_SEARCH_SHOPS, result.data)
        },
        async userInfo({ commit }) { // 根据回话登录
            const result = await reqUserInfo()
            if (result.code === 0) { commit(RECEIVE_USER, result.data) }
        }
    },
    getters: {
        categorysSplit(state) { // 将商品类型导航数组分为二维数组, 长度为8
            let arr_length = state.categorys.length;
            let newArr = [];
            for (let i = 0; i < arr_length; i += 8) {
                newArr.push(state.categorys.slice(i, i + 8));
            }
            return newArr;
        }
    }
}