const record = { "host": "me.debug", "ips": ["192.168.50.247"], "ttl": 10 };
const message = {
    action: "dns_update_cache",
    content: record
};


$configuration.sendMessage(message).then(resolve => {
    if (resolve.error) {
        console.log(resolve.error);
    }
    if (resolve.ret) {
        let output = JSON.stringify(resolve.ret);
        console.log(output);
    }
    $done();
}, reject => {
    // Normally will never happen.
    $done();
});