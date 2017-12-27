<template>
    <div id="index" v-title :data-title="title">
      <!--页面的悬浮条：个人中心和购物车-->
      <div class="suspend">
        <p class="personal" @click="person()"></p>
        <p class="w_cart" @click="wCart()"></p>
      </div>
      <scroller v-model="scrollerStatus" lock-x  ref="scroller" :bounce="isbounce"
                 :use-pulldown="showdown"  :pulldown-config="pulldown"   @on-pulldown-loading="selPullDown()">

        <div ref="self" >
        <!--首页轮播-->
        <div class="banner">
          <swiper :list="baseList" auto loop :aspect-ratio="375/750" :show-dots="false" :show-desc-mask="false" ></swiper>
        </div>
        <!--地域-->
        <div class="area" v-if="area.length">
          <div class="area_lf">
            <p class="area_1"><img :src="area[0].image"   @click="go(area[0].class_id,'area')"></p>
          </div>
          <div class="area-rt">
            <div class="area_2">
              <img :src="area[1].image"  @click="go(area[1].class_id,'area')">
            </div>
            <div>
              <p class="area_3"><img :src="area[2].image"  @click="go(area[2].class_id,'area')"></p>
              <router-link to="area_more"><p class="area_4"><img :src="area[3].image"></p></router-link>
            </div>
          </div>
        </div>
        <!--头条-->
        <div class="ads" v-if="headline.length">
          <img src="../assets/img/headline.png" alt="">
          <span class="arrow">></span>
          <swiper auto loop height="15px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
            <swiper-item v-for="item in headline" :key="item.introduce"><p><a :href="item.content">{{item.title}}</a></p></swiper-item>
          </swiper>
        </div>
        <!--活动页-->
        <div class="activity" v-if="activity.is_activity">
          <a :href="activity.url"><img :src="activity.image" alt=""></a>
        </div>
        <!--活动商品-->
        <div class="goods" v-if="goods.length">
          <div class="goods_tit">
            <b></b>
            <span class="activities">活动商品</span>
            <span class="pro_more"><router-link to="/more_goods">更多 ></router-link></span>
          </div>
          <scroller lock-y :scrollbar-x=false>
                <div class="box1" ref="box">
                    <div class="box1-item" v-for="i in goods" @click="go(i.pro_id,'goods_detail')">
                      <!--<router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">-->
                      <img :src="i.product_logo" alt="">
                      <p class="sub-title">{{i.product_title}}</p>
                      <p class="sub-price">¥ {{i.price}}</p>
                      <!--</router-link>-->
                    </div>
                </div>

          </scroller>
        </div>
        <div style="height: 4.2rem"></div>
        <!--精选专题-->
        <div class="goods" v-if="subject">
          <div class="goods_tit">
            <b></b>
            <span class="activities">精选专题</span>
          </div>
            <ul class="theme" >
              <li v-for="i in subject">
                <!--<router-link :to="{ path: 'column', query: { plan:i.theme_id }}"><img :src="i.img" alt=""></router-link>-->
                <img :src="i.img" alt="" @click="go(i.theme_id,'column')">
              </li>
            </ul>
        </div>
      </div>
      </scroller>
    </div>

</template>

<script>
  import { Swiper,SwiperItem,Scroller} from 'vux'
  import api from '../api/api'
  import api2 from '../api/commInfo'
export default({
  name:"index",
  components: {
    Swiper, SwiperItem,Scroller
  },
  data () {
    return {
      title:"汇聚全球",
      baseList: [],//首页轮播图数据
      area: [],//首页地域分类
      headline: [],//首页汇聚头条
      activity: [],//活动H5广告
      goods: [],//首页活动商品滑动区域
      subject: [],//专题的数据
      subjectLength:'',//专题的条数
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
    }
  },
  mounted () {
    //第一次加载
    this.$nextTick(() => {
      this.$refs.scroller.reset();
    })
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
  methods: {
    init(){
      //   第一部分接口
      let that=this;
      this.$ajax({
        url:"http://huijuquanqiu.vip/api/index/indexTop",//Down// theme
        method:"post",
      })
        .then(function(res){
          if(res.data.code==100000){
            for(let i=0,len=res.data.object[0].banner.length;i<len;i++){
              if(res.data.object[0].banner[i].type=="1"){
                var banner={url:"goods_detail/"+res.data.object[0].banner[i].content,img:res.data.object[0].banner[i].img};
              }
              if(res.data.object[0].banner[i].type=="2"){
                var banner={url:"http://www.huijuquanqiu.vip/api/Index/theme_detail?theme_id="+res.data.object[0].banner[i].content,img:res.data.object[0].banner[i].img};
              }
              if(res.data.object[0].banner[i].type=="3"){
                var banner={url:"http://www.huijuquanqiu.vip/api/Impression/impression_url?id="+res.data.object[0].banner[i].content,img:res.data.object[0].banner[i].img};
              }
              if(res.data.object[0].banner[i].type=="4"){
                var banner={url:res.data.object[0].banner[i].content,img:res.data.object[0].banner[i].img};
              }
              that.baseList.push(banner);//banner数据
            }
            that.area=res.data.object[0].classify;//地域数据
            that.headline=res.data.object[0].top;//头条数据
          }
        })
        .catch(function(err){
          console.log(err);
        });
      //中间部分接口
      this.$ajax({
        url:"http://huijuquanqiu.vip/api/index/indexDownv2",//Down// theme
        method:"post",
      })
        .then(function (res) {
          if(res.data.code==100000){
            //活动页数据
            that.activity=res.data.object[0].activity;
            //活动商品数据
            that.goods=res.data.object[0].goods;
            setTimeout(function () {
              that.$refs.box.style.width=3+(that.goods.length-1)*3.15+"rem";//设置活动商品宽度
            },100);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      //专题接口
      this.$ajax({
        url:"http://huijuquanqiu.vip/api/index/theme?PageSize=20",
        method:"get"
      })
        .then(function (res) {
          if(res.data.code==100000){
            that.subject=res.data.object[0].data;
            that.$refs.self.style.height=14.44+that.subject.length*3.96+"rem";//设置首页滚屏高度
            that.scrollerStatus.pulldownStatus = 'default';
          }
        })
        .catch(function(err){
          console.log(err);
        });
      },
    selPullDown(){
      console.log("下拉");
      this.baseList=[];
      this.area=[];
      this.headline=[];
      this.activity=[];
      this.goods=[];
      this.subject=[];
      //初始化
      this.init();
    },
    activated () {
      this.$refs.scroller.reset();
    },
    go(params,goods_detail){//路由跳转
//      sessionStorage.setItem(area,params);
//      this.$router.push({path: goods_detail,query: { plan:params}});
      this.$router.push({ path: goods_detail+"/"+params,params: { plan:params}});
    },
    wCart(){
        this.$router.push("cartList");
    },
    person(){
      this.$router.push("person");
    }
  },
  created:function () {
    //初始化
    this.init();
    }
  });

</script>

<style scoped>
  @import "../assets/css/index.css";
</style>
