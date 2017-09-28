<template>
  <div class="orderDetail" v-title data-title="待付款">


  </div>
</template>

<script>
  import api from '../api/api'
  export default {
    name: 'orderDetail',
    data () {
      return {

      }
    },
    created:function () {
      api.getorderdetail(this.token,this.orderNum,function (res) {
        console.warn(res)
      });
    },
    computed:{
//      addressData(){return this.$store.getters.testgetter},
      token(){return this.$store.getters.token},
      orderNum(){return this.$store.getters.orderNum},
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .orderDetail{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
