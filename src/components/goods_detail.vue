<template>
  <div id="goods_detail" v-title data-title="商品详情">
      <div class="banner">
          <swiper :list="baseList" auto loop  :aspect-ratio="750/750" :show-dots="true" :show-desc-mask="false" ></swiper>
      </div>
      <div class="product" v-if="pro_data">
          <p class="price"><span>¥ {{real_price}}</span></p>
          <p class="product_title"><span>{{pro_data.product_title}}</span></p>
          <p class="flag"><img :src="pro_data.flag"><span>{{pro_data.product_area}}</span></p>
      </div>
      <group  label-width="4.5em" label-margin-right="0em" >
        <cell title="规格" :value="current_sku" is-link value-align="left" @click.native="sku_show()"></cell>
        <x-address title="配送至" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
        <cell title="运费" :value="pro_data.mod.more_fee"  value-align="left" v-if="pro_data"></cell>
        <cell title="说明" value=""  is-link value-align="left" @click.native="declare_show()"><span v-for="i in other" style="margin-right: 0.1rem;"><span style="color:#FFCC00;margin-right: 0.05rem;">·</span>{{i.name}}</span></cell>
      </group>
    <div class="pro_desc">
        <div v-for="src in list">
          <x-img  default-src="http://www.huijuquanqiu.vip/webAPP/img_loading.jpg" :src="src" :offset="-100" ></x-img>
        </div>
    </div>
    <div class="buy">
        <div class="cart_icon" @click="cart_list()"></div>
        <div class="add" @click="add_cart()">加入购物车</div>
        <div class="buy_now" @click="buy_now()">立即购买</div>
    </div>
    <div class="modal" v-show="spec_show" @click="spec_show=false">
        <!--sku黑色遮罩-->
    </div>
    <div class="modal" v-show="explain_show" @click="explain_show=false">
      <!--说明黑色遮罩-->
    </div>
    <!--弹窗sku-->
    <transition name="fadeInUp">
      <div class="con" v-show="spec_show" >
        <div class="sku" v-if="pro_data">
            <div class="thumb"><img :src="pro_data.pic[0]"></div>
            <div class="thumb_r">
                <p class="price"><span>¥ {{current_price}}</span></p>
                <p class="store"><span>库存: {{stock}}</span></p>
            </div>
            <div style="clear: both"></div>
            <p class="sku_detail"><span>规格</span></p>
            <div class="sku_button">
                <button v-for="(i,index) in sku" :class="{active:index==X}" @click="choose(index)" ref="current">{{i}}</button>
            </div>
          <p class="sku_num"><span>数量</span></p>
          <div class="number">
            <a href="#" class="down" @click.prevent="reduce()"><img src="../assets/img/-.png" ></a>
            <input type="number" pattern="[0-9]*"  v-model="count" class="num">
            <a href="#" class="up" @click.prevent="increase()"><img src="../assets/img/+.png" ></a>
          </div>
        </div>
        <div class="sure"><button @click="confirm()" :status="status">确 定</button></div>
      </div>
    </transition>
    <!--弹窗  说明部分-->
    <transition name="fadeInUp">
      <div class="con" v-show="explain_show" >
          <div class="explain">
                <span class="pro_explain">商品说明</span>
                <a href="#" class="close" @click.prevent="close()"><img src="../assets/img/delete_grey.png"></a>
          </div>
          <div class="tag_box">
              <div class="tag" v-for="i in other">
                  <p class="tag_title"><span>{{i.name}}</span></p>
                  <p class="tag_con"><span>{{i.content}}</span></p>
              </div>
          </div>
      </div>
    </transition>
    <!--Toast组件弹窗-->
    <toast v-model="isShow" :text="text" type="text" :is-show-mask=false position="bottom" width="2.6rem" ></toast>
    <!--<toast v-model="isNull" :text="text" type="text" :is-show-mask=false position="bottom" width="4rem"></toast>-->
  </div>
</template>

