
import Vue from 'vue';
import VueRouter from 'vue-router'
import App from '../App'
import more_goods from '../components/more_goods.vue'
import index from '../components/index.vue'
import area from '../components/area.vue'
import area_more from '../components/area_more.vue'
import column from '../components/column.vue'

import MyOrder from '../components/MyOrder.vue'
import OrderDetail from '../components/OrderDetail.vue'
Vue.use(VueRouter)



const routes = [
  { path: '/', component: App},
  {path: '/more_goods', component: more_goods},
  {path: '/area_goods', component: more_goods},
  {path: '/area',component: area,meta: {keepAlive: false}},
  {path: '/area_more',component: area_more},
  {path: '/column',component: column},
  {path: '/MyOrder', component: MyOrder,
    // children: [
    //   {path: 'detail',component: OrderDetail},
    // ]

  },
  {path: '/MyOrder/detail/:orderId',component: OrderDetail},




]


const router = new VueRouter({
  mode:'history', //这样url就没有/#/XXX,而是常见的url形式
  routes:routes, // short for routes: routes
  linkActiveClass:'active',     //router-link的选中状态的class，也有一个默认的值
  history:true
});

export  default router
