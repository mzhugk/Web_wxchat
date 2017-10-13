<template>
  <div class="goodsitems" @click="test" >
    <div style="width: 90%;height: 100%;margin: auto;position: relative;">
    <div class="item-header clear">
      <div class="lf full-height centerHei" style="font-size: 0.32rem;color:#666666;">{{itemData.shop_name}}</div>
      <div class="rt full-height centerHei" style="font-size: 0.28rem;color:#27dabc;">{{itemData.pay_status}}</div>
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

      <div class="btn"></div>
      <div class="btn-green"></div>
    </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  export default {
    name: 'gooditems',
    data () {
      return {
        data:'',
      }
    },
    props:['itemData'],
    computed:{
//      addressData(){return this.$store.getters.testgetter},
    },
    methods:{
      test:function () {
//        console.log(this.itemData)
      },
      itemDetail:function () {
        this.$store.commit('ORDER_NUM',this.itemData.orderno);
        this.$router.push('/MyOrder/detail/'+this.itemData.orderno);
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
  }
  .item-btn .btn-green{
    width: 1.6rem;
    height: 0.6rem;
    background-color: rgba(39, 218, 188, 1);
    border-radius: 0.1rem;
    margin-left: 0.3rem;
  }
  .item-btn .btn{
    width: 1.6rem;
    height: 0.6rem;
    border-radius:  0.1rem;
    border: solid 1px rgba(0, 0, 0, 1);
    box-sizing: border-box;
    margin-left: 0.3rem;
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
