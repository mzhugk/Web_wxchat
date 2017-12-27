<template>
  <div id="area_more" v-title data-title="产地鲸选" v-if="area_box.length">
        <div class="area_box" v-for="i in area_box">
          <!--<router-link :to="{ path: 'area_goods', query: { plan:i.class_id,name:i.name }}"><img :src="i.big_img" alt=""></router-link>-->
         <img :src="i.big_img" alt="" @click="go(i.class_id,i.name,'area_goods')">
        </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import api2 from '../api/commInfo'
  export default {
    name:"area_more",
    data(){
        return {
            area_box:[]
        }
    },
    computed:{
      token(){
        const that=this;

        // if(that.$store.getters.token){return that.$store.getters.token}
        // else
        if(api2.getCookie('user_token')){return api2.getCookie('user_token')}
        else {
          let url=window.location.href;
          url=url.split('/#/')[1];
          sessionStorage.setItem('return_url',url);
          that.$router.push('login');
        }
      },
    },
    methods:{
      go(params,name,area_goods){//路由跳转
//        sessionStorage.setItem("area_goods",params);
//        sessionStorage.setItem("area_name",name);
//        this.$router.push({path: area_goods,query: { plan:params,name:name}});
          this.$router.push({path: area_goods+"/"+name+"/"+params,params: { plan:params,name:name}});

      },
        getarea(){
          let that=this;
          this.$ajax({
            url:"http://www.huijuquanqiu.vip/api/Index/classfy",
            method:"get",
          }).then(
              function (res) {
                if(res.data.code==100000){
                  that.area_box=res.data.object[0];
                }
              }
          ).catch(
              function (err) {
                console.log(err);
              }
          );
        }

    },
    created:function () {
      this.getarea();
    }
  }
</script>

<style scoped>
  @import "../assets/css/area_more.css";
</style>
