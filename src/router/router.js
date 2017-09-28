
import Vue from 'vue';
import VueRouter from 'vue-router'
import App from '../App'
import Home from '../components/HelloFromVux'
import Home2 from '../components/Hello'
import MyOrder from '../components/MyOrder.vue'
import OrderDetail from '../components/OrderDetail.vue'
Vue.use(VueRouter)



const routes = [
  { path: '/', component: App},
  {path: '/h1', component: Home},
  {path: '/h2',component: Home2},
  {path: '/MyOrder', component: MyOrder,
    // children: [
    //   {path: 'detail',component: OrderDetail},
    // ]

  },
  {path: '/MyOrder/detail',component: OrderDetail,meta:{ title: '代付款' }}




]


const router = new VueRouter({
  mode:'history', //这样url就没有/#/XXX,而是常见的url形式
  routes:routes, // short for routes: routes
  linkActiveClass:'active',     //router-link的选中状态的class，也有一个默认的值
  history:true
});

export  default router
