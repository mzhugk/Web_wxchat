<template>
  <div id="china" v-title :data-title="title">
    <toast v-model="isShow" text="小主，不要再拉了╮(╯_╰)╭" type="text" :is-show-mask=true position="bottom" width="7.5rem"></toast>
    <pull-to :top-load-method="refresh" :bottom-load-method="loading_more" :top-config="{triggerDistance: 50}" :bottom-config="{triggerDistance: 50} ">
      <div class="img_title"><img :src="img_title"></div>
      <div class="list">
          <div class="left">
                <div class="left_1">
                  <router-link :to="{ path: 'goods_detail', query: { plan:list[0].pro_id }}">
                    <div class="img"><img :src="list[0].product_logo" alt=""></div>
                    <div class="text">
                      <p>{{list[0].product_title}}</p>
                      <div>¥<span> {{list[0].price}}</span></div>
                    </div>
                  </router-link>
                </div>
                <div class="left_2">
                  <router-link :to="{ path: 'goods_detail', query: { plan:list[1].pro_id }}">
                    <div class="img"><img :src="list[1].product_logo" alt=""></div>
                    <div class="text">
                      <p>{{list[1].product_title}}</p>
                      <div>¥<span> {{list[1].price}}</span></div>
                    </div>
                  </router-link>
                </div>
          </div>
          <div class="right">
            <router-link :to="{ path: 'goods_detail', query: { plan:list[2].pro_id }}">
              <div class="img"><img :src="list[2].product_logo" alt=""></div>
              <div class="r_text">
                <p>{{list[2].product_title}}</p>
                <div>¥<span> {{list[2].price}}</span></div>
              </div>
            </router-link>
          </div>
      </div>
      <div class="list_bottom">
        <ul>
          <li class="left_1" v-for="i in list_bottom">
              <router-link :to="{ path: 'goods_detail', query: { plan:i.pro_id }}">
                  <div class="img"><img :src="i.product_logo" alt=""></div>
                  <div class="text">
                    <p>{{i.product_title}}</p>
                    <div class="sku">{{i.spec_name}}</div>
                    <div class="price">¥ {{i.price}}</div>
                  </div>
              </router-link>
          </li>
        </ul>
      </div>
    </pull-to>
  </div>
</template>

<script>
  import PullTo from 'vue-pull-to'
  import { Toast } from 'vux'
  export default {
    name:"area",
    components: {
      PullTo,Toast
    },
    data(){
        return {
          title:"",
          img_title:"",
          isShow:false,//我是有底线的  toast默认不显示
          PageIndex:0,
          PageSize:20,
          count:"",
          list_total:[],//每页的总数据
          list:[],//前三个数据
          list_bottom:[]
        }
    },
    methods:{
        refresh(loaded){
          setTimeout(() => {
            this.PageIndex=0;
            this.getarea(this.PageIndex);
            loaded('done');
          }, 1500);
        },
        loading_more(loaded){
          setTimeout(() => {
            if (this.list_total.length < this.count) {
              this.PageIndex++;
              this.getarea(this.PageIndex);
            }else{
              this.isShow=true;
            }
            loaded('done');
          }, 1500);
        },
        getarea(PageIndex){
          let plan=window.location.href.split("=")[1];
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
                  if(that.PageIndex==0){
                    that.list_total=[];
                  }else{

                  }
                  that.title=res.data.object[0].data.name;
                  that.img_title=res.data.object[0].data.city_image;
                  that.list_total=that.list_total.concat(res.data.object[0].data.product);
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
    created:function () {
      this.getarea(this.PageIndex);
    }
  }
</script>

<style scoped>
  @import "../assets/css/area.css";
</style>
