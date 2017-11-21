<template>
  <div class="addressList" v-title data-title="收货地址">

    <div v-if="isNull==0" v-for="(item,index) in listData":key="index" @click="EditAddressData(item)">
      <div class="item_line"></div>
      <swipeout >
        <swipeout-item class="address_item" transition-mode="follow" >
          <div slot="right-menu">
            <swipeout-button background-color="rgba(39, 218, 188, 1)"  @click.native.stop="defBtnClick(item)">设为<br>默认</swipeout-button>
            <swipeout-button type="warn" @click.native.stop="delBtnClick(item)">删除<br>地址</swipeout-button>
          </div>
          <div slot="content" class="item_con rt" style="font-size: 5px">
            <img src="../assets/img/selected.png" alt="" v-show="item.is_default==1">
            <img src="../assets/img/unselected.png" alt="" v-show="item.is_default!=1">
            <div class="item_box">
              <div>
              <div class="shr_name">{{item.shr_name}}</div>
              <div class="shr_phone">{{item.shr_tel}}</div>
              <div class="shr_area">
                <span v-show="item.is_default==1" style="color: #27dabc;">[默认]</span>
                {{item.shr_province}}  {{item.shr_city}}  {{item.shr_area}}  {{item.shr_address}}</div>
              </div>
            </div>
          </div>
        </swipeout-item>
      </swipeout>


    </div>
    <div v-if="isNull==1">

    </div>



    <div class="bottom_bar" @click="goEditAddress">+  新增收货地址</div>
  </div>
</template>

<script>
  import api from '../api/api'
  import api2 from '../api/commInfo'
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
  export default {
    name: 'addressList',
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    data () {
      return {
        listData:false,
        isNull:1,
      }
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
      selFlag(){
        const that=this;
        let query=location.href;
        if(query.split('?')[1]){
        query=query.split('?')[1];

        return query.split('=')[1]}else {
          return false
        }

      }

    },
    created:function () {
     this.getAddressData();
    },
    methods:{
      getAddressData(){
        const that=this;
        api.getAddressList(that.token,function (res) {
          console.log('地址列表数据',res);
          if(res.data.code==100000){
            that.listData=res.data.object[0].data;
            that.isNull=res.data.object[0].isnull;
          }
        });
      },
      defBtnClick(item){
        const that=this;
        api.defAddress(that.token,item,function (res) {
          console.log('设置默认地址返回数据',res);
          if(res.data.code==100000){
            that.getAddressData();
          }
        })
      },
      delBtnClick(item){
        const that=this;
        api.delAddress(that.token,item.address_id,function (res) {
          console.log('删除返回数据',res);
          if(res.data.code==100000){
            that.getAddressData();
          }
        })
      },
      goEditAddress(){
        this.$router.push('/addAddress');
      },
      EditAddressData(item){
        if(this.selFlag=='e'){
        this.$store.dispatch('setEditData',item);
        this.$router.push('/addAddress');
        }else {
          this.$store.dispatch('selAddressInfo',item);
          this.$router.go(-1)
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .addressList{
   width: 100%;
   height: 100%;
   background-color: rgb(247,247,247);
   position: relative;
   padding-bottom: 1rem;
   box-sizing: border-box;
 }
  .bottom_bar{
    width: 100%;
    height: 1rem;
    background-color: rgba(39, 218, 188, 1);
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 0.32rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .address_item{
    width: 100%;
    height: 1.66rem;
    background-color: white;
  }
  .item_line{
    width: 100%;
    height: 0.2rem;
  }
  .item_con{
    width: 100%;
    height: 1.66rem;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: #666666;
  }
  .item_con img{
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.2rem;

  }
  .item_box{
    height: 1.26rem;
    width: 6.05rem;
    display: flex;
    align-items: center;
  }
  .shr_name{
    width: 100%;
    height: 0.24rem;
    font-size: 0.26rem;
    line-height: 0.24rem;
  }
 .shr_phone{
   width: 100%;
   height: 0.49rem;
   font-size: 0.26rem;
   line-height: 0.49rem;
 }
  .shr_area{
    width: 100%;
    height: 0.52rem;
    font-size: 0.26rem;
    line-height: 0.26rem;
    overflow: hidden;
  }
</style>
