<template>
  <div id="app">
    <keep-alive :exclude="['orderDetail','area','area_more','more_goods','column','goods_detail']">
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">

/*body {*/
  /*background-color: #fbf9fe;*/
/*}*/
html,body,#app{
    width: 100%;
    height: 100%;
  }

</style>
