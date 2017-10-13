<template>
  <div class="my-order" v-title data-title="我的订单">

    <tab style="height: 5.3%;" :line-width=3 active-color='#27dabc' v-model="tabIndex" custom-bar-width="40px">
      <tab-item style="display: flex;align-items: center;justify-content: center" v-for="(item,index) in tabData":key='index' @on-item-click="tabClick(index)">{{item}}</tab-item>
    </tab>

    <scroller lock-x scrollbar-y height="94.7%"   @on-scroll-bottom="onListBottom" ref="listBottom" :scroll-bottom-offst="200">
      <div  >
      <goods-items v-for="(item,index) in orderData":key="index" :itemData.sync="item" v-if="!listIsNull">

      </goods-items>


        <div style="height: 0.3rem" v-if="!listIsNull"></div>
        <div v-if="listIsNull" >
        无
        </div>
      </div>

    </scroller>
  </div>
</template>

<script>
  import api from '../api/api'
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
        tabData:['待收货','待发货','代付款','全部'],
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
      //测试token获取
      this.$store.dispatch('gettoken');

    },
    computed:{
      token(){
        const that=this;

        if(that.$store.getters.token){return this.$store.getters.token}
        else if(sessionStorage.getItem('token')){return sessionStorage.getItem('token')}
        else {alert('token_error')};

      },
    },
    methods:{
      tabClick:function (type) {
        this.pageIndex=0;
        this.orderData=[];
        this.isNull=false;
        this.listIsNull=true;
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
          console.log(res)
        })
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
