<template>
  <div id="china" v-title :data-title="title">
      <div class="img_title"><img :src="img_title"></div>
      <div class="list">
          <div class="left">
              <div class="left_1">
                <div class="img"><img :src="list[0].product_logo" alt=""></div>
                <div class="text">
                  <p>{{list[0].product_title}}</p>
                  <div>¥<span> {{list[0].price}}</span></div>
                </div>
              </div>
              <div class="left_2">
                <div class="img"><img :src="list[1].product_logo" alt=""></div>
                <div class="text">
                  <p>{{list[1].product_title}}</p>
                  <div>¥<span> {{list[1].price}}</span></div>
                </div>
              </div>
          </div>
          <div class="right">
            <div class="img"><img :src="list[2].product_logo" alt=""></div>
            <div class="r_text">
              <p>{{list[2].product_title}}</p>
              <div>¥<span> {{list[2].price}}</span></div>
            </div>
          </div>
      </div>
      <div class="list_bottom">
        <ul>
          <li class="left_1" v-for="i in list_bottom">
              <div class="img"><img :src="i.product_logo" alt=""></div>
              <div class="text">
                <p>{{i.product_title}}</p>
                <div class="sku">{{i.spec_name}}</div>
                <div class="price">¥ {{i.price}}</div>
              </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  export default {
    name:"area",
    data(){
        return {
          title:"",
          img_title:"",
          list:[],
          list_bottom:[]
        }
    },
    methods:{
        getarea(){
          let plan=window.location.href.split("=")[1];
          let that=this;
          this.$ajax({
            url:"http://www.huijuquanqiu.vip/api/Index/cityDetail",
            method:"get",
            params:{
              class_id:plan,
              PageSize:1000
            }
          }).then(
              function (res) {
                if(res.data.code==100000){
                  that.title=res.data.object[0].data.name;
                  that.img_title=res.data.object[0].data.city_image;
                  that.list=res.data.object[0].data.product.slice(0,3);
                  that.list_bottom=res.data.object[0].data.product.slice(3);
                }
              }
          ).catch(
              function (err) {
                console.log(err);
              }
          );
        }

    },
    mounted:function () {
      this.getarea();
    }
  }
</script>

<style scoped>
  @import "../assets/css/area.css";
</style>
