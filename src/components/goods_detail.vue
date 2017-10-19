<template>
  <div id="goods_detail" v-title data-title="商品详情">
      <div class="banner">
          <swiper :list="baseList" auto loop  :aspect-ratio="750/750" :show-dots="true" :show-desc-mask="false" ></swiper>
      </div>
      <div class="product">
          <p class="price"><span>¥ {{real_price}}</span></p>
          <p class="product_title"><span>{{pro_data.product_title}}</span></p>
          <p class="flag"><img :src="pro_data.flag"><span>{{pro_data.product_area}}</span></p>
      </div>
      <group  label-width="4.5em" label-margin-right="0em">
        <cell title="规格" value="value" is-link value-align="left"><div @click="sku_show()" v-html="current_sku"></div></cell>
        <x-address title="配送至" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
        <cell title="运费" value="value"  value-align="left" >{{pro_data.mod.more_fee}}</cell>
        <cell title="说明" value="value"  is-link value-align="left" ><div @click="declare_show()"><span v-for="i in other" style="margin-right: 0.1rem;"><span style="color:#FFCC00;margin-right: 0.05rem;">·</span>{{i.name}}</span></div></cell>
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
        <div class="sku">
            <div class="thumb"><img :src="pro_data.product_logo"></div>
            <div class="thumb_r">
                <p class="price"><span>¥ {{current_price}}</span></p>
                <p class="store"><span>库存: {{pro_data.Spec[0].stock}}</span></p>
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
        <div class="sure"><button @click="confirm()">确 定</button></div>
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
  </div>
</template>

<script>
  import {Swiper,SwiperItem,Group,XAddress,ChinaAddressData,Cell,XNumber,XImg} from "vux";
  export default {
    name:"goods_detail",
    components:{Swiper,SwiperItem,Group,XAddress,ChinaAddressData,Cell,XNumber,XImg},
    data(){
        return {
//          title:"",
          count:1,//规格中默认的数量
          X:0,//规格中默认的第一个选项索引
          current_sku:"",//当前选中的规格
          real_price:"",//弹窗外的价格显示
          current_price:"",//弹窗里面当前选中的价格
          spec_show:false,//是否显示规格弹窗
          explain_show:false,//是否显示说明弹窗
          pro_data:[],//商品所有的数据
          sku:[],//规格的数据源
          addressData: ChinaAddressData,//地域选择数据源
          addressValue: ['浙江省', '杭州市', '西湖区'],//默认显示的地域
          other:[],//商品说明
          baseList:[],//商品轮播图数据
          list: []//商品详情长图
        }
    },
    methods:{
        //规格的弹窗显示
        sku_show(){
            this.spec_show=!this.spec_show;
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
      },
      //规格中确定按钮
      confirm(){
        this.current_sku = this.$refs.current[this.X].innerHTML;
        this.real_price=this.pro_data.Spec[this.X].price;
        this.spec_show=false;
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

      },
      //加入购物车
      add_cart(){
        this.spec_show=!this.spec_show;
      },
      //立即购买
      buy_now(){
        this.spec_show=!this.spec_show;
      },
        getpro(){
          let plan=window.location.href.split("=")[1];
          let that=this;
          this.$ajax({
            url:"http://www.huijuquanqiu.vip/api/goods/goodsdetail",//地域分类中的商品数据
            method:"get",
            params:{
              pro_id:plan,
              PageSize:1000
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
    }
  }
</script>

<style scoped>
  @import "../assets/css/goods_detail.css";
</style>
