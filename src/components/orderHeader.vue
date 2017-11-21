<template>
  <div class="orderHeader">

    <div class="ftime" v-if="other.pay_status==1">
      <img src="../assets/img/time.png" alt="">
      <span>{{timetext1}}</span>
    </div>
    <div class="ftime" v-if="other.pay_status==3">
      <!--{{etime}}-->
      <!--{{orderb.fhtime}}-->
      <img src="../assets/img/time.png" alt="">
      <span>{{timetext2}}</span>
    </div>
    <div class="exp_box" v-if="other.pay_status==3">
      <div>
    <div class="com" >
      <img src="" alt="">
      <span>快递公司:{{orderb.order[0].com}}</span>
      </div>
      <div style="height: 0.15rem"></div>
    <div class="com" >
      <img src="" alt="">
      <span>运单号:{{orderb.order[0].expressno}}</span>
    </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'orderHeader',
    data () {
      return {
        etime:false,
      }
    },
    props:['orderb','other'],
    computed:{
      timetext1(){
        const that=this;

          if(that.other.pay_status==1){
            if(that.etime){
            return '剩'+that.etime[0]+'天'+that.etime[1]+'小时'+that.etime[2]+'分'+that.etime[3]+'秒订单 自动取消'
          }else {return '订单已经关闭'}
        }
      },
      timetext2(){
        const that=this;
          if(that.other.pay_status==3){
            if(that.etime){
            return '订单将在'+that.etime[0]+'天'+that.etime[1]+'小时'+that.etime[2]+'分后自动确认收货'
          }else {return '订单已经自动确认收货'}
        }
      }
    },
    created:function () {

    },
    watch:{
      other(newValue){
        const that=this;

        if(newValue.pay_status==1){

          let stringTime = this.other.ctime;
          let timestamp2 = Date.parse(new Date(stringTime));
          let endtime = parseInt(timestamp2/1000)+1800;
          this.countDown(endtime);


        }else if(newValue.pay_status==3){

                  if(that.orderb.fhtime!=0&&that.orderb.fhtime!='0'){
          this.countDown(that.orderb.fhtime);
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
          that.etime=[d,hour,min,sec];
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
  .exp_box{
    width: 100%;
    height: 1.24rem;
    display: flex;
    align-items: center;
  }
  .com{
    width: 100%;
    height: 0.28rem;
  }
  .com img{
    width: 0.24rem;
  }
  .com span{
    color: #333333;
    font-size: 0.28rem;
    line-height: 0.28rem;
    margin-left: 0.18rem;
  }
</style>
