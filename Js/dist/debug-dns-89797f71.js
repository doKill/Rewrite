var record = {
  "host": "me.debug",
  "ips": ["192.168.50.247"],
  "ttl": 60
};
var message = {
  action: "dns_update_cache",
  content: record
};
$configuration.sendMessage(message).then(function (resolve) {
  if (resolve.error) {
    console.log(resolve.error);
  }
  if (resolve.ret) {
    var output = JSON.stringify(resolve.ret);
    console.log(output);
  }
  $done();
}, function (reject) {
  // Normally will never happen.
  $done();
});
