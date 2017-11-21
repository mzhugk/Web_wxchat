<template>
  <div id="app">
    <keep-alive :exclude="['orderDetail','area','area_more','more_goods','column','goods_detail','addAddress','addressList','MyOrder','cartList','person','confirmOrder','login']">
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
    font-size: 0.12rem;
  }
.xs-plugin-pulldown-container,.xs-plugin-pullup-container{
  font-size: 0.24rem;
}
</style>
