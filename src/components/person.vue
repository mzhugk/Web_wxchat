<template>
  <div class="person" v-title data-title="个人中心">
    <div class="logo_box">
      <img :src="personData.icon" alt="">
      <div class="name_box rt">
        <div class="name_info">
          <div class="name">{{personData.nickname}}</div>
          <div class=""></div>
        </div>
      </div>
    </div>
    <div style="height: 0.2rem"></div>
    <div class="order_list">
      <div v-for="(item,index) in orderData":key="index" class="order_item lf">
        <div>
          <span>{{item}}</span>
        </div>
      </div>
    </div>
    <div style="height: 0.18rem"></div>
    <div class="box_list">
      <div v-for="(item,index) in boxData":key="index" class="box_item lf">
        <p >

          <img style="width: 0.4rem;display: block;margin: auto;padding-bottom: 0.26rem;box-sizing: border-box" src="../assets/img/selected.png" alt="">
          <span style="display: block">{{item}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import { Timeline, TimelineItem, XButton } from 'vux'
  export default {
    name: 'person',

    components: {

    },
    data () {
      return {
        personData:'',
        orderData:['待收货','待发货','待付款','全部订单'],
        boxData:['购物车','礼券兑换','我的礼券','售后服务','收货地址','常见问题','联系客服','',''],
      }
    },
    watch:{

    },

    computed:{
      token(){
        const that=this;

        if(that.$store.getters.token){return that.$store.getters.token}
        else if(sessionStorage.getItem('token')){return sessionStorage.getItem('token')}
        else {alert('token_error')};

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
  background: url("../assets/img/headlogobg.png") ;
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
</style>
