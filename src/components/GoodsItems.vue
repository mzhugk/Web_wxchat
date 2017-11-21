<template>
  <div class="goodsitems" v-if="delFlag">
    <div style="width: 90%;height: 100%;margin: auto;position: relative;">
    <div class="item-header clear">
      <div class="lf full-height centerHei" style="font-size: 0.32rem;color:#666666;">{{itemData.shop_name}}</div>
      <div class="rt full-height centerHei" style="font-size: 0.28rem;color:#27dabc;">{{statusCon}}</div>
    </div>
    <div class="item-body" @click="itemDetail">

      <img :src="itemData.product_logo" alt="">

      <div class="item-body-title">{{itemData.product_title}}</div>
      <div class="item-body-price">¥{{itemData.price}}×{{itemData.total}}</div>
    </div>
    <div class="item-span">
      <span>共{{itemData.total}}件商品</span>
      <span>合计:¥{{itemData.true_price}}</span>
    </div>
    <div class="item-btn">
      <!--<div class="btn" v-if="itemData.pay_status==4">删除订单</div>-->
      <!--<div class="btn" v-if="itemData.pay_status==1||itemData.pay_status==9">取消订单</div>-->
      <!--<div class="btn-green"></div>-->

      <div class="btn" v-if="itemData.pay_status==3||itemData.pay_status==4" @click="findExpress()">查看物流</div>
      <div class="btn" v-if="itemData.pay_status==9" @click="delOrder()">删除订单</div>
      <div class="btn" v-if="itemData.pay_status==2" @click="notice()">提醒卖家发货</div>
      <div class="btn" v-if="itemData.pay_status==1" @click="cancelOrder()">取消订单</div>
      <div class="btn" v-if="itemData.pay_status==9" @click="buyAgain()">再次购买</div>
      <div class="btn-green" v-if="itemData.pay_status==3" @click="confirmReceive()">确认收货</div>
      <div class="btn-green" v-if="itemData.pay_status==1" @click="goodsPay()">付款</div>
    </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import api2 from '../api/commInfo'
  export default {
    name: 'gooditems',
    data () {
      return {
        data:'',
        delFlag:true,
        statusText:['无','待付款','待发货','已发货','已完成','申请退款','驳回','退款成功','','交易关闭'],
      }
    },
    props:['itemData'],
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
      statusCon(){
        const that=this;
        let index=that.itemData.pay_status;
        return that.statusText[index];
      },
      openid(){
        if(api2.getCookie('openid')){
          return api2.getCookie('openid');
        }
      },
    },
    methods:{
      notice:function () {
        const that=this;
        api.notice(that.token,that.itemData.orderno,function (res) {
          if(res.data.code=100000){
            alert(res.data.description);

          }
        })
      },
      delOrder(){
        const that=this;
        api.delOrder(that.token,that.itemData.orderid,that.itemData.orderno,function (res) {
          if(res.data.code=100000){
            alert(res.data.description);
            that.delFlag=false;
          }
        })
      },
      buyAgain(){
        const that=this;
        this.$router.push({path:'goods_detail',query:{pro_id:that.itemData.product_id}});

      },
      confirmReceive(){
        const that=this;
        api.confirmReceive(that.token,that.itemData.orderid,that.itemData.orderno,function (res) {
          if(res.data.code=100000){
            alert(res.data.description);
            that.delFlag=false;
          }
        })
      },
      cancelOrder(){
        const that=this;
        api.cancelOrder(that.token,that.itemData.orderid,function (res) {
          if(res.data.code=100000){
            alert(res.data.description);
            that.delFlag=false;
          }
        })
      },
      findExpress(){
        let expressno=this.itemData.expressno;
        let comtype=this.itemData.comtype;
        this.$router.push('../../expressInfo/'+expressno+'&&'+comtype);
      },
      itemDetail:function () {
//        console.log(this.itemData.pay_status)
        let status=this.itemData.pay_status;
        this.$store.commit('ORDER_NUM',this.itemData.orderno);
        if(status==1){
          this.$router.push('/MyOrder/detail/'+this.itemData.orderid+'&&pending')
        }else {
          this.$router.push('/MyOrder/detail/'+this.itemData.orderid+'&&'+this.itemData.orderno);
        }

      },
      goodsPay(){
        const that=this;
        api2.wxPay(that.openid,that.itemData.orderid,that);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goodsitems{
  width: 100%;
  height: 4.26rem;
  background-color: white;
  margin-top: 0.2rem;

  overflow: hidden;
}
  .item-header{
    width: 100%;
    height: 0.9rem;

  }
  .item-body{
    width: 100%;
    height: 2.01rem;
    position: relative;
  }
  .item-body img{
    border-radius: 0.2rem;
    border: solid 1px rgba(230, 230, 230, 1);
    width: 1.6rem;
    position: absolute;
    top:0;
    left: 0;

  }
.item-body-title{
  width: 4.76rem;
  height: 0.8rem;
  position: absolute;
  left: 1.9rem;
  top: 0.09rem;
  font-size: 0.32rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.4rem;
  letter-spacing: 0px;
  color: #000000;
  overflow: hidden;
}
.item-body-price{
  position: absolute;
  left: 1.9rem;
  top: 1.3rem;
  height: 0.3rem;
  font-size: 0.3rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.3rem;
  letter-spacing: 0px;
  color: #333333;
}
.item-span{
  width: 100%;
  height: 0.25rem;
  font-size: 0.25rem;
  line-height: 0.25rem;
  color: #666666;
  text-align: right;
}
  .item-btn{
    width: 100%;
    height: 0.9rem;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgba(230, 230, 230, 1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.26rem;
  }
  .item-btn .btn-green{
    width: 1.6rem;
    height: 0.6rem;
    background-color: rgba(39, 218, 188, 1);
    border-radius: 0.1rem;
    margin-left: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-btn .btn{
    width: 1.6rem;
    height: 0.6rem;
    border-radius:  0.1rem;
    border: solid 1px rgba(130, 130, 130, 1);
    box-sizing: border-box;
    margin-left: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .in-bl{
    display: inline-block;
  }
  .full-height{
    height: 100%;
  }
  .centerHei{
    display: flex;
    align-items: center;
  }
</style>
