var body = $response.body.replace(/Ads from Inoreader/g,``);
body = body.replace(/\u003ERemove/g,``);

$done({ body });
