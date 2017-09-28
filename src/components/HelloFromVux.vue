<template>
  <div>
    <!--<div class="vux-demo">-->
      <!--<img class="logo" src="../assets/vux_logo.png">-->
      <!--<h1> </h1>-->
    <!--</div>-->
    <!--<group title="cell demo">-->
      <!--<cell title="VUX" value="cool" is-link></cell>-->
    <!--</group>-->

    <!--<group>-->
      <!--<x-address  title="title"  :list="addressData"  placeholder="请选择地址" inline-desc="可以设置placeholder" ></x-address>-->

    <!--</group>-->
    <div style="background-color: yellow;height: 66.7rem;width: 75rem"></div>
  </div>
</template>

<script>
import { Group, Cell, Popup , XAddress, ChinaAddressV4Data, XButton,  Value2nameFilter as value2name} from 'vux'

export default {
  components: {
    Group,
    XAddress,
    XButton,
    Cell,
    Popup
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      popup2:false,
      addressData: ChinaAddressV4Data,
    }
  },
  created:function () {

  },
  method: {
    getName (value) {
      return value2name(value, ChinaAddressV4Data)
    },
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
