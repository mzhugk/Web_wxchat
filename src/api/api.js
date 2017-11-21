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
  get101:function (cb) {
    axios.post('http://huijuquanqiu.vip/api/test/test101').then(function (res) {
      cb(res)
    });

  },
  getorderlist:function (token,type,index,size,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/orderList',qs.stringify({
      'token_secret':token, 'pay_status':type, 'PageIndex':index, 'PageSize':size,'from':'wx'})).then(function (res) {
      cb(res)
    });
  },

  getorderdetail:function (token,orderid,orderno,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/orderdetail',qs.stringify({
      'token_secret':token,'orderid':orderid, 'orderno':orderno,'from':'wx'})).then(function (res) {
      cb(res)
    });
  },
  getorderdetail2:function (token,orderid,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/orderdetail',qs.stringify({
      'token_secret':token,'orderid':orderid,'from':'wx'})).then(function (res) {
      cb(res)
    });
  },
  getAddressData:function (token,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/addresslist',qs.stringify({
      'token_secret':token,'from':'wx'})).then(function (res) {

      cb(res)
    });
  },
  getAddressList:function (token,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/addresslist',qs.stringify({
      'token_secret':token,'from':'wx'})).then(function (res) {
      cb(res)
    });
  },
  getAddressList:function (token,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/addresslist',qs.stringify({
      'token_secret':token,'from':'wx'})).then(function (res) {
      cb(res)
    });
  },
  delAddress:function (token,addressId,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/del_address',qs.stringify({
      'token_secret':token,'address_id':addressId,'from':'wx'})).then(function (res) {
      cb(res)
    })
  },

  //address_id	地址id
  // shr_tel	联系电话
  // shr_name	收货人姓名
  // shr_province	收货人城市
  // shr_city	联系电话
  // shr_area	收货人区
  // shr_address	收货人详细地址
  // code	邮政编码
  // is_default	是否默认
  defAddress:function (token,addressData,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/edit_address',qs.stringify({
      'token_secret':token,'address_id':addressData.address_id,
      'shr_tel':addressData.shr_tel,'shr_name':addressData.shr_name,'shr_province':addressData.shr_province,
      'shr_city':addressData.shr_city,'shr_area':addressData.shr_area,'shr_address':addressData.shr_address,
      'code':addressData.code,'is_default':1, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  editAddress:function (token,addressData,is_default,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/edit_address',qs.stringify({
      'token_secret':token,'address_id':addressData.address_id,
      'shr_tel':addressData.shr_tel,'shr_name':addressData.shr_name,'shr_province':addressData.shr_province,
      'shr_city':addressData.shr_city,'shr_area':addressData.shr_area,'shr_address':addressData.shr_address,
      'code':addressData.code,'is_default':is_default, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  addAddress:function (token,addressData,addressValue,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/add_address',qs.stringify({
      'token_secret':token,
      'shr_tel':addressData.shr_tel,'shr_name':addressData.shr_name,'shr_province':addressValue[0],
      'shr_city':addressValue[1],'shr_area':addressValue[2],'shr_address':addressData.shr_address,
      'code':addressData.code, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //购物车
  cartList:function (token,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/car/carlist',qs.stringify({
      'token_secret':token,
      'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  changeSelect:function (token,bid,selected,type,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/car/change_select',qs.stringify({
      'token_secret':token,'bid':bid,'selected':selected,'type':type,
      'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  delCartItem:function (token,bid,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/car/del_car',qs.stringify({
      'token_secret':token,'bid':bid,
      'from':'wx'})).then(function (res) {
      cb(res)
    })
  },

  changeTotal:function (token,bid,total,cb) {
  axios.post('http://www.huijuquanqiu.vip/api/car/change_total',qs.stringify({
    'token_secret':token,'bid':bid,'total':total,
    'from':'wx'})).then(function (res) {
    cb(res)
  })
},
  //物流
  expressData:function (token,expressno,comtype,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Order/find_express',qs.stringify({
      'token_secret':token,'expressno':expressno,'comtype':comtype,
      'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //个人
  personData:function (token,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/person',qs.stringify({
      'token_secret':token, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //确认订单页面数据

  confirmOrder:function (token,total,pro_id,spec_id,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/confirmOrder',qs.stringify({
      'token_secret':token,'total':total,'pro_id':pro_id,'spec_id':spec_id, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //创建订单
  creatOrder:function (token,total,pro_id,spec_id,address_id,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/createOrder',qs.stringify({
      'token_secret':token,'total':total,'pro_id':pro_id,'spec_id':spec_id,'address_id':address_id, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  findStock:function (orderno,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Pay/find_stock',qs.stringify({
      'orderno':orderno, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //购物车购买
  cartConfirm:function (token,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/carConfirmOrder',qs.stringify({
      'token_secret':token, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  creatCartOrder:function (token,address_id,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/carCreateOrder',qs.stringify({
      'token_secret':token,'address_id':address_id, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //提醒发货

  notice:function (token,orderno,cb) {
  axios.post('http://www.huijuquanqiu.vip/api/Orderv3/notice',qs.stringify({
    'token_secret':token,'orderno':orderno, 'from':'wx'})).then(function (res) {
    cb(res)
  })
},
  //删除订单
  delOrder:function (token,orderid,orderno,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/del_order',qs.stringify({
      'token_secret':token,'orderid':orderid,'orderno':orderno, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //确认收货
  confirmReceive:function (token,orderid,orderno,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/confirm',qs.stringify({
      'token_secret':token,'orderid':orderid,'orderno':orderno, 'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //取消
  cancelOrder:function (token,orderid,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Orderv3/cancel_order',qs.stringify({
      'token_secret':token,'orderid':orderid,'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //物流
  findExpress:function (token,expressno,comtype,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/Order/find_express',qs.stringify({
      'token_secret':token,'expressno':expressno,'comtype':comtype,'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
  //身份证信息修改
  idcardEdit:function (token,id_card,cb) {
    axios.post('http://www.huijuquanqiu.vip/api/User/edit_identity',qs.stringify({
      'token_secret':token,'id_card':id_card,'from':'wx'})).then(function (res) {
      cb(res)
    })
  },
}



