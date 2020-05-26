import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Search from '../views/Search.vue';
Vue.use(VueRouter);

const routes = [
 {path: '/home', component: Home}, 
 {path: '/login', component: Login}, 
 {path: '/register', component: Register}, 
 {path: '/search', component: Search}, 
];

const router = new VueRouter({
  routes
});

export default router;
