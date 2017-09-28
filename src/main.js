
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/router'
import Flexible from './assets/js/flexible'
import  normalize from './assets/css/normalize.css'
import Vuex from 'vuex'
import store from './store/store'
import directive from './directive/directive'
Vue.use(Vuex)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');


