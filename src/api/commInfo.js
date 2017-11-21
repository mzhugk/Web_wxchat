import axios from 'axios';
import qs from 'qs';
export  default {
  setCookie(name, value, days) {

    var d = new Date;

    d.setTime(d.getTime() + 24*60*60*1000*days);

    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();

  },
  delCookie (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    // let cval = getCookie(name);
    // if (cval != null)
    window.document.cookie = name + "=" + "" + ";expires=" + exp.toGMTString();
  },
  getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  },
  wxPay(openid,orderid,that) {
    let obj;
    axios.post('http://huijuquanqiu.vip/api/Wxv2/wxPayPc',qs.stringify({
      "openid":openid,"orderid":orderid,"from":"wx"})).then(function (res) {
      obj=res.data.object[0];
      if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
        if( document.addEventListener ){
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady(obj,that), false);
        }else if (document.attachEvent){
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady(obj,that));
          document.attachEvent('onWeixinJSBridgeReady',onBridgeReady(obj,that));
        }
      }else{
        onBridgeReady(obj,that);
      }
    });
     function onBridgeReady(obj,that){
       // alert(obj.appId);
       // alert(obj.timeStamp)
       // alert(obj.nonceStr)
       // alert(obj.package)
       // alert(obj.paySign)
       let appId=obj.appId.toString();
       let timeStamp=obj.timeStamp.toString();
       let nonceStr=obj.nonceStr.toString();
       let package1=obj.package.toString();
       let paySign=obj.paySign.toString();
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId":appId,     //公众号名称，由商户传入
          "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr":nonceStr, //随机串
          "package":package1,
          "signType":'MD5',         //微信签名方式：
          "paySign":paySign //微信签名
        },
        function(res){

          if(res.err_msg == "get_brand_wcpay_request:ok") {
            alert('支付成功！');
            that.$store.dispatch('setOrderType',1);
            that.$router.push('myorder');
          } else if(res.err_msg == "get_brand_wcpay_request:cancel") {
//              alert(JSON.stringify(res.body.object));
             alert('支付取消！');
          }  else if(res.err_msg == "get_brand_wcpay_request:fail"){
            alert('支付失败！');
          }

          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        }
      );
    }
  },
//   onBridgeReady:function (obj){
//     WeixinJSBridge.invoke(
//       'getBrandWCPayRequest', {
//         "appId":obj.appId,     //公众号名称，由商户传入
//         "timeStamp":obj.timeStamp,         //时间戳，自1970年以来的秒数
//         "nonceStr":obj.nonceStr, //随机串
//         "package":obj.package,
//         "signType":'MD5',         //微信签名方式：
//         "paySign":obj.paySign //微信签名
//       },
//       function(res){
//         if(res.err_msg == "get_brand_wcpay_request:ok" ) {
//
//         } else {
// //              alert(JSON.stringify(res.body.object));
// //              alert('支付失败！');
//
//
//         }   // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//       }
//     );
//   },
}
