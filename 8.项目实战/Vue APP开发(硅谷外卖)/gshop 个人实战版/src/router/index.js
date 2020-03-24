import Vue from 'vue'
import Router from 'vue-router'

import Msite from './pages/msite/msite'
import Order from './pages/order/order'
import Profile from './pages/profile/profile'
import Search from './pages/search/search'
import Login from './pages/Login/login'
Vue.use(Router)

export default new Router({
    routes: [
        { path: '/msite', component: Msite },
        { path: '/order', component: Order },
        { path: '/profile', component: Profile },
        { path: '/search', component: Search },
        { path: '/login', component: Login },
        { path: '/', redirect: '/msite' }
    ]
})
