import Vue from 'vue';
import Vuex from 'vuex';
import test from './modules/test';
import comm from './modules/comm';
import order from './modules/order';
Vue.use(Vuex);


Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    test,
    comm,
    order
  },

  strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
});


export default store
