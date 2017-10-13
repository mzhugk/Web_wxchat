<template>
  <div class="orderDetail" v-title :data-title="psIndex">
    <order-header :orderb.sync="orderb"></order-header>
    <div style="height: 0.2rem"></div>
    <x-address :orderb.sync="orderb"></x-address>
    <div style="height: 0.2rem"></div>
    <order-item :orderb.sync="orderb"></order-item>
    <div class="bottom_tab">
      <div class="other_btn" v-if="orderb.pay_status==3||orderb.pay_status==4">查看物流</div>
      <div class="other_btn" v-if="orderb.pay_status==4">删除订单</div>
      <div class="other_btn" v-if="orderb.pay_status==2">提醒卖家发货</div>
      <div class="other_btn" v-if="orderb.pay_status==1||orderb.pay_status==9">取消订单</div>
      <div class="other_btn" v-if="orderb.pay_status==9">再次购买</div>
      <div class="buy_btn" v-if="orderb.pay_status==3">确认收货</div>
      <div class="buy_btn" v-if="orderb.pay_status==1">付款</div>
    </div>
  </div>
</template>

<script>

  //支付状态 1待付款2代发货3已发货4已完成5申请退款6驳回7退款成功9关闭
  import api from '../api/api'
  import xAddress from './xAddress.vue'
  import orderItem from './orderItem.vue'
  import orderHeader from './orderHeader.vue'
  export default {
    name: 'orderDetail',
    data () {
      return {
        orderb:[],
        pay_status:['无','待付款','待发货','待收货','已完成','申请退款','驳回','退款成功','','交易关闭'],
      }
    },
    components: {
      xAddress,orderItem,orderHeader
    },
    created:function () {
      const that=this;
      api.getorderdetail(this.token,this.orderNum,function (res) {
        console.log('订单数据',res);
        that.orderb=res.data.object[0];
      });
    },
    computed:{
      token(){
        const that=this;

        if(that.$store.getters.token){return this.$store.getters.token}
        else if(sessionStorage.getItem('token')){return sessionStorage.getItem('token')}
        else {alert('token_error')};

      },
      orderNum(){return this.$route.params.orderId},
      psIndex(){
        let index=this.orderb.pay_status;
        return this.pay_status[index]},
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .orderDetail{
    height: 100%;
    width: 100%;
    background-color:rgba(242, 242, 242, 1);
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .bottom_tab{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.1rem;
    background-color: white;

    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .buy_btn{
    width: 1.96rem;
    height: 0.7rem;
    background-color: rgba(39, 218, 188, 1);
    border-radius: 0.1rem;
    margin-left: 0.19rem;
    color: white;
    font-size: 0.28rem;
    line-height: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .other_btn{
    border: solid 1px rgba(0, 0, 0, 1);
    width: 1.96rem;
    height: 0.7rem;
    border-radius: 0.1rem;
    margin-left: 0.19rem;
    box-sizing: border-box;
    font-size: 0.28rem;
    line-height: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
