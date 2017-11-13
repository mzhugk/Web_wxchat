<template>
  <div class="expressInfo" v-title data-title="物流信息">
    <div class="header">
      <img src="" alt="">
    </div>
    <div style="height: 0.2rem"></div>
    <div class="box_title">

      <div class="title">
        物流追踪
      </div>
    </div>

    <div class="box" v-for="(i,index) in 5":key="index">

      <div class="time_box">
        <p>12:00:00</p>
        <p  style="font-size: 0.2rem;color: #999999;">2016-04-17</p>
      </div>
      <div  class="cricle" :class="{ v_line: index!=0 }"></div>
      <div class="con_box">
        <p>申通快递员 广东广州 收件员 xxx 已揽件</p>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '../api/api'
  import { Timeline, TimelineItem, XButton } from 'vux'
  export default {
    name: 'expressInfo',

    components: {
      Timeline, TimelineItem, XButton
    },
    data () {
      return {

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
      expressno(){
        let data=this.$route.params.expressdata;

        return data.split('&&')[0];
      },
      comtype(){
        let data=this.$route.params.expressdata;

        return data.split('&&')[1];
      }

    },

    created:function () {

    },
    methods:{
      init(){
        const that=this;
        api.expressData(that.token,that.expressno,that.comtype,function (res) {
          res.object[0]
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.expressInfo{
  width: 100%;
  height: 100%;
  font-size: 0.26rem;
  background-color: rgb(247,247,247);
}
.box{
  width: 100%;
  height: 1.14rem;
  background-color: white;
  padding-top: 0.2rem;
  box-sizing: border-box;
}

  .cricle{

    width: 0.22rem;
    height: 0.22rem;
    border-radius: 50%;
    border: 0.03rem solid black;
    background-color: rgba(39, 218, 188, 1);
    box-sizing: border-box;
    float: left;
    margin-top: 0.1rem;
  }
  .v_line{
    position: relative;

  }
  .v_line::after{
    content: '';
    margin: 0;
    display: inline-block;
    height: 0.8rem;
    width: 0.02rem;
    background-color: rgba(153, 153, 153, 1);
    position: absolute;
    top: -0.89rem;
    left: 50%;
    transform: translate(-100%,0%);

  }
  .time_box{
    height: 100%;
    width: 1.68rem;
    float: left;
    text-align: right;
    padding-right: 0.2rem;
    box-sizing: border-box;
  }
  .con_box{
    height: 100%;
    width: 5.6rem;
    float: left;
    padding-left: 0.2rem;
    padding-right: 0.3rem;
    box-sizing: border-box;
  }
  .box_title{
    width: 100%;
    height: 0.66rem;
    background-color: white;
  }
  .box_title .title{
    width: 6.9rem;
    height: 100%;
    margin: auto;
    font-size: 0.28rem;
    border-bottom: 1px solid rgb(230, 230, 230);
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .header{
    width: 100%;
    height: 1.9rem;
    background-color: white;
    padding: 0.3rem;
    box-sizing: border-box;
  }
.header img{
  height: 100%;
  border-radius: 0.2rem;
  border: solid 1px rgba(204, 204, 204, 1);
}
.header .con{
  height: 100%;
}
</style>
