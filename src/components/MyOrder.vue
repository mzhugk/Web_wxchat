<template>
  <div class="my-order" v-title data-title="我的订单">
    <tab style="height: 5.3%;" :line-width=3 active-color='#27dabc' v-model="tabIndex" custom-bar-width="40px">
      <tab-item style="display: flex;align-items: center;justify-content: center" v-for="(item,index) in tabData":key='index' @on-item-click="tabClick(index)">{{item}}</tab-item>
    </tab>

    <scroller lock-x scrollbar-y height="94.7%"   @on-scroll-bottom="onListBottom" ref="listBottom" :scroll-bottom-offst="900">
      <div>
        <!--<div style="">-->
        <!--<div style="background-color: yellow;height: 3rem"></div>-->
        <!--<div style="background-color: saddlebrown;height: 6rem"></div>-->
        <!--<div style="background-color: aquamarine;height: 8rem"></div>-->
        <!--<div style="background-color: red;height: 2rem"></div>-->
        <!--</div>-->
        <!--<div v-for="i in 6" style="background-color: seagreen;">{{i}}</div>-->


      <goods-items v-for="(item,index) in orderData":key="index" :itemData.sync="item" v-if="!listIsNull">

      </goods-items>


        <div style="height: 0.3rem" v-if="!listIsNull"></div>
        <div style="width: 100%;height: 100%" v-if="listIsNull" >
          <div style="width: 40%;margin: auto">
          <img style="width: 100%;" src="../assets/img/order_none.png" alt="">
            <div style="width: 100%;text-align: center">您暂时没有订单</div>
          </div>
        </div>
      </div>


    </scroller>
  </div>
</template>

<script>
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import { Tab, TabItem,Scroller } from 'vux'
  import GoodsItems from './GoodsItems.vue'
  export default {
    name: 'my-order',
    components: {
      Tab,
      TabItem,
      Scroller,
      GoodsItems
    },
    data () {
      return {
        data:'',
        tabIndex:0,
        tabData:['待收货','待发货','待付款','全部'],
        pageIndex:0,
        PageSize:10,
        orderData:[],
        listIsNull:true,
        isNull:false,
        listFetching:false,
        typeNum:[3,2,1,4],
      }
    },
    mounted () {

      this.$nextTick(() => {
        this.$refs.listBottom.reset({top: 0})
      })
    },
    created:function () {
      this.initType();
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
        };
      },

    },
    watch:{
      $route(){
        const that=this;
        that.$nextTick(() => {
          this.$refs.listBottom.reset({top: 0})
        })
        that.initType();
        that.orderData=[];
        that.pageIndex=0;
        that.isNull=false;

      },
    },
    methods:{
      initType(){
        const that=this;
        if(that.$store.getters.orderType){
          let query=that.$store.getters.orderType;
          that.tabIndex=query;
        }else {
          that.tabIndex=0;
        }
      },
      tabClick:function (type) {
        this.pageIndex=0;
        this.orderData=[];
        this.isNull=false;
        this.listIsNull=true;
        this.$store.dispatch('setOrderType',type);
        this.$nextTick(() => {
          this.$refs.listBottom.reset({top: 0})
        });
        switch (type){
          case 0:
            this.getOrderList(3);
            break;
          case 1:
            this.getOrderList(2);
            break;
          case 2:
            this.getOrderList(1);
            break;
          case 3:
            this.getOrderList(4);
            break;
        };
      },
      getOrderList:function (type) {
        const  that=this;
        if(that.token){
        api.getorderlist(that.token,type,that.pageIndex,that.PageSize,function (res) {
          if(!that.isNull){
          if(res.data.object[0].isnull==0){
            that.listIsNull=false;
          for(var i=0;i<res.data.object[0].data.length;i++){
            that.orderData.push(res.data.object[0].data[i]);
            that.pageIndex++;
          };
          }else if(res.data.object[0].isnull==1){
            if(that.pageIndex==0){
              that.listIsNull=true;
            }else {
              that.isNull=true;
            }
          }
              }
//          console.log(res)
        })}
      },
      onListBottom () {
        const that=this;
        if (this.listFetching) {
          // do nothing
        } else {
          this.listFetching = true
          setTimeout(() => {
            this.getOrderList(that.typeNum[that.tabIndex]);
            this.$nextTick(() => {
              this.$refs.listBottom.reset()
            });
            this.listFetching = false
          }, 2000)
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-order{
    width: 100%;
    height: 100%;
    background-color: rgba(242, 242, 242, 1);
  }

</style>
