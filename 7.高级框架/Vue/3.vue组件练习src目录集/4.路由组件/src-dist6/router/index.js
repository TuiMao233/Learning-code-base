/* 路由器模块 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Message from '../views/Message.vue'
import MessageDetall from '../views/MessageDetall.vue'
Vue.use(VueRouter)
export default new VueRouter({
  // path是引用路径 在于组件如何引入路由组件时使用
  linkActiveClass: 'active',
  routes: [
    { path: '/about', component: About },
    {path: '/home',
     component: Home,
     children: [{path: 'news', component: News},
                {path: 'message', component: Message, children: [{path: 'messageDetall/:id', component: MessageDetall}]},
                {path: '/', redirect: 'news'}] },
    { path: '/', redirect: '/about' }
  ]
})
