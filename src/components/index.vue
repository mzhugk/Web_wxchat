<template>
  <div id="index" v-title data-title="汇聚全球">
      <div>
        <!--首页轮播-->
          <div class="banner">
              <swiper :list="baseList" auto loop :aspect-ratio="375/750" :show-dots="false" :show-desc-mask="false" ></swiper>
          </div>
        <!--地域-->
          <div class="area">
              <div class="area_lf">
                  <p class="area_1"><img :src="area[0].image"  ref="area_1" @click="go(area[0].class_id)"></p>
              </div>
              <div class="area-rt">
                  <div class="area_2">
                   <img :src="area[1].image" ref="area_2" @click="go(area[1].class_id)">
                  </div>
                  <div>
                    <p class="area_3"><img :src="area[2].image" ref="area_3"></p>
                    <p class="area_4"><img :src="area[3].image" ref="area_4"></p>
                  </div>
            </div>
        </div>
        <!--头条-->
        <div class="ads">
            <img src="../assets/img/headline.png" alt="">
            <span class="arrow">></span>
            <swiper auto loop height="15px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
                <swiper-item v-for="item in headline" :key="item.introduce"><p><a :href="item.content">{{item.title}}</a></p></swiper-item>
            </swiper>
        </div>
        <!--活动页-->
        <div class="activity">
          <a :href="activity.url"><img :src="activity.image" alt=""></a>
        </div>
        <!--活动商品-->
        <div class="goods">
            <div class="goods_tit">
              <b></b>
              <span class="activities">活动商品</span>
              <span class="pro_more"><router-link to="/more_goods">更多 ></router-link></span>
            </div>
            <scroller lock-y :scrollbar-x=false>
              <div class="box1">
                <div class="box1-item" v-for="i in goods">
                  <img :src="i.product_logo" alt="">
                  <p class="sub-title">{{i.product_title}}</p>
                  <p class="sub-price">¥ {{i.price}}</p>
                </div>
              </div>
            </scroller>
        </div>
        <div style="height: 4.2rem"></div>
        <!--精选专题-->
        <div class="goods">
            <div class="goods_tit">
              <b></b>
              <span class="activities">精选专题</span>
            </div>
            <ul class="theme">
              <li v-for="i in subject"><img :src="i.img" alt=""></li>
            </ul>
        </div>
        <!--测试-->
        <!--<div style="height:2000px;"></div>-->
        <!--<scroller v-show="isShow" v-model="scrollerStatus" height="200" lock-x scrollbar-y ref="scroller" :bounce="isbounce"-->
                  <!--:use-pullup="showUp" :use-pulldown="false" :pullup-config="upobj" @on-pullup-loading="selPullUp" @on-scroll-bottom="aa">-->

          <!--<ul class="theme">-->
            <!--<li v-for="i in lists" ><img :src="i" alt=""></li>-->
          <!--</ul>-->


        <!--</scroller>-->
        <!--<loading v-model="showloading" :text="textloading"></loading>-->

      </div>
    <!--<toast v-model="toastshow" text="没有更多了" position="bottom" type="text"></toast>-->
  </div>
</template>

<script>
  import { Swiper,SwiperItem,Scroller,Loading,Toast} from 'vux'
export default({
  components: {
    Swiper, SwiperItem, Scroller,Loading,Toast
  },
  activated () {
    this.$refs.scroller.reset()
  },
  data () {
    return {
      baseList: [],
      area: [],
      headline: [],
      activity: [],
      goods: [],
      subject: [],
      //分页加载
      type: "1",
      PageIndex: 0,//页码从第一页开始
      PageSize: 3,//煤业显示的条数
      isShow: false,//是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
      showloading: false,
      textloading: "加载中",
      showUp: true,
      isbounce: true,
      toastshow:false,
      lists: [],
      upobj: {
        content: "拉我一把",
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: "上拉加载更多",
        upContent: "上拉加载更多",
        loadingContent: "加载中...",
        clsPrefix: "xs-plugin-pullup-"
      },
      scrollerStatus: {
        pullupStatus: "default"
      }
      //分页结束
    }
  },
  methods: {
    //第一次加载的时候容易为空true
    getNewsList (isEmpty) {
      let that = this;
      this.showloading = true;
      this.$ajax({
        url: "http://huijuquanqiu.vip/api/index/theme?PageIndex=" + that.PageIndex + "&PageSize=" + that.PageSize,
        method: "get"
      })
        .then(function (res) {
          // sucess callback
          if (res.data.code == 100000) {
            let data = res.data.object[0].data;
            if (isEmpty) {
              that.lists = [];
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              if (data === null) {
                that.showloading = false;
                that.toastshow = true;
                that.scrollerStatus.pullupStatus = "disabled"; // 禁用下拉
                return
              }
            }
            for (let i = 0; i < data.length; i++) {
              that.lists.push(data[i].img);
            }
            that.isShow = true;
            that.showloading = false;
            if (!isEmpty && data) {
              that.scrollerStatus.pullupStatus = "default";
              that.$nextTick(() => {
                that.$refs.scroller.reset()
              })
            }
          }
        }).catch(function (err) {
        // error callback
        that.isShow = false;
      })
    },
    selPullUp () {
      this.PageIndex++;
      this.getNewsList();
    },
    go(params){
      this.$router.push({path: 'area', query: {plan: params}});
    },
  },
  mounted:function () {
    //分页第一次加载
    this.getNewsList(true);
    this.$nextTick(() => {
      this.$refs.scroller.reset();
    });
      //   第一部分接口
      let that=this;
      this.$ajax({
        url:"http://huijuquanqiu.vip/api/index/indexTop",//Down// theme
        method:"post",
      })
        .then(function(res){
            if(res.data.code==100000){
              for(let i=0,len=res.data.object[0].banner.length;i<len;i++){
                let banner={url:res.data.object[0].banner[i].content,img:res.data.object[0].banner[i].img};
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
        url:"http://huijuquanqiu.vip/api/index/indexDown",//Down// theme
        method:"post",
      })
        .then(function (res) {
          if(res.data.code==100000){
              //活动页数据
            that.activity=res.data.object[0].activity;
            //活动商品数据
              that.goods=res.data.object[0].goods;
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
          }
        })
        .catch(function(err){
          console.log(err);
        });
    },


  });

</script>

<style scoped>
  @import "../assets/css/index.css";
</style>
