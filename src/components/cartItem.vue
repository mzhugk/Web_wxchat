<template>
  <div class="cartItem" >
    <div style="background-color: rgb(242,242,242);height: 0.2rem"></div>
    <div class="shopHeader" >
      <img v-show="shopData.shop_selected==1" src="../assets/img/selected.png"  alt="" @click="shopSel()">
      <img v-show="shopData.shop_selected!=1" src="../assets/img/unselected.png"  alt="" @click="shopSel()">

      <span style="font-size: 0.32rem">{{shopData.shop.shop_name}}</span>
    </div>

    <div v-for="(item,index) in shopData.carb":key="index">
    <swipeout >
      <swipeout-item  transition-mode="follow" >
        <div slot="right-menu">
          <swipeout-button type="warn" @click.native="delCart(item)">删<br/>除</swipeout-button>
        </div>
        <ul slot="content" class="goodsItem" >
          <li class="sel_img_box">
            <img v-show="item.selected==1" src="../assets/img/selected.png"  alt="" @click="goodsSel(item)">
            <img v-show="item.selected!=1" src="../assets/img/unselected.png"  alt="" @click="goodsSel(item)">
          </li>
          <li class="logo_box">
            <div class="logo_img">
              <img :src="item.product_logo" alt="">
            </div>

          </li>
          <li class="con_box">
            <div class="con">
              <div class="goodsTitle">{{item.product_title}}</div>
              <div class="spec_name">{{item.spec_name}}</div>
              <div class="price">¥{{item.price}}</div>
              <div class="change">
                <img class="minus lf" src="../assets/img/-.png" alt="" @click="totalChange(item,0)">
                <span style="font-size: 0.34rem">{{item.total}}</span>
                <img class="plus rt" src="../assets/img/+.png" alt="" @click="totalChange(item,1)">
              </div>
            </div>
          </li>
        </ul>
      </swipeout-item>
    </swipeout>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
  export default {
    name: 'cartItem',
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    data () {
      return {
        data:'',
      }
    },
    props:['itemData','flag'],
    computed:{
      shopData(){
        return this.itemData;
      },
      token(){
        const that=this;

        if(that.$store.getters.token){return this.$store.getters.token}
        else if(sessionStorage.getItem('token')){return sessionStorage.getItem('token')}
        else {alert('token_error')};

      },
    },
    watch:{
      shopData: {
        handler: function (value) {
          this.updataItem(value);
        }, deep: true}
    },
    methods:{
      shopSel(){
     const that=this;
        that.$emit('update:flag',true);
     if(that.shopData.shop_selected==1){
       api.changeSelect(that.token,that.shopData.id,0,2,function (res) {
         that.shopData.shop_selected=0
       })

     }else {
       api.changeSelect(that.token,that.shopData.id,1,2,function (res) {
         that.shopData.shop_selected=1
       })

     }

//        this.shopData.shop_selected;
      },
      updataItem(value){
        this.$emit('update:itemData',value);
      },
      totalChange(item,type){
        const that=this;
        that.$emit('update:flag',true);
        if(type==0) {
          if (item.total > 1) {
            let num=parseInt(item.total)-1;
            api.changeTotal(that.token,item.bid,num,function (res) {
              item.total--;
            })

          }
        }else {

          let num=parseInt(item.total)+1;
          api.changeTotal(that.token,item.bid,num,function (res) {
            item.total++;
          })
        }
      },
      totalChangeApi(){

      },
      goodsSel(item){
        const that=this;
        that.$emit('update:flag',true);
        if(item.selected==1){
          api.changeSelect(that.token,item.bid,0,0,function (res) {
            item.selected=0
          })
        }else {
          api.changeSelect(that.token,item.bid,1,0,function (res) {
            item.selected=1
          })
        }
      },
      delCart(item){
       const that=this;
        that.$emit('update:flag',true);
        api.delCartItem(that.token,item.bid,function (res) {
          if(res){
            item.total=0;
          }
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cartItem{
  width: 100%;
  background-color:white;
}
  .shopHeader{
    width: 100%;
    height: 0.8rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .shopHeader img{
    width: 0.36rem;
    height: 0.36rem;
    margin-right: 0.3rem;

  }

  .goodsItem{
    width: 100%;
    height: 2.2rem;
    padding: 0;
    margin: 0;
    position: relative;
  }
  .sel_img_box{
    width: 0.86rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sel_img_box img{
    width: 0.36rem;
    height: 0.36rem;
  }
  .logo_box{
    width: 1.8rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0.86rem;
    display: flex;
    align-items: center;
  }

  .logo_box img{
    width: 100%;
    border-radius: 0.2rem;
    border: solid 1px rgba(230, 230, 230, 1);
  }
  .con_box{
    width: 4.84rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;

  }
  .con{
    width: 100%;
    height: 1.8rem;
    padding-top: 0.08rem;
    box-sizing: border-box;
    position: relative;
  }
  .goodsTitle{
    width: 3.73rem;
    height: 0.6rem;
    font-size: 0.28rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.3rem;
    color: #000000;
    overflow: hidden;
  }
  .spec_name{
    width: 3.73rem;
    height: 0.26rem;
    font-size: 0.26rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.26rem;
    color: #8a8a8f;
    overflow: hidden;
    margin-top: 0.19rem;
    margin-bottom: 0.28rem;
  }
  .price{
    font-size: 0.32rem;
    line-height: 0.32rem;
  }
  .change{
    width: 1.8rem;
    height: 0.48rem;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .minus{
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .plus{
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
