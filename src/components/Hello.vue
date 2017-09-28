<template>
  <div class="hello">
    <address-list></address-list>


    <div >hello-----
      {{helloData}}
    </div>
  </div>
</template>

<script>
  import address from './address.vue'
export default {
  name: 'hello',
  components:{
    addressList:address
  },
  computed:{
    helloData(){return this.$store.getters.testgetter},
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
