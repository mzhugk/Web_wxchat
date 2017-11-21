<template>
  <div>
    <scroller v-model="scrollerStatus" lock-x  ref="scroller" :bounce="isbounce"
              :use-pullup="showup" :use-pulldown="showdown" :pullup-config="pullup" :pulldown-config="pulldown"  @on-pullup-loading="selPullUp()" @on-pulldown-loading="selPullDown()">
      <div id="china" v-title :data-title="title">
        <div class="img_title"><img :src="img_title"></div>
        <div class="list" v-if="list.length">
          <div class="left">
            <div class="left_1" @click="go(list[0].pro_id,'goods_detail')">
              <!--<router-link :to="{ path: 'goods_detail', query: { plan:list[0].pro_id }}">-->
              <div class="img"><img :src="list[0].product_logo" alt=""></div>
              <div class="text">
                <p>{{list[0].product_title}}</p>
                <div>¥<span> {{list[0].price}}</span></div>
              </div>
              <!--</router-link>-->
            </div>
            <div class="left_2" @click="go(list[1].pro_id,'goods_detail')">
              <!--<router-link :to="{ path: 'goods_detail', query: { plan:list[1].pro_id }}">-->
              <div class="img"><img :src="list[1].product_logo" alt=""></div>
              <div class="text">
                <p>{{list[1].product_title}}</p>
                <div>¥<span> {{list[1].price}}</span></div>
              </div>
              <!--</router-link>-->
            </div>
          </div>
          <div class="right" @click="go(list[2].pro_id,'goods_detail')">
            <!--<router-link :to="{ path: 'goods_detail', query: { plan:list[2].pro_id }}">-->
            <div class="img"><img :src="list[2].product_logo" alt=""></div>
            <div class="r_text">
              <p>{{list[2].product_title}}</p>
              <div>¥<span> {{list[2].price}}</span></div>
            </div>
            <!--</router-link>-->
          </div>
        </div>

        <div class="list_bottom" v-if="list_bottom.length">
          <ul>
            <li class="left_1" v-for="i in list_bottom" @click="go(i.pro_id,'goods_detail')">
              <!--<router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">-->
              <div class="img"><img :src="i.product_logo" alt=""></div>
              <div class="text">
                <p>{{i.product_title}}</p>
                <div class="sku">{{i.spec_name}}</div>
                <div class="price">¥ {{i.price}}</div>
              </div>
              <!--</router-link>-->
            </li>
          </ul>
          <div class="nomore" v-show="noMore"><span>暂无数据</span></div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {Scroller} from 'vux'
  import api from '../api/api'
  import api2 from '../api/commInfo'
  export default {
    name:"area",
    components: {Scroller},
    data () {
      return {
        title:"",
        img_title:"",
        count:"",
        list_total:[],//每页的总数据
        list:[],//前三个数据
        list_bottom:[],
        PageIndex: 0,//页码从第一页开始
        PageSize: 20,//每页显示的条数
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
    mounted () {
      //第一次加载
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    methods: {
      selPullUp(){
        console.log("上拉");
        if (this.list_total.length < this.count) {
          this.PageIndex++;
          this.getarea(this.PageIndex);
        }
      },
      selPullDown(){
        console.log("下拉");
        this.PageIndex=0;
        this.getarea(this.PageIndex);
      },
     go(params,goods_detail){//路由跳转
//          sessionStorage.setItem("goods_detail",params);
          this.$router.push({path: goods_detail,query:{plan:params}});
        },
      getarea(PageIndex){
        let plan=window.location.href.split("=")[1];
//          let plan=sessionStorage.getItem("area");
        let that=this;
        this.$ajax({
          url:"http://www.huijuquanqiu.vip/api/Index/cityDetail",
          method:"get",
          params:{
            class_id:plan,
            PageSize:that.PageSize,
            PageIndex:PageIndex
          }
        }).then(
          function (res) {
            if(res.data.code==100000){
              that.count= res.data.object[0].count;
              that.title=res.data.object[0].data.name;
              that.img_title=res.data.object[0].data.city_image;
              if(that.PageIndex==0){
                that.list_total=[];
                that.list_total=that.list_total.concat(res.data.object[0].data.product);
                that.scrollerStatus.pullupStatus = 'enabled';
                that.scrollerStatus.pulldownStatus = 'default';
                that.noMore=false;
              }else{
                that.list_total=that.list_total.concat(res.data.object[0].data.product);
                that.scrollerStatus.pullupStatus = 'default';
                if(that.list_total.length==that.count){
                    setTimeout(function () {
                      that.scrollerStatus.pullupStatus = 'disabled';
                      that.noMore=true;
                    },100);
                }
              }
              that.list=that.list_total.slice(0,3);
              that.list_bottom=that.list_total.slice(3);
            }
          }
        ).catch(
          function (err) {
            console.log(err);
          }
        );
      }
    },
    activated () {
      this.$refs.scroller.reset()
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
    created:function () {
      this.getarea(this.PageIndex);

    }
  }
</script>
<style lang="less">
  @import "../assets/css/area.css";
</style>
