<template>
  <div class="addAddress" v-title data-title="编辑收货地址">
  <div style="height: 0.2rem"></div>
    <group v-if="editData" >
      <x-input title="姓名" v-model="editData.shr_name" placeholder="请输入姓名" is-type="china-name"></x-input>
      <x-input title="手机" v-model="editData.shr_tel" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
      <x-address title="所在区域" v-model="addressValue" raw-value :list="addressData"  placeholder="请选择"></x-address>
      <!--<cell title="value值" :value="addressValue"></cell>-->
      <!--<cell title="转换成文字值" :value="getName(addressValue)"></cell>-->

      <x-input title="详细地址"  placeholder="请输入详细地址" v-model="editData.shr_address"></x-input>
      <x-input title="邮编" keyboard="number"  placeholder="请输入邮政编码" :min="6" :max="6" v-model="editData.code"></x-input>

    </group>
    <div v-if="addORedit" class="def_click" @click="defaultChange">

      <img src="../assets/img/selected.png" alt="" v-show="is_default==1">
      <img src="../assets/img/unselected.png" alt="" v-show="is_default!=1">
      <span style="font-size: 0.32rem">设为默认</span>
    </div>
    <div class="btn" @click="addressInfo()">保存</div>

  </div>
</template>

<script>
  import api from '../api/api'
  import cityList from '../assets/js/cityList.json'
  import { XInput, Group, XButton, Cell ,XAddress,Value2nameFilter as value2name} from 'vux'

  export default {
    name: 'addAddress',

    components: {
      XInput,
      XButton,
      Group,
      Cell,
      XAddress,
    },
    data () {
      return {
        addressData: cityList,
        addressValue:[],
        editData:{shr_name:'',shr_tel:'',shr_address:'',code:'',address_id:false},
        addORedit:false,
        is_default:false,
      }
    },
    watch:{
      editData(){
//        console.log(1)
      },deep:true,
      addressValue(){
//        console.log(2)
      },deep:true,
    },
    computed:{
      token(){
        const that=this;

        if(that.$store.getters.token){return that.$store.getters.token}
        else if(sessionStorage.getItem('token')){return sessionStorage.getItem('token')}
        else {alert('token_error')};

      },
//      editData(){
//        const that=this;
//        let data=that.$store.getters.getEditData;
//        return data;
//        if(that.$store.getters.getEditData){
//          let data=that.$store.getters.getEditData;
//          that.addressValue=[data.shr_province,data.shr_city,data.shr_area]
//          this.$store.dispatch('setEditData',false)
//          return data}
//      }
    },

    created:function () {
      this.initData();
    },
    methods:{
      getName (value) {
        return value2name(value, cityList)
      },
      initData(){
        const that=this;
        let data=that.$store.getters.getEditData;

        if(data){
          that.editData=data;
          that.addORedit=true;
          console.log('bianjishuju',data);
          if(data.is_default==1){
            that.is_default=true;
          }else {
            that.is_default=false;
          }
          that.addressValue=[data.shr_province,data.shr_city,data.shr_area]
          that.$store.dispatch('setEditData',false)
          }
      },
      defaultChange(){
        const that=this;
        that.is_default=!that.is_default;
      },
      addressInfo(){
        const that=this;
        let flag=that.addORedit;
//
        if(flag){
          let  flag;
          if(that.is_default){
            flag=1;
          }else {
            flag=0;
          }
          api.editAddress(that.token,that.editData,flag,function (res) {
            if(res.data.code==100000){
              window.history.back()
            }
          })
        }else {
          let addressValue=that.getName(that.addressValue);
          addressValue=addressValue.split(' ');
          console.log(addressValue)
          api.addAddress(that.token,that.editData,addressValue,function (res) {
            if(res.data.code==100000){
              window.history.back()
            }
          })
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addAddress{
    width: 100%;
    height: 100%;
    background-color: rgb(247,247,247);
    color: #666666;
  }
  .btn{
    width: 6.9rem;
    height: 0.9rem;
    background-color: rgba(39, 218, 188, 1);
    border-radius: 0.1rem;
    margin: auto;
    font-size: 0.34rem;
    line-height: 0.9rem;
    text-align: center;
    color: white;
  }
  .def_click{
    width: 6.9rem;
    height: 0.9rem;
    margin: auto;
    display: flex;
    align-items: center;
  }
  .def_click img{
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.2rem;
  }
</style>
