<template>
  <scroller v-model="scrollerStatus" lock-x  ref="scroller" :bounce="isbounce"
            :use-pullup="showup" :use-pulldown="showdown" :pullup-config="pullup" :pulldown-config="pulldown"  @on-pullup-loading="selPullUp()" @on-pulldown-loading="selPullDown()">
    <div id="column" >
        <div class="column_title" v-if="obj"><img :src="obj.img"></div>
        <div class="column_text" v-if="obj">
            <p class="top"><span>{{obj.title}}</span></p>
            <p class="intro"><span>{{obj.content}}</span></p>
        </div>
        <div style="height:0.2rem;background-color: #F2F2F2"></div>
        <!--<more_goods :obj_product="obj_product"></more_goods>-->

        <!--专题推荐的商品-->
        <div v-if="obj_product">
          <div style="padding: 0 0.3rem;box-sizing: border-box;">
              <div class="good" v-for="i in obj_product" @click="go(i.pro_id,'goods_detail')">
                <!--<router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">-->
                <img :src="i.product_logo" alt="">
                <p class="pro_title">{{i.product_title}}</p>
                <p class="price">¥ {{i.product_price}}</p>
                <!--</router-link>-->
              </div>
          </div>
        </div>
        <div class="nomore" v-show="noMore"><span>暂无数据</span></div>
    </div>
  </scroller>

</template>

<script>
  import more_goods from "./more_goods.vue"
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import {Scroller} from 'vux'
  export default {
    name:"column",
    components: {
      more_goods,Scroller
    },
    data(){
        return {
          PageIndex:0,
          PageSize:20,
          count:"",
          obj:[],
          obj_product:[],
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
      go(params,goods_detail){//路由跳转
//      sessionStorage.setItem("goods_detail",params);
//      this.$router.push({path: goods_detail,query:{plan:params}});
        this.$router.push({ path: "../"+goods_detail+"/"+params,params: { plan:params}});
      },
      selPullUp(){
        console.log("上拉");
        if (this.obj_product.length < this.count) {
          this.PageIndex++;
          this.getcolumn(this.PageIndex);
        }
      },
      selPullDown(){
        console.log("下拉");
        this.PageIndex=0;
        this.getcolumn(this.PageIndex);
      },
      getcolumn(PageIndex){
//          let plan=window.location.href.split("=")[1];
//        let plan=sessionStorage.getItem("column");
        let plan=this.$route.params.plan;
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
                  that.obj=res.data.object[0].data;
                  if(that.PageIndex==0){
                    that.obj_product=[];
                    that.obj_product=that.obj_product.concat(res.data.object[0].data.product);
                      that.scrollerStatus.pullupStatus = 'enabled';
                      that.scrollerStatus.pulldownStatus = 'default';
                      that.noMore=false;
                      if(that.obj_product.length==that.count){
                        setTimeout(function () {
                          that.scrollerStatus.pullupStatus = 'disabled';
                          that.noMore=true;
                        },500)

                      }
                  }else{
                    that.obj_product=that.obj_product.concat(res.data.object[0].data.product);
                    that.scrollerStatus.pullupStatus = 'default';
                    if(that.obj_product.length==that.count){
                        setTimeout(function () {
                          that.scrollerStatus.pullupStatus = 'disabled';
                          that.noMore=true;
                        },500)

                    }
                  }
                }
              }
          ).catch(
              function (err) {
                console.log(err);
              }
          );
        }

    },
    mounted () {
      //第一次加载
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    activated () {
      this.$refs.scroller.reset()
    },
    created:function () {
      this.getcolumn(this.PageIndex);
    }
  }
</script>

<style scoped>
  @import "../assets/css/column.css";
</style>
