<template>
  <div class="preson" v-title data-title="个人中心">

  </div>
</template>

<script>
  import api from '../api/api'
  import { Timeline, TimelineItem, XButton } from 'vux'
  export default {
    name: 'preson',

    components: {

    },
    data () {
      return {

      }
    },
    watch:{

    },

    computed:{
      token(){
        const that=this;

        if(that.$store.getters.token){return that.$store.getters.token}
        else if(sessionStorage.getItem('token')){return sessionStorage.getItem('token')}
        else {alert('token_error')};

      },


    },

    created:function () {

    },
    methods:{
      init(){

      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
