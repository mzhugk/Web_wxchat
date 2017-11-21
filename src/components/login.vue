<template>
  <div class="login" v-title data-title="汇聚全球">
    <!--<div @click="clearCookie()" style="margin:2rem 3rem 0;font-size: 0.3rem">点击</div>-->

  </div>
</template>

<script>
  import api from '../api/commInfo'
  import test from '../api/api'

  export default {
    name: 'login',
    data () {
      return {

      }
    },
    watch:{

    },
    computed:{
      returnUrl(){
      if(sessionStorage.getItem('return_url')){return sessionStorage.getItem('return_url')}
      else {
        return '/';
      }
      }
    },

    created:function () {
      this.init();
    },
    methods:{
      init(){
        const that=this;
        let cookie=api.getCookie('user_token');
        if(cookie){
          that.$router.replace(that.returnUrl);
        }else {
          window.location.href="https://www.huijuquanqiu.vip/api/Wx/wx_authorize?url=http://www.huijuquanqiu.vip/api/Wx/get_code"
//          let test101;
//          test.get101(function (res) {
//            test101=res.data.token_secret;
//            api.setCookie("user_token",test101,3);
//          })

        }

      },
//      clearCookie: function () {
//        api.delCookie("user_token");
//      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
