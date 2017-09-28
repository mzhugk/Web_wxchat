<template>
  <div id="address">
    <div @click="test">address</div>
    <div @click="test2">test2</div>
    <div @click="test3">test3</div>
    <div>address-------{{addressData}}</div>

  </div>
</template>

<script>
  import api from '../api/api'
  export default {
    name: 'address',
    data () {
      return {

      }
    },
    computed:{
      addressData(){return this.$store.getters.testgetter},
    },
    methods:{
      test:function () {
        api.test(function (res) {
          console.log(res)
        })

      },
      test2:function () {
        const that=this;
        that.$store.commit('testMu',60);
      },
      test3:function () {
        const that=this;
        that.$store.dispatch('testfun');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
