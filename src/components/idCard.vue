<template>
  <div class="idCard" v-title data-title="实名认证">
<div class="header">身份证号（必填）</div>
    <div class="id_input">
      <x-input title='你的身份证号码' :is-type="cardtype"  v-model="idcard"></x-input>
    </div>
    <div style="height: 0.2rem"></div>
<div class="con_box">
  <p>为什么需要上传身份信息?</p>
  <p>根据海关规定,购买跨境商品需办理清关手续，请您配合上传身份信息，以确保您购买的商品顺利通过海关检查。(汇聚全球承诺所传身份证明只用于办理跨境商品的清关手续，不作其他用途使用，其他任何人均无法查看)</p>
  <div style="height: 0.2rem"></div>
  <p>购买跨境商品时，提交的身份证信息需与下单时所填写的收货人相符</p>
</div>
    <div style="height: 0.3rem"></div>
    <div class="keep_btn" @click="keepId">保存</div>
  </div>
</template>

<script>
  import { XInput, Group } from 'vux'
  import api from '../api/api'
  import api2 from '../api/commInfo'
  export default {
    name: 'idCard',
    data() {
      return {
        idcard: '',
        cardtype: function (value) {
          return {
            valid: (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/.test(value)),
            msg: '请输入正确的身份证号码！'
          }
        },
      }
    },
    components: {
      XInput, Group
    },
    computed: {
      token() {
        const that = this;
        if (api2.getCookie('user_token')) {
          return api2.getCookie('user_token')
        }
        else {
          let url = window.location.href;
          url = url.split('/#/')[1];
          sessionStorage.setItem('return_url', url);
          that.$router.push('login');
        }
      }
    },
    created: function () {

    },
    methods: {
      keepId() {
        const that=this;
        api.idcardEdit(that.token,that.idcard,function (res) {
          if(res.data.code==100000){
            that.$router.go(-1)
          }
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.idCard{
  width: 100%;
  height: 100%;
  background-color: rgb(247,247,247);
}
  .header{
    width: 100%;
    height: 0.65rem;
    padding-left: 0.32rem;
    display: flex;
    align-items: center;
    font-size: 0.26rem;
    color: #666666;
    box-sizing: border-box;
  }
  .con_box{
    width: 100%;
    height: 3.4rem;
    padding: 0.14rem 0.3rem;
    box-sizing: border-box;
    background-color: white;
    color: #999999;
  }
.con_box p:nth-child(1){
  font-size: 0.26rem;
  text-align: center;
  line-height: 0.8rem;
}
.con_box p:nth-child(2){
  font-size: 0.24rem;
  line-height: 0.38rem;
}
.con_box p:nth-child(3){
  font-size: 0.24rem;
  line-height: 0.38rem;
}
.id_input{
  width: 100%;
  height: 0.9rem;
  display: flex;
  align-items: center;
  background-color: white;
  color: #999999;
  font-size: 0.26rem;
}
  .keep_btn{
    width: 6.9rem;
    height: 0.9rem;
    background-color: rgba(39, 218, 188, 1);
    border-radius: 0.1rem;
    margin: auto;
    font-size: 0.34rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
