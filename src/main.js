
import Vue from 'vue'
import Vuex from 'vuex'
import "./assets/css/normalize.css"
import FastClick from 'fastclick'
import Axios from 'axios'
import store from './store/store'
import App from './App.vue'
import router from './router/router'
import flexible from './assets/js/flexible'
import directive from './directive/directive'
Vue.use(Vuex);



Vue.prototype.$ajax = Axios;

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');


