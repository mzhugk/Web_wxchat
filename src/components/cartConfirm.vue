<template>
  <div class="cartConfirm" v-title data-title="确认订单">
    <!--<order-header :orderb.sync="orderb" :other.sync="other"></order-header>-->
    <div style="height: 0.2rem"></div>
    <x-address :orderb.sync="addressInfo"></x-address>
    <div style="height: 0.2rem"></div>
    <confirm-item v-for="(item,index) in orderb.goods":key="index" :orderb.sync="item" ></confirm-item>
    <!--<confirm-item :orderb.sync="orderb.goods" ></confirm-item>-->

    <div class="total_price_box" >
      <div class="fee_box" >
        <span class="lf">运费:</span>
        <span class="rt">¥ {{orderb.fee}}</span>
      </div>
      <div class="total_price" >
        <span class="lf">合计:</span>
        <span class="rt">¥ {{orderb.sum}}</span>
      </div>
    </div>
    <div style="height: 0.2rem;"></div>
    <div class="bottomBar">
      <div class="leftbar lf">

        <div class="total_box">
          <span class="rt" >合计：¥{{orderb.sum}}</span>
        </div>
      </div>
      <div class="rightbar lf" @click="creatOrder">
        确认订单
      </div>
    </div>

    <confirm v-model="confirmAlert"
             title="提示"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             confirm-text="确认上传"
             cancel-text="考虑一下"
    >
      <p style="text-align:center;">根据海关规定,购买跨境商品需办理清关手续，请您配合上传身份信息，以确保您购买的商品顺利通过海关检查。</p>
    </confirm>
  </div>
</template>

<script>
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import xAddress from './xAddress.vue'
  import confirmItem from './confirmItem.vue'
  import {Confirm,ConfirmPlugin} from 'vux'
  import Vue from 'vue'
  Vue.use(ConfirmPlugin)

  export default {
    name: 'cartConfirm',
    data () {
      return {
        orderb:[],
        orderid:'',
        confirmAlert:false,
      }
    },
    components: {
      xAddress,confirmItem,Confirm
    },
    created:function () {
      this.initData();


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
      openid(){
        if(api2.getCookie('openid')){
          return api2.getCookie('openid');
        }
      },
      addressInfo(){
        const that=this;
        if(that.$store.getters.getSelAddressInfo){
          let seldata=this.$store.getters.getSelAddressInfo;
          return seldata}
      }
    },
    methods: {
      initData(){
        const that=this;
        that.$store.dispatch('setSelFlag',false);
        api.cartConfirm(that.token,function (res) {

          that.orderb=res.data.object[0];
          that.$store.dispatch('selAddressInfo',that.orderb.address);
          console.log(that.orderb)
        })
      },
      creatOrder(){
        const that=this;

        api.creatCartOrder(that.token,that.addressInfo.address_id,function (res) {
          if(res.data.code==100000){
          that.orderid=res.data.object[0].orderid;
          api.findStock(that.orderid,function (res) {
            if(res.data.code==100000){
              api2.wxPay(that.openid,that.orderid,that)
            }
          })}else if(res.data.code == 100001){
            that.confirmAlert=true;
          }
        })
      },
      onCancel(){
        this.$router.go(-1);
      },
      onConfirm(){
        this.$router.push('idCard');
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cartConfirm{
    height: 100%;
    width: 100%;
    background-color:rgba(242, 242, 242, 1);
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 1.1rem;
    box-sizing: border-box;
  }


  .total_price_box{
    padding:0 0.3rem;
    background-color: white;
    box-sizing: border-box;
    font-size: 0.28rem;
    line-height: 0.7rem;
  }
  .fee_box{
    width: 100%;height: 0.7rem
  }
  .total_price{
    width: 100%;
    height: 0.7rem;
    border-top: 1px solid rgba(213, 213, 213, 1);
  }

  .orderno_box .order_con{
    width: 100%;
    height: 0.55rem
  }
  .bottomBar{
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;

  }
  .leftbar{
    width: 5.1rem;
    height: 100%;
    background-color: white;

    /*box-sizing: border-box;*/
    display: flex;
    /*align-items: center;*/
  }

  .leftbar .total_box{
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 0.28rem;
    box-sizing: border-box;
    padding-left: 0.3rem;
  }

  .total_box span{
    font-size: 0.32rem;
    line-height: 0.36rem;

  }
  .rightbar{
    width: 2.4rem;
    height: 100%;
    background-color: rgba(39, 218, 188, 1);
    font-size: 0.34rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
</style>
