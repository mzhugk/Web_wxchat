<template>
  <div class="xAddress" @click="goAddress">

<div class="fullArea" v-if="defaultItem">
    <div style="width: 6.46rem;height: 1rem;" @click="">
      <div class="left">收货人：{{defaultItem.shr_name}}</div>
      <div class="right">{{defaultItem.shr_tel}}</div>

    </div>
    <div class="content">{{defaultItem.shr_province}}{{defaultItem.shr_city}}{{defaultItem.shr_area}}{{defaultItem.shr_address}}</div>
    <div class="arrow" >></div>

  </div>
    <div class="fullArea add_new" v-if="!defaultItem">
      + 新增收货地址地址
    </div>
    <img class="top_line" src="../assets/img/address_bg.png" alt="">
    <img class="bottom_line" src="../assets/img/address_bg.png" alt="">

  </div>
</template>

<script>

  export default {
    name: 'xAddress',
    data () {
      return {
        changeFlag:true,
      }
    },
    props:['orderb'],
    computed:{
      addressData(){return this.$store.getters.getAddress},
      defaultItem(){
        //默认地址，订单则显示订单地址
        const that=this;
        if(that.orderb){
          that.changeFlag=false;
          return that.orderb;
        }else {
          if (that.addressData) {
            for (var i in that.addressData.data.object[0].data) {
              if (that.addressData.data.object[0].data[i].is_default) {
                return that.addressData.data.object[0].data[i]
              } else {
                return false
              }
            }
          }
        }
      },

    },
    created:function () {
      this.$store.dispatch('getAddressData');
    },
    methods:{
      goAddress:function () {
        this.$router.push('/addressList');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.xAddress{
  width: 100%;
  height: 2rem;
  padding-left: 0.29rem;
  padding-right: 0.29rem;
  box-sizing: border-box;
  position: relative;
  background-color: white;
}
  .left{
    float: left;
    width: 40%;
    height: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    justify-content: flex-start;
    border: none;
  }
.right{
  float: right;
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 0.28rem;
  justify-content: flex-end;
}
  .content{
    width: 6.37rem;
    height: 0.55rem;
    font-size: 0.26rem;
    overflow: hidden;
    line-height: 0.28rem;
    color: #999999;
  }
  .arrow{
    position: absolute;
    left: 94%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%)
  }
  .fullArea{
    width: 100%;
    height: 100%;
  }
  .add_new{
    font-size: 0.28rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .top_line{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .bottom_line{
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    transform: translate(0%, -100%);
    -webkit-transform: translate(0%, -100%)
  }
</style>
