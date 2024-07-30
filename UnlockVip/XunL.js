https://xluser-ssl.xunlei.com/xluser.core.login/v3/getuserinfo url script-response-body https://raw.githubusercontent.com/doKill/Rewrite/master/UnlockVip/XunL.js

hostname = xluser-ssl.xunlei.com


var body = $response.body;
var obj = JSON.parse(body);

var newVipInfo = {
  "viplevel": "5",
  "subtype": "0",
  "viptype": "1",
  "vipexpire": "1",
  "vipmoney": "0",
  "vipname": "年费会员",
  "vipid": "0",
  "vasid": "2",
  "vip": "5",
  "vipDayGrow": "20",
  "vipexpirestr": "永久",
  "viptypestr": "7"
};

obj.data = [newVipInfo];

body = JSON.stringify(obj);
$done({body});
