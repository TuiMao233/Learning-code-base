import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Search from '../views/Search.vue';
import Personal from '../views/Personal.vue'
import MySongList from '../views/MySongList.vue'
Vue.use(VueRouter);

const routes = [
 {path: '/home', component: Home}, 
 {path: '/login', component: Login}, 
 {path: '/register', component: Register}, 
 {path: '/search', component: Search}, 
 {path: '/personal', component: Personal},
 {path: '/my_song_list', component: MySongList},
 {path: '/', redirect: '/home'}
];

export default new VueRouter({ routes });;
