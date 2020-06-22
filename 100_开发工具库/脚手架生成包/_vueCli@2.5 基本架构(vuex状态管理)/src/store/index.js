import Vue from 'vue';
import Vuex from 'vuex';
import models from './models';
Vue.use(Vuex)

export default new Vuex.Store({ ...models })