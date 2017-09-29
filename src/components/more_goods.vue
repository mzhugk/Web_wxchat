<template>
  <div id="more_goods" v-title data-title="活动商品">
      <div class="good" v-for="i in goods">
        <img :src="i.product_logo" alt="">
        <p class="pro_title">{{i.product_title}}</p>
        <p class="price">¥ {{i.price}}</p>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods:[]
    }
  },
  methods:{},
  mounted:function () {
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/more_goods.css";
</style>
