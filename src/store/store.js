import Vue from 'vue';
import Vuex from 'vuex';
import test from './modules/test';
import comm from './modules/comm';
import order from './modules/order';
import xAddress from './modules/xAddress';
Vue.use(Vuex);


Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    test,
    comm,
    order,
    xAddress
  },

  strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
});


export default store
