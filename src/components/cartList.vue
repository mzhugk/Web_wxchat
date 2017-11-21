<template>
  <div class="cartList" v-title data-title="购物车">
      <cart-item v-for="(item,index) in listData":key="index" :itemData.sync="item" :flag.sync="flag"></cart-item>
    <!--<cart-item  :itemData.sync="listData[0]"></cart-item>-->
    <!--<div>{{listData[0].carb[0].total}}</div>-->

    <div class="bottomBar">
      <div class="leftbar lf">
        <div class="allsel_box">
        <img v-show="allselected==1" src="../assets/img/selected.png"  alt="" @click="allSelected()">
        <img v-show="allselected!=1" src="../assets/img/unselected.png"  alt="" @click="allSelected()">
          <span >全选</span>
        </div>
        <div class="total_box">
        <span class="rt" >合计：¥{{totalprice}}</span>
        </div>
      </div>
      <div class="rightbar lf" @click="cartBuy">
        结算({{selTotal}})
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import cartItem from './cartItem.vue'
  export default {
    name: 'cartList',
    components: {
      cartItem
    },
    data () {
      return {
        listData:[],
        isNull:1,
        allselected:1,
        totalprice:0,
        selTotal:0,
        flag:true,
        stockFlag:true,
      }
    },
    watch:{
      listData: {
        handler: function (value) {

          if(this.flag){
         this.init();
          }
        }, deep: true}
    },
    computed:{
      token(){
        const that=this;
        if(api2.getCookie('user_token')){return api2.getCookie('user_token')}
        else {
          let url=window.location.href;
          url=url.split('/#/')[1];
          sessionStorage.setItem('return_url',url);
          that.$router.push('login');
        };
      },

    },
    created:function () {
      this.init();
    },
    methods:{
      init(){
        const that=this;
        api.cartList(this.token,function (res) {

          if(res.data.code=10000){
            that.listData=res.data.object[0].data;
            that.isNull=res.data.object[0].isnull;
            //全选,商品选中数量价格遍历
            let allselflag=1;
            let total=0;
            let price=0;
            for(var i in that.listData){
              if(that.listData[i].shop_selected==0){

                allselflag=0;
              }
              let data=that.listData[i].carb;
              for(var x in data){
                console.log(data[x])
                if(data[x].selected==1){
                  if(parseInt(data[x].stock)<parseInt(data[x].total)){
                    that.stockFlag=false;
                  };
                  total++;
                  price+=(parseFloat(data[x].total)*parseFloat(data[x].price))+parseFloat(data[x].fee);


                }
              }
            };
            if(allselflag==0){
              that.allselected=0;
            }else {
              that.allselected=1;
            }
            that.totalprice=price;
            that.selTotal=total;


            that.flag=false;
          }
        });
      },
      allSelected(){
        const that=this;
        if(that.allselected==1){
          api.changeSelect(that.token,'',0,1,function (res) {
//            that.allselected=0;
            that.init();
          })
        }else {
          api.changeSelect(that.token,'',1,1,function (res) {
//            that.allselected=1;
            that.init();
          })
        }
      },
      cartBuy(){
        this.$router.push('cartConfirm')
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cartList{
  width: 100%;
  height: 100%;
  background-color:rgb(242,242,242);
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 1.2rem;
  box-sizing: border-box;
  position: relative;
}
  .bottomBar{
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;

  }
  .leftbar{
    width: 5.1rem;
    height: 100%;
    background-color: white;

    /*box-sizing: border-box;*/
    display: flex;
    /*align-items: center;*/
  }
  .leftbar .allsel_box{
    width: 2.1rem;
    height: 100%;
    padding-left: 0.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 0.26rem;
    text-indent: 10px;
  }
  .leftbar .total_box{
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.28rem;
    box-sizing: border-box;
  }
  .allsel_box img{
    width: 0.36rem;
    height: 0.36rem;
  }
.total_box span{
  font-size: 0.32rem;
  line-height: 0.36rem;

}
  .rightbar{
    width: 2.4rem;
    height: 100%;
    background-color: rgba(39, 218, 188, 1);
    font-size: 0.34rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
