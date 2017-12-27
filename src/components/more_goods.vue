<template>
  <div class="more_goods" v-title  :data-title="title">
    <!--活动商品或者地域分类下的商品-->
    <div v-if="goods">
      <scroller v-model="scrollerStatus" lock-x  ref="scroller" :bounce="isbounce"
                :use-pullup="showup" :use-pulldown="showdown" :pullup-config="pullup" :pulldown-config="pulldown"  @on-pullup-loading="selPullUp()" @on-pulldown-loading="selPullDown()">
        <div>
              <div class="good" v-for="i in goods" @click="go(i.pro_id,'goods_detail')">
                <!--<router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">-->
                <img :src="i.product_logo" alt="">
                <p class="pro_title">{{i.product_title}}</p>
                <p class="price" v-if="i.price">¥ {{i.price}}</p>
                <p class="price" v-else>¥ {{i.product_price}}</p>
                <!--</router-link>-->
              </div>
        </div>
        <div class="nomore" v-show="noMore"><span>暂无数据</span></div>
      </scroller>
    </div>


  </div>
</template>

<script>
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import {Scroller} from 'vux'
export default {
  name:"more_goods",
  components: {
    Scroller
  },
  data () {
    return {
        title:"",
        goods:null,//活动商品或者地域分类下的商品
        PageSize:20,//每页取20条数据
        PageIndex:0,//默认从第一页开始取数据
        count:"",     //总数据条数
        noMore:false,
        showup: true,
        showdown:true,
        isbounce: true,
        scrollerStatus: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        pulldown :{
          content: '',
          height: 60,
          autoRefresh: false,
          downContent: '下拉加载',
          upContent: '松开刷新',
          loadingContent: '刷新中...',
          clsPrefix: 'xs-plugin-pulldown-'
        },
        pullup:{
          content: '',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '松开加载更多',
          upContent: '上拉加载',
          loadingContent: '加载中...',
          clsPrefix: 'xs-plugin-pullup-'
        }
    }
  },
//  props:["obj_product"],//专题推荐的商品数据
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
    selPullUp(){
      console.log("上拉");
        if (this.goods.length < this.count) {
          this.PageIndex++;
          this.getarea_goods(this.PageIndex);
        }
    },
    selPullDown(){
      console.log("下拉");
      if(/more_goods/i.test(window.location.href)){
        this.getmore_goods();
      }else{
        this.PageIndex=0;
        this.getarea_goods(this.PageIndex);
      }
    },
    go(params,goods_detail){//路由跳转
//      sessionStorage.setItem("goods_detail",params);
//      this.$router.push({path: goods_detail,query:{plan:params}});
        this.$router.push({ path: "../../"+goods_detail+"/"+params,params: { plan:params}});
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
            that.scrollerStatus.pulldownStatus = 'default';
//            console.log(that.goods)
          }
        }).catch(function (err) {

        });
      },
      getarea_goods(PageIndex){
//      let plan=window.location.href.split("&")[0].split("=")[1];
//      this.title=decodeURI(window.location.href.split("&")[1].split("=")[1]);//title
//        let plan=sessionStorage.getItem("area_goods");
//        this.title=decodeURI(sessionStorage.getItem("area_name"));//title
        let plan=this.$route.params.plan;
        this.title=this.$route.params.name;
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
            that.goods=that.goods.concat(res.data.object[0].data);
            that.scrollerStatus.pullupStatus = 'enabled';
            that.scrollerStatus.pulldownStatus = 'default';
            that.noMore=false;
            if(that.goods.length==that.count){
              setTimeout(function () {
                that.noMore=true;
                that.scrollerStatus.pullupStatus = 'disabled';
              },500);
            }
          }else{
            that.goods=that.goods.concat(res.data.object[0].data);
            that.scrollerStatus.pullupStatus = 'default';
            if(that.goods.length==that.count){
              setTimeout(function () {
                that.noMore=true;
                that.scrollerStatus.pullupStatus = 'disabled';
              },500);
            }
          }
        }
      }).catch(function (err) {

      });

    },

  },
  created:function () {
      if(/more_goods/i.test(window.location.href)){
        this.getmore_goods();
        this.showup=false;
        this.noMore=true;
      }else if(/area_goods/i.test(window.location.href)){
        this.getarea_goods(this.PageIndex);//PageIndex=0
      }
  },
  mounted () {
    //第一次加载
    const that=this;
    setTimeout(function () {
      that.$nextTick(() => {
        that.$refs.scroller.reset()
      })
    },500);

  },
  activated () {
    this.$refs.scroller.reset()
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/more_goods.css";
</style>
