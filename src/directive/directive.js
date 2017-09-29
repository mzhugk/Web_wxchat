import Vue from 'vue'
Vue.directive('title', {
  inserted:function (el,binding) {
    document.title = el.dataset.title;
  },
  unbind:function () {
    document.title = '汇聚全球';
  }
});
