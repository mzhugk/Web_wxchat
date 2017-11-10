<template>
  <div class="more_goods" v-title  :data-title="title">
    <!--活动商品或者地域分类下的商品-->
    <div v-if="goods.length">
      <toast v-model="isShow" text="小主，不要再拉了╮(╯_╰)╭" type="text" :is-show-mask=true position="bottom" width="7.5rem"></toast>
      <pull-to :top-load-method="refresh" :bottom-load-method="loading_more" :top-config="{triggerDistance: 50}" :bottom-config="{triggerDistance: 50} ">
        <div class="good" v-for="i in goods" @click="go(i.pro_id,'goods_detail')">
              <!--<router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">-->
                  <img :src="i.product_logo" alt="">
                  <p class="pro_title">{{i.product_title}}</p>
                  <p class="price" v-if="i.price">¥ {{i.price}}</p>
                  <p class="price" v-else>¥ {{i.product_price}}</p>
              <!--</router-link>-->
        </div>
      </pull-to>
    </div>
    <!--专题推荐的商品-->
    <div v-else-if="obj_product.length">
          <div class="good" v-for="i in obj_product" @click="go(i.pro_id,'goods_detail')">
              <!--<router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">-->
                  <img :src="i.product_logo" alt="">
                  <p class="pro_title">{{i.product_title}}</p>
                  <p class="price">¥ {{i.product_price}}</p>
              <!--</router-link>-->
          </div>
    </div>
  </div>
</template>

<script>
  import PullTo from 'vue-pull-to'
  import { Toast } from 'vux'
export default {
  name:"more_goods",
  components: {
    PullTo,Toast
  },
  data () {
    return {
        isShow:false,//我是有底线的  toast默认不显示
        title:"",
        goods:[],//活动商品或者地域分类下的商品
        PageSize:20,//每页取20条数据
        PageIndex:0,//默认从第一页开始取数据
        count:"",     //总数据条数
    }
  },
  props:["obj_product"],//专题推荐的商品数据
  methods:{
    go(params,goods_detail){//路由跳转
      sessionStorage.setItem("goods_detail",params);
      this.$router.push({path: goods_detail});
    },
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
      getarea_goods(PageIndex){
//      let plan=window.location.href.split("&")[0].split("=")[1];
//      this.title=decodeURI(window.location.href.split("&")[1].split("=")[1]);//title
        let plan=sessionStorage.getItem("area_goods");
        this.title=decodeURI(sessionStorage.getItem("area_name"));//title
      let that=this;

      this.$ajax({//单个地域下产品列表
        url:"http://www.huijuquanqiu.vip/api/goods/goodslist",
        method:"get",
        params:{
            class_id:plan,
            PageSize:that.PageSize,
            PageIndex:PageIndex
        }
      }).then(function (res) {
        if(res.data.code==100000){
          that.count=res.data.object[0].count;
          if(that.PageIndex==0){
            that.goods=[];
          }else{

          }
          that.goods=that.goods.concat(res.data.object[0].data);
//          console.log(that.goods);
        }
      }).catch(function (err) {

      });

    },
    refresh(loaded) {
      setTimeout(() => {
        if(/more_goods/i.test(window.location.href)){
          this.getmore_goods();
        }else{
          this.PageIndex=0;
          this.getarea_goods(this.PageIndex);
        }
        loaded('done');
      }, 1500);
    },
    loading_more(loaded){
      setTimeout(() => {
        if (this.goods.length < this.count) {
            this.PageIndex++;
            this.getarea_goods(this.PageIndex);
          }else{
            this.isShow=true;
        }
        loaded('done');
      }, 1500);
    }
  },

  created:function () {
      if(/more_goods/i.test(window.location.href)){
        this.getmore_goods();
      }else if(/area_goods/i.test(window.location.href)){
        this.getarea_goods(this.PageIndex);//PageIndex=0
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
