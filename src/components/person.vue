<template>
  <div class="person" v-title data-title="个人中心">
    <div class="logo_box">
      <img :src="personData.icon" default-src="http://www.huijuquanqiu.vip/webAPP/img_loading.jpg">
      <div class="name_box rt">
        <div class="name_info">
          <div class="name">{{personData.nickname}}</div>
          <div class=""></div>
        </div>
      </div>
    </div>
    <div style="height: 0.2rem"></div>
    <div class="order_list">
      <div v-for="(item,index) in orderData":key="index" class="order_item lf" @click="goOrder(index)">

          <p>
          <img class="item_logo" :src="item[1]" alt="">
          <span>{{item[0]}}</span>
          </p>

      </div>
    </div>
    <div style="height: 0.18rem"></div>
    <div class="box_list">
      <div v-for="(item,index) in boxData":key="index" class="box_item lf" @click="itemClick(index)">
        <p >
          <img class="item_logo" :src="item[1]" alt="">
          <span style="display: block">{{item[0]}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import { Timeline, TimelineItem, XButton } from 'vux'
  export default {
    name: 'person',

    components: {

    },
    data () {
      return {
        personData:'',
        orderData:[['待收货','http://www.huijuquanqiu.vip/webAPP/img/mine_receive.png'],
          ['待发货','http://www.huijuquanqiu.vip/webAPP/img/mine_send.png'],
          ['待付款','http://www.huijuquanqiu.vip/webAPP/img/mine_pay.png'],
          ['全部订单','http://www.huijuquanqiu.vip/webAPP/img/mine_order.png']],
        boxData:[['购物车','http://www.huijuquanqiu.vip/webAPP/img/mine_shopping_cart.png'],
          ['礼券兑换','http://www.huijuquanqiu.vip/webAPP/img/mine_shopping_cart.png'],
          ['我的礼券','http://www.huijuquanqiu.vip/webAPP/img/mine_my_coupon.png'],
          ['售后服务','http://www.huijuquanqiu.vip/webAPP/img/mine_after_sale.png'],
          ['收货地址','http://www.huijuquanqiu.vip/webAPP/img/mine_address.png'],
          ['常见问题','http://www.huijuquanqiu.vip/webAPP/img/mine_question.png'],
          ['联系客服','http://www.huijuquanqiu.vip/webAPP/img/mine_service.png'],
          '',''],
      }
    },
    watch:{

    },

    computed:{
      token(){
        const that=this;
        if(api2.getCookie('user_token')){return api2.getCookie('user_token')}
        else {
          let url=window.location.href;
          url=url.split('/#/')[1];
          sessionStorage.setItem('return_url',url);
          that.$router.push('login');
        };
      },
    },

    created:function () {
      this.init();
    },
    methods:{
      init(){
        const that=this;
        api.personData(that.token,function (res) {
          console.log('个人数据',res);
          that.personData=res.data.object[0];
        })
      },
      goOrder(index){
       const that=this;
        that.$store.dispatch('setOrderType',index);
        that.$router.push('myorder');
      },
      itemClick(index){
        const that=this;
        switch (index){
          case 0:
            that.$router.push('cartlist');
            break;
          case 1:
            window.location.href="http://www.huijuquanqiu.vip/active/mobile/exchange.html";
            break;
          case 2:
            window.location.href="http://www.huijuquanqiu.vip/active/mobile/pick_up.html";
            break;
          case 3:
            window.location.href = 'tel://' + '057186221580';
            break;
          case 4:
            that.$router.push('addresslist?type=e');
            break;
          case 5:
            window.location.href='http://www.huijuquanqiu.vip/H5/usual_question.html';
            break;
          case 6:
            window.location.href = 'tel://' + '057186221580';
            break;
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .person{
    width: 100%;
    height: 100%;
    background-color: rgba(242, 242, 242, 1);
  }
.logo_box{
  width: 100%;
  height: 2.4rem;
  padding: 0.5rem 0.6rem;
  box-sizing: border-box;
  background: url("http://www.huijuquanqiu.vip/webAPP/img/headlogobg.png") ;
  background-size: 100% 100%;
}
  .logo_box img{
    height: 100%;
    border-radius: 50%;
  }
  .name_box{
    width: 4.9rem;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 0.4rem;
    box-sizing: border-box;
  }
  .name_info{

  }
  .name{

    font-size: 0.36rem;

    color: #ffffff;
  }
  .order_list{
    width: 100%;
    height: 1.68rem;
    font-size: 0.3rem;
    background-color: white;
  }
  .order_item{
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box_list{
    width: 100%;
    height: 5.4rem;
    font-size: 0.3rem;
    background-color: white;
    border-top: 1px solid rgba(230, 230, 230, 1);
    box-sizing: border-box;
  }
  .box_item{
    width: 2.5rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .box_list div:nth-child(3n+1){
    border-bottom: 1px solid rgba(230, 230, 230, 1);

  }
  .box_list div:nth-child(3n-1){
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    border-left: 1px solid rgba(230, 230, 230, 1);
    border-right: 1px solid rgba(230, 230, 230, 1);

  }
  .box_list div:nth-child(3n){
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .item_logo{
    height: 0.7rem;display: block;margin: auto;padding-bottom: 0.26rem;box-sizing: border-box;
  }
  img[src=""],img:not([src]){
    opacity:0;
  }

</style>
