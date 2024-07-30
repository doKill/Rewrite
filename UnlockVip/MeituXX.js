[rewrite_local]
^https:\/\/api\.xiuxiu\.meitu\.com\/v\d url script-response-body https://raw.githubusercontent.com/doKill/Rewrite/master/UnlockVip/MeituXX.js
[mitm] 
hostname = api.xiuxiu.meitu.com


var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const vip = '/vip';


if (url.indexOf(vip) != -1) {
    obj.data.vip_type = 1;
    obj.data.sub_biz_type = 1;
    obj.data.is_valid_user = 1;
    obj.data.expire_days = 8888888888;
    obj.data.exchange_vip = 1;
    obj.data.is_new_vipsub = 1;
    obj.data.home_prompt = "您的会员将于2099/01/01过期。";

    body = JSON.stringify(obj);
}


$done({body});
