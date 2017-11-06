<template>
  <div id="app">
    <keep-alive :exclude="['orderDetail','addAddress','addressList','cartList']">
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
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
html,body,#app{
    width: 100%;
    height: 100%;
  }

</style>
