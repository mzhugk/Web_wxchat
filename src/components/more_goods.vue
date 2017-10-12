<template>
  <div class="more_goods" v-title  :data-title="title">
    <div v-if="goods.length">
        <div class="good" v-for="i in goods">
            <img :src="i.product_logo" alt="">
            <p class="pro_title">{{i.product_title}}</p>
            <p class="price" v-if="i.price">¥ {{i.price}}</p>
            <p class="price" v-else>¥ {{i.product_price}}</p>
        </div>
    </div>
    <div v-else-if="obj.product.length">
        <div class="good" v-for="i in obj.product" >
            <img :src="i.product_logo" alt="">
            <p class="pro_title">{{i.product_title}}</p>
            <p class="price">¥ {{i.product_price}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        title:"",
        goods:[],
    }
  },
  props:["obj"],
  methods:{
      getmore_goods(){
        this.title="活动商品";
        let that=this;
        this.$ajax({//活动商品更多展示接口
          url:"http://huijuquanqiu.vip/api/index/moreGoods",
          method:"post"
        }).then(function (res) {
          if(res.data.code==100000){
            that.goods=res.data.object[0];
          }
        }).catch(function (err) {

        });
      },
      getarea_goods(){
      let plan=window.location.href.split("&")[0].split("=")[1];
      this.title=decodeURI(window.location.href.split("&")[1].split("=")[1]);
      let that=this;
      this.$ajax({//单个地域下产品列表
        url:"http://www.huijuquanqiu.vip/api/goods/goodslist",
        method:"get",
        params:{
            class_id:plan,
            PageSize:1000
        }
      }).then(function (res) {
        if(res.data.code==100000){
          that.goods=res.data.object[0].data;
        }
      }).catch(function (err) {

      });
    }
  },
  created:function () {
      if(/more_goods/i.test(window.location.href)){
        this.getmore_goods();
      }else if(/area_goods/i.test(window.location.href)){
        this.getarea_goods();
      }else{
          //显示专栏详情
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/more_goods.css";
</style>
