<template>
  <div id="area_more" v-title data-title="产地鲸选">
        <div class="area_box" v-for="i in area_box">
          <!--<router-link :to="{ path: 'area_goods', query: { plan:i.class_id,name:i.name }}"><img :src="i.big_img" alt=""></router-link>-->
         <img :src="i.big_img" alt="" @click="go(i.class_id,i.name,'area_goods')">
        </div>
  </div>
</template>

<script>
  export default {
    name:"area_more",
    data(){
        return {
            area_box:[]
        }
    },
    methods:{
      go(params,name,area_goods){//路由跳转
        sessionStorage.setItem("area_goods",params);
        sessionStorage.setItem("area_name",name);
        this.$router.push({path: area_goods});
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
