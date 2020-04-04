import Vue from 'vue'
import Router from 'vue-router'


import Msite from './pages/msite/msite'
import Order from './pages/order/order'
import Profile from './pages/profile/profile'
import Search from './pages/search/search'
import Login from './pages/Login/login'
import ShopMsite from './pages/ShopMsite/ShopMsite'
import ShopOrder from './pages/ShopOrder/ShopOrder'
import ShopAssess from './pages/ShopAssess/ShopAssess'
import ShopBusiness from './pages/ShopBusiness/ShopBusiness'
Vue.use(Router)
export default new Router({
    routes: [
        { path: '/msite', component: Msite },
        { path: '/order', component: Order },
        { path: '/profile', component: Profile },
        { path: '/search', component: Search },
        { path: '/login', component: Login },
        { path: '/shop_msite', component: ShopMsite, children:[
            { path: 'shop_order', component: ShopOrder},
            { path: 'shop_assess', component: ShopAssess},
            { path: 'shop_business', component: ShopBusiness},
            { path: '/', redirect: 'shop_order' }
        ]},
        { path: '/', redirect: '/msite' }
    ]
})
