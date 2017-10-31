<template>
  <div id="column" >
    <toast v-model="isShow" text="小主，不要再拉了╮(╯_╰)╭" type="text" :is-show-mask=true position="bottom" width="7.5rem"></toast>
    <pull-to :top-load-method="refresh" :bottom-load-method="loading_more" :top-config="{triggerDistance: 50}" :bottom-config="{triggerDistance: 50} ">
      <div class="column_title"><img :src="obj.img"></div>
      <div class="column_text">
          <p class="top"><span>{{obj.title}}</span></p>
          <p class="intro"><span>{{obj.content}}</span></p>
      </div>
      <div style="height:0.2rem;background-color: #F2F2F2"></div>
      <more_goods :obj_product="obj_product"></more_goods>
    </pull-to>
  </div>
</template>

<script>
  import more_goods from "./more_goods.vue"
  import PullTo from 'vue-pull-to'
  import { Toast } from 'vux'
  export default {
    name:"column",
    components: {
      more_goods,PullTo,Toast
    },
    data(){
        return {
          isShow:false,//我是有底线的  toast默认不显示
          PageIndex:0,
          PageSize:20,
          count:"",
          obj:[],
          obj_product:[]
        }
    },
    methods:{
      refresh(loaded){
        setTimeout(() => {
          this.PageIndex=0;
          this.getcolumn(this.PageIndex);
          loaded('done');
        }, 1500);
      },
      loading_more(loaded){
        setTimeout(() => {
          if (this.obj_product.length < this.count) {
            this.PageIndex++;
            this.getcolumn(this.PageIndex);
          }else{
            this.isShow=true;
          }
          loaded('done');
        }, 1500);
      },
      getcolumn(PageIndex){
          let plan=window.location.href.split("=")[1];
          let that=this;
          this.$ajax({
            url:"http://www.huijuquanqiu.vip/api/Index/theme_detail",
            method:"get",
            params:{
              theme_id:plan,
              PageSize:that.PageSize,
              PageIndex:PageIndex
            }
          }).then(
              function (res) {
                if(res.data.code==100000){
                  that.count= res.data.object[0].count;
                  if(that.PageIndex==0){
                    that.obj_product=[];
                  }else{

                  }
                  that.obj=res.data.object[0].data;
                  that.obj_product=that.obj_product.concat(res.data.object[0].data.product);
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
      this.getcolumn(this.PageIndex);
    }
  }
</script>

<style scoped>
  @import "../assets/css/column.css";
</style>
