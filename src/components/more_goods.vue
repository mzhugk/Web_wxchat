<template>
  <div class="more_goods" v-title  :data-title="title">
    <!--活动商品或者地域分类下的商品-->
    <div v-if="goods.length">
      <div class="good" v-for="i in goods">
            <router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">
                <img :src="i.product_logo" alt="">
                <p class="pro_title">{{i.product_title}}</p>
                <p class="price" v-if="i.price">¥ {{i.price}}</p>
                <p class="price" v-else>¥ {{i.product_price}}</p>
            </router-link>
      </div>
    </div>
    <!--专题推荐的商品-->
    <div v-else-if="obj.product.length">
        <div class="good" v-for="i in obj.product" >
            <router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">
                <img :src="i.product_logo" alt="">
                <p class="pro_title">{{i.product_title}}</p>
                <p class="price">¥ {{i.product_price}}</p>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"more_goods",
  data () {
    return {
        title:"",
        goods:[],//活动商品或者地域分类下的商品
    }
  },
  props:["obj"],//专题推荐的商品数据
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
//            console.log(that.goods)
          }
        }).catch(function (err) {

        });
      },
      getarea_goods(){
      let plan=window.location.href.split("&")[0].split("=")[1];
      this.title=decodeURI(window.location.href.split("&")[1].split("=")[1]);//title
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
        this.title="专栏推荐";
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/more_goods.css";
</style>