<script>
  import {Swiper,SwiperItem,Group,XAddress,ChinaAddressData,Cell,XNumber,XImg,Toast} from "vux";
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import qs from "qs";
  export default {
    name:"goods_detail",
    components:{Swiper,SwiperItem,Group,XAddress,ChinaAddressData,Cell,XNumber,XImg,Toast},
    data(){
        return {
//          title:"",
          text:'',//toast弹窗内容
          isShow:false,
//          isNull:false,
          count:1,//规格中默认的数量
          X:0,//规格中默认的第一个选项索引
          current_sku:"",//当前选中的规格
          spec_id:null,//当前选中的规格ID
          real_price:"",//弹窗外的价格显示
          current_price:"",//弹窗里面当前选中的价格
          status:0,//规格弹窗中的确定按钮，0表示确认规格，1表示确认加入购物车，2表示确认购买
          spec_show:false,//是否显示规格弹窗
          explain_show:false,//是否显示说明弹窗
          pro_data:null,//商品所有的数据
          sku:[],//规格的数据源
          stock:"",//库存
          pro_id:null,//商品id
          addressData: ChinaAddressData,//地域选择数据源
          addressValue: ['浙江省', '杭州市', '西湖区'],//默认显示的地域
          other:[],//商品说明
          baseList:[],//商品轮播图数据
          list: []//商品详情长图
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
          that.$router.push('../login');
        }
      },
    },
    methods:{
        //规格的弹窗显示
        sku_show(){
            this.spec_show=!this.spec_show;
            this.status=0;
        },
        //规格中减少商品数量1
        reduce(){
            this.count<=1?this.count:this.count--;
        },
        //规格中增加商品数量
        increase(){
            this.count++;
        },
        //规格种类切换
        choose(index){
          this.X=index;
          this.current_price=this.pro_data.Spec[this.X].price;
          this.spec_id=this.pro_data.Spec[this.X].spec_id;
          this.stock=this.pro_data.Spec[this.X].stock;
      },
      //规格中确定按钮
      confirm(){
            switch (this.status){
              case 0://关闭规格弹窗
                this.current_sku = this.$refs.current[this.X].innerHTML;
                this.real_price=this.pro_data.Spec[this.X].price;
                this.spec_show=false;
                break;
              case 1://加入购物车
                let that=this;
                let data={
                  pro_id:that.pro_id,
                  spec_id:that.spec_id,
                  total:that.count,
                  token_secret:that.token,
//                  from:"wx"
                };
                let form_data=qs.stringify(data);
                this.$ajax({
                  url:"http://www.huijuquanqiu.vip/api/car/add_car",//加入购物车
                  method:"post",
                  data:form_data,
                }).then(function (res) {
                    if(res.data.code==100000){
                      that.spec_show=false;
                      that.isShow=true;
                      that.text="添加成功";
                    }else{
                      that.spec_show=false;
                      that.isShow=true;
                      that.text=res.data.description;
                    }
                }).catch(function (err) {

                });

                break;
              case 2://确认购买
                    if(this.stock-this.count<0){
                        this.spec_show=false;
                        this.text="库存不足";
                        this.isShow=true;
                    }else{
                      this.spec_show=false;
                      this.$router.push({path: "../confirmOrder", query: {count: this.count,pro_id:this.pro_id,spec_id:this.spec_id}});
                    }
            }

      },
      //说明的弹窗显示
      declare_show(){
        this.explain_show=!this.explain_show;
      },
      //说明中的关闭按钮
      close(){
        this.explain_show=!this.explain_show;
      },
      //前往购物车列表
      cart_list(){
          this.$router.push("../cartList");
      },
      //加入购物车
      add_cart(){
        this.spec_show=!this.spec_show;
        this.status=1;
      },
      //立即购买
      buy_now(){
          this.spec_show=!this.spec_show;
          this.status=2;
      },
        getpro(){
//          this.pro_id=window.location.href.split("=")[1];
//          this.pro_id=sessionStorage.getItem("goods_detail");
          this.pro_id=this.$route.params.plan;
          let that=this;
          this.$ajax({
            url:"http://www.huijuquanqiu.vip/api/goods/goodsdetail",//商品详情数据
            method:"get",
            params:{
              pro_id:that.pro_id
            }
          }).then(
              function (res) {
                if(res.data.code==100000){
                  that.pro_data=res.data.object[0].data;
                  for(let i=0,len=that.pro_data.pic.length;i<len;i++){
                    let banner={img:that.pro_data.pic[i]};
                    that.baseList.push(banner);//banner数据
                  }
                  for(let i=0,len=that.pro_data.Spec.length;i<len;i++){
                    that.sku.push(that.pro_data.Spec[i].spec_name);
                  }
                  that.current_sku=that.pro_data.Spec[that.X].spec_name;
                  that.stock=that.pro_data.Spec[that.X].stock;
                  that.spec_id=that.pro_data.Spec[that.X].spec_id;
                  that.real_price=that.pro_data.Spec[that.X].price;
                  that.current_price=that.pro_data.Spec[that.X].price;
                  let noOther=[{name:"无"}];
                  that.other=that.pro_data.other[0]===null? noOther:that.pro_data.other;
                  that.list=that.pro_data.product_desc;
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
      this.getpro();
//      this.$store.dispatch('gettoken');
    },
//    computed:{
//      token(){
//        const that=this;
//        if(that.$store.getters.token){return this.$store.getters.token}
//        else if(sessionStorage.getItem('token')){return sessionStorage.getItem('token')}
//        else {alert('token_error')}
//
//      },
//    },
  }
</script>

<style scoped>
  @import "../assets/css/goods_detail.css";
</style>
