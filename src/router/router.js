
import Vue from 'vue';
import VueRouter from 'vue-router'
import more_goods from '../components/more_goods.vue'
import index from '../components/index.vue'
import area from '../components/area.vue'
import area_more from '../components/area_more.vue'
import column from '../components/column.vue'
import goods_detail from '../components/goods_detail.vue'
import MyOrder from '../components/MyOrder.vue'
import OrderDetail from '../components/OrderDetail.vue'
import addressList from '../components/addressList.vue'
import addAddress from '../components/addAddress.vue'
import expressInfo from '../components/expressInfo.vue'
import cartList from '../components/cartList.vue'
import person from '../components/person.vue'
import confirmOrder from '../components/confirmOrder.vue'
import cartConfirm from '../components/cartConfirm.vue'
import login from '../components/login.vue'
import idCard from '../components/idCard.vue'
import NotFoundComponent from '../components/notFoundComponent.vue'
import clear from '../components/clear.vue'
Vue.use(VueRouter);



const routes = [
  { path: '/', component: index},
  { path: '/index', component: index},
  {path: '/more_goods', component: more_goods},
  {path: '/area_goods/:name/:plan', component: more_goods},
  {path: '/area/:plan',component: area,meta: {keepAlive: false}},
  {path: '/area_more',component: area_more},
  {path: '/column/:plan',component: column},
  {path: '/goods_detail/:plan',component: goods_detail},

  {path: '/MyOrder', component: MyOrder},
  {path: '/MyOrder/detail/:orderId',component: OrderDetail},
  {path: '/addressList',component: addressList},
  {path: '/addAddress',component: addAddress},
  {path: '/expressInfo/:expressno',component: expressInfo},
  {path: '/cartlist',component: cartList},
  {path: '/person',component: person},
  {path: '/confirmOrder',component: confirmOrder},
  {path: '/cartConfirm',component: cartConfirm},
  {path: '/login',component: login},
  {path: '/idCard',component: idCard},
  {path: '/clear',component: clear},
  { path: '*', component: NotFoundComponent},
];


const router = new VueRouter({
  // mode:'history',
  base: "/webAPP/",
  routes:routes,
  linkActiveClass:'active',
  history:true
});
router.beforeEach((to, from, next) => {
  // ...console.log('router msg:');
  // console.log('router msg:');
  // console.log(to);

  let url=location.href;

  if(url.indexOf('?from=')=='-1' || to.path === '/clear'){

    next();

  }else {

    next({
      path: '/clear',
      query: {redirect: to.fullPath}
    })
  }

})

export  default router
