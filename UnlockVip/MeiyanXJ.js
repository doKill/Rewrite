[[rewrite_local]

^https:\/\/api\.meiyan\.com\/vip\/user_info\.json url script-response-body https://raw.githubusercontent.com/doKill/Rewrite/master/UnlockVip/MeiyanXJ.js

[mitm] 
hostname = api.meiyan.com


var body = $response.body;
var objk = JSON.parse(body);

objk = {
      "meta": {
            "code": 0,
            "msg": "",
            "error": "",
            "request_uri": "/vip/user_info",
            "reqid": "f0b087dccf252a2cd1bac9f3bb0c17bc"
      },
      "response": {
            "status": 1,
            "agreement_status": 1,
            "agreement_platform": 0,
            "expire_date": "2029-10-15",
            "expire_time": "",
            "period_type": 0,
            "product_type": 0,
            "permission": [],
            "type": 0,
            "ad_vip_type": 0,
            "discount_status": 0
      }
}

body = JSON.stringify(objk);

$done({body});
