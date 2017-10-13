<template>
  <div class="orderHeader">
    <div class="ftime" v-if="orderb.pay_status==1">
      <img src="" alt="">
      <span>{{timetext}}</span></div>
    <div v-if="orderb.pay_status==3">
    <div class="com" >
      <img src="" alt="">
      <span>{{orderb.com}}</span>
      </div>
    <div class="com" >
      <img src="" alt="">
      <span>{{orderb.expressno}}</span>
    </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  export default {
    name: 'orderHeader',
    data () {
      return {
        etime:false,
      }
    },
    props:['orderb'],
    computed:{
      timetext(){
        const that=this;
        if(that.etime){
          if(that.orderb.pay_status==1){
            return '剩'+that.etime[0]+'天'+that.etime[1]+'小时'+that.etime[2]+'分自动取消'
          }else if(that.orderb.pay_status==3){
            return '订单将在'+that.etime[0]+'天'+that.etime[0]+'小时'+that.etime[0]+'分后自动确认收货'
          }
        }else {return '订单已经关闭'}
      },
    },
    created:function () {

    },
    watch:{
      orderb(newValue){

        if(newValue.pay_status==1){
          let endtime = parseInt(this.orderb.ctime)+1800;
          this.countDown(endtime);


        }else if(newValue.pay_status==3){
                  if(newValue.ftime!==0&&newValue.ftime!=='0'){
          this.countDown(newValue.ftime);
        }
        }
      }
    },
    methods:{
      countDown:function (num) {
        const that=this;
        let time=parseInt(num);

        function gettime() {
          let nowTime = Math.round(new Date().getTime()/1000);
          let endTime = time;
          let t = endTime - nowTime;
          let d=Math.floor(t/60/60/24);
          let hour=Math.floor(t/60/60%24);
          let min=Math.floor(t/60%60);
          let sec=Math.floor(t%60);
          if(t>0){
          if (hour > 0&&hour < 10) {
            hour = "0" + hour;
          }
          if (min > 0&&min < 10) {
            min = "0" + min;
          }
          if (sec > 0&&sec < 10) {
            sec = "0" + sec;
          }
          that.etime=[hour,min,sec];
          }else {
            that.etime=false;
          }
        }
        gettime();
        setInterval(function () {
          gettime();
        },1000)


      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .orderHeader{
    background-color: white;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }
  .ftime{
  width: 100%;
  height: 0.78rem;
    display: flex;
    align-items: center;
}
  .ftime img{
    width: 0.24rem;

  }
  .ftime span{
    font-size: 0.28rem;
    line-height: 0.78rem;
    margin-left: 0.18rem;
    color: #27dabc;
  }
</style>
