<template>
  <div class="orderDetail" v-title :data-title="psIndex">
    <order-header :orderb.sync="orderb" :other.sync="other"></order-header>
    <div style="height: 0.2rem"></div>
    <x-address :orderb.sync="orderb.address"></x-address>
    <div style="height: 0.2rem"></div>
    <order-item v-for="(item,index) in orderb.order":key="index" :orderb.sync="item" ></order-item>

    <div class="total_price_box" >
      <div class="fee_box" >
        <span class="lf">运费:</span>
        <span class="rt">¥ {{other.fee}}</span>
      </div>
      <div class="total_price" >
        <span class="lf">合计:</span>
        <span class="rt">¥ {{other.true_price}}</span>
      </div>
    </div>
    <div style="height: 0.2rem;"></div>
    <div class="orderno_box">
      <div class="order_con" v-if="other.orderno">订单号:{{other.orderno}}</div>
      <div class="order_con" v-if="!other.orderno">订单号:{{other.orderid}}</div>
      <div class="order_con">下单时间:{{other.ctime}}</div>
      <div  class="order_con" v-if="other.pay_time">付款时间:{{other.pay_time}}</div>
    </div>
    <div style="height: 0.2rem;"></div>

    <div class="bottom_tab">
      <div class="other_btn" v-if="payStatus==3||payStatus==4" @click="findExpress()">查看物流</div>
      <div class="other_btn" v-if="payStatus==9"  @click="delOrder()">删除订单</div>
      <div class="other_btn" v-if="payStatus==2" @click="notice()">提醒卖家发货</div>
      <div class="other_btn" v-if="payStatus==1" @click="cancelOrder()">取消订单</div>
      <div class="other_btn" v-if="payStatus==9" @click="buyAgain()">再次购买</div>
      <div class="buy_btn" v-if="payStatus==3" @click="confirmReceive()">确认收货</div>
      <div class="buy_btn" v-if="payStatus==1" @click=" goodsPay()">付款</div>
    </div>
  </div>
</template>

<script>

  //支付状态 1待付款2代发货3已发货4已完成5申请退款6驳回7退款成功9关闭
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import xAddress from './xAddressD.vue'
  import orderItem from './orderItem.vue'
  import orderHeader from './orderHeader.vue'
  export default {
    name: 'orderDetail',
    data () {
      return {
        orderb:[],
        other:{},
        pay_text:['无','待付款','待发货','待收货','已完成','申请退款','驳回','退款成功','','交易关闭'],
      }
    },
    components: {
      xAddress,orderItem,orderHeader
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
      orderId(){
//        console.log(this.$route.params)
        let data=this.$route.params.orderId;

        return data.split('&&')[0]},
      orderNum(){
        let data=this.$route.params.orderId;

        return data.split('&&')[1]
      },
      payStatus(){
        if(this.orderb.other){
          return this.orderb.other.pay_status;
        }

      },
      psIndex(){
        let index=this.payStatus;
        return this.pay_text[index];

      },
    },
    methods: {
      initData(){
        const that=this;
        if(that.orderNum=='pending'){
          api.getorderdetail2(that.token,that.orderId,function (res) {
//          console.log('订单数据',res);
            that.orderb=res.data.object[0];
            that.other=res.data.object[0].other;
            console.log(that.orderb)
          });
        }else {
        api.getorderdetail(that.token,that.orderId,that.orderNum,function (res) {
//          console.log('订单数据',res);
          that.orderb=res.data.object[0];
          that.other=res.data.object[0].other;
          console.log(that.orderb)

        });
        }
      },
      notice:function () {
        const that=this;
        api.notice(that.token,that.orderNum,function (res) {
          if(res.data.code=100000){
            alert(res.data.description);

          }
        })
      },
      delOrder(){
        const that=this;
        api.delOrder(that.token,that.orderId,that.orderNum,function (res) {
          if(res.data.code=100000){
            alert(res.data.description);
            that.delFlag=false;
            that.$store.dispatch('setOrderType',3);
            that.$router.replace('../../MyOrder');
          }
        })
      },
      buyAgain(){
        const that=this;
        let pro_id=that.orderb.order[0].orderc[0].product_id;
        this.$router.push({path:'../../goods_detail',query:{'pro_id':pro_id}});

      },
      confirmReceive(){
        const that=this;
        api.confirmReceive(that.token,that.orderId,that.orderNum,function (res) {
          if(res.data.code=100000){
            alert(res.data.description);
            that.delFlag=false;
          }
        })
      },
      cancelOrder(){
        const that=this;
        api.cancelOrder(that.token,that.orderId,function (res) {
          if(res.data.code=100000){
            alert(res.data.description);
            that.delFlag=false;
            that.$store.dispatch('setOrderType',2);
            that.$router.replace('MyOrder');
          }
        })
      },
      findExpress(){
        let expressno=this.orderb.order[0].expressno;
        let comtype=this.orderb.order[0].comtype;

        this.$router.push('../../expressInfo/'+expressno+'&&'+comtype)
      },
      goodsPay(){
        const that=this;
        api2.wxPay(that.openid,that.orderId,that);
      }
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
    padding-bottom: 1.1rem;
    box-sizing: border-box;
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

  .orderno_box{
    padding:0 0.3rem;
    background-color: white;
    font-size: 0.28rem;
    color: #999999;
    line-height: 0.55rem;

  }
  .orderno_box .order_con{
    width: 100%;
    height: 0.55rem
  }
</style>
