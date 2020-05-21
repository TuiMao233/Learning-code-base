import * as mutationTypes from './models-types'
Object.keys(mutationTypes).forEach((key) => {
    window[key] = mutationTypes[key]
})
console.log(window)
import {
    reqFootTypes, reqAddress, reqShops,
    reqSearchShops, reqUserInfo, reqLoginOut,
    reqShopMsg, reqShopGoods, reqShopAssess
} from '../api'

import Vue from 'vue'
export default {
    state: {
        latitude: 40.10038, longitude: 116.36867, // 纬经度
        address: {},      // 地址信息对象
        categorys: [],    // 分类数组
        shops: [],        // 商家数组
        searchShops: [],  // 搜索的商品列表
        user: {},         // 用户信息
        shopMsg: {},      // 店铺信息
        shopGoods: [],    // 店铺食物列表
        shopAssess: [],   // 店铺评论列表
        shopCarts: []     // 购物车商品列表
    },
    mutations: {
        [RECEIVE_CATEGORYS]: (state, categorys) => { state.categorys = categorys },
        [RECEIVE_ADDRESS]: (state, address) => { state.address = address },
        [RECEIVE_SHOP]: (state, shops) => { state.shops = shops },
        [RECEIVE_SEARCH_SHOPS]: (state, searchShops) => { state.searchShops = searchShops },
        [RECEIVE_USER]: (state, user) => { state.user = user },
        [RECEIVE_SHOP_MSG]: (state, shopMsg) => { state.shopMsg = shopMsg },
        [RECEIVE_SHOP_GOODS]: (state, shopGoods) => { state.shopGoods = shopGoods },
        [RECEIVE_SHOP_ASSESS]: (state, shopAssess) => { state.shopAssess = shopAssess },
        [DEL_CARTS]: (state) => { // 清空购物项
            // 将商品选项清空为0
            state.shopCarts.forEach(good => good.count = 0);
            // 重置购物车
            state.shopCarts = []
        },
        [IN_OR_DE_GOOD]: (state, { fool, good }) => { // 添加/减少购物项
            if (fool) { // 如果是添加购物车
                if (!good.count) {
                    // 向食物项添加一个count, 值为1
                    Vue.set(good, 'count', 1)
                    // 想购物车商品项添加一个食物
                    state.shopCarts.push(good)
                } else {
                    good.count++
                }
            } else if (good.count !== 0) { // 如果是减少购物车项 并且食物项选择数不为0
                good.count--
                if (good.count === 0) {
                    // 如果减少后为0时, 删除对应的购物车项
                    state.shopCarts.splice(state.shopCarts.indexOf(good), 1)
                }
            }
        }
    },
    actions: {
        // 清空购物车
        delCarts({ commit }) { commit(DEL_CARTS) },
        // 商品添加/减少的购物车操作
        inOrDeGood({ commit }, options) { commit(IN_OR_DE_GOOD, options) },
        // 接收用户信息登录
        login({ commit }, data) { commit(RECEIVE_USER, data) },
        async getShopMsg({ commit }) { // 获取商铺信息
            const result = await reqShopMsg()
            if (result.code === 0) { commit(RECEIVE_SHOP_MSG, result.data) }
        },
        async getShopGoods({ commit }, cb) { // 获取商铺食物列表
            const result = await reqShopGoods()
            if (result.code === 0) { commit(RECEIVE_SHOP_GOODS, result.data) }
            cb && cb()
        },
        async getShopAssess({ commit }, cb) { // 获取商铺评论列表
            const result = await reqShopAssess()
            if (result.code === 0) { commit(RECEIVE_SHOP_ASSESS, result.data) }
            cb && cb()
        },
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
            console.log(result)
            commit(RECEIVE_SEARCH_SHOPS, result.data)
        },
        async userInfo({ commit }) { // 根据回话登录
            const result = await reqUserInfo()
            if (result.code === 0) { commit(RECEIVE_USER, result.data) }
        },
        async outLogin({ commit }) { // 登出用户
            const result = await reqLoginOut()
            if (result.code === 0) { commit(RECEIVE_USER, {}) }
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
        },
        cartTotal(state) { // 统计购物车信息
            return state.shopCarts.reduce((total, item) => {
                total['price'] = total['price'] + item.count * item.price // 购物车商品总价格
                total['commodCount'] = total['commodCount'] + item.count  // 购物车商品数量
                return total
            }, { price: 0, commodCount: 0 })
        }
    }
}