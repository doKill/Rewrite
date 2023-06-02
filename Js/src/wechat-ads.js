let { body } = $response;
body = JSON.parse(body)

body.advertisement_num = 0;
body.advertisement_info = [];

$done(JSON.stringify(body))