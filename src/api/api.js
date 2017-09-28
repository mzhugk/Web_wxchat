import axios from 'axios';
import qs from 'qs';
export  default {

  /*
   * 获取首页列表信息
   * */
  test:function (cb) {
    axios.get('http://www.huijuquanqiu.vip/api/Index/classfy').then(function (res) {
      cb(res)
    });

  },
  gettoken:function (cb) {
    axios.post('http://huijuquanqiu.vip/api/test/test101').then(function (res) {
      cb(res)
    });

  },
  getorderlist:function (token,type,index,size,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Order/OrderList',qs.stringify({
      'token_secret':token, 'pay_status':type, 'PageIndex':index, 'PageSize':size,'from':'wx'})).then(function (res) {
      cb(res)
    });
  },

  getorderdetail:function (token,order,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Order/orderdetail',qs.stringify({
      'token_secret':token, 'orderno':order,'from':'wx'})).then(function (res) {
      cb(res)
    });
  }
}
