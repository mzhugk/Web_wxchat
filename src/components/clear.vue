<template>
  <div class="clear" v-title data-title="loading">
  </div>
</template>

<script>
  export default {
    name: 'clear',
    data () {
      return {

      }
    },
    watch:{

    },
    computed:{

    },
    created:function () {
      this.init()
    },
    methods:{
      init(){
        let url=location.href;
        var con = {
          "%2F": "/",
          "%3D": "=",
          "%26": "&",
          "%3F": "?",
        };


        for (var k in con) {
          var p = -1; // 字符出现位置
          var s = 0; // 下一次起始位置
          while((p = url.indexOf(k, s)) > -1) {
            s = p + con[k].length; // 位置 + 值的长度
            url = url.replace(k, con[k]);

          }
        }

        if(url.indexOf('?from=')){
          let clipString=url.split('?from=')[1];
          if(clipString.split('#/')[0]){
            clipString='?from='+clipString.split('#/')[0];

              url=url.split(clipString)[0]+url.split(clipString)[1];
            let redirect=url.split('?redirect=/')[0]+url.split('?redirect=/')[1];
        redirect=redirect.split('clear')[0]+redirect.split('clear')[1];
        window.location.href = redirect;
          }
        }



//
//
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
