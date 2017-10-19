<template>
  <div id="column" >
      <div class="column_title"><img :src="obj.img"></div>
      <div class="column_text">
          <p class="top"><span>{{obj.title}}</span></p>
          <p class="intro"><span>{{obj.content}}</span></p>
      </div>
      <more_goods :obj="obj"></more_goods>
  </div>
</template>

<script>
  import more_goods from "./more_goods.vue"
  export default {
    name:"column",
    components: {
      more_goods
    },
    data(){
        return {
          obj:[]
        }
    },
    methods:{
      getcolumn(){
          let plan=window.location.href.split("=")[1];
          let that=this;
          this.$ajax({
            url:"http://www.huijuquanqiu.vip/api/Index/theme_detail",
            method:"get",
            params:{
              theme_id:plan,
              PageSize:1000
            }
          }).then(
              function (res) {
                if(res.data.code==100000){
                  that.obj=res.data.object[0].data;
//                  console.log(that.obj.product)
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
      this.getcolumn();
    }
  }
</script>

<style scoped>
  @import "../assets/css/column.css";
</style>
