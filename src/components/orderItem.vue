<template>

  <div class="orderItem" v-if="orderb.shop">
    <div class="item_con_box">
    <div class="shop_name">{{orderb.shop.shop_name}}</div>
    <div class="line_bot"></div>
    <div class="goods_box" v-for="(item,index) in goodsData":key="index">
      <img  :src="item.product_logo" alt="">
      <div class="content">
        <div class="product_title">{{item.product_title}}</div>
        <div class="spec_name_box">
          <span class="spec_name">{{item.spec_name}}</span>
          <span class="price" >¥{{item.price}}</span>
        </div>
        <div class="total">x{{item.total}}</div>
      </div>
    </div>
    </div>
    <div style="height: 0.2rem;"></div>

  </div>
</template>

<script>
  import api from '../api/api'

  export default {
    name: 'orderItem',
    data () {
      return {

      }
    },
    props:['orderb'],
    components: {

    },
    created:function () {
//      console.log('aaaa',this.orderb)
    },
    computed:{
      goodsData(){return this.orderb.orderc},
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item_con_box{
    width: 100%;
    height: auto;
    padding: 0.3rem;
    box-sizing: border-box;
    background-color: white;
  }
  .shop_name{
    font-size: 0.3rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.3rem;
    letter-spacing: 0px;
    color: #333333;
  }
  .line_bot{
    width: 100%;
    height: 0.3rem;
    border-bottom: 1px solid rgba(213, 213, 213, 1)
  }
  .goods_box{
    width: 100%;
    height: 2.2rem;
    border-bottom: 1px solid rgba(213, 213, 213, 1);
    display: flex;
    align-items: center;
  }
  .goods_box img{
    width: 1.6rem;
    height: 1.6rem;
    border: 1px solid rgba(213, 213, 213, 1);
    border-radius: 0.3rem;
  }
  .goods_box .content{
    display: inline-block;
    width: 5.3rem;
    height: 1.6rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
  }
  .product_title{
    width: 100%;
    height: 0.6rem;
    line-height: 0.3rem;
    font-size: 0.28rem;
    overflow: hidden
  }
  .spec_name_box{
    width: 100%;height: 0.4rem;line-height: 0.4rem
  }
  .spec_name_box .spec_name {
    float: left;font-size: 0.24rem;color: #999999;}
  .spec_name_box .price{
    float: right;color: #ff0000;font-size: 0.34rem
  }
  .total{
    width: 100%;
    height: 0.6rem;
    color: #333333;
    font-size: 0.34rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    line-height: 0.34rem
  }

</style>
