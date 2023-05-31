async function hello (args) {
    let res = await delay(3000);
    console.log(res);
}

const delay = (time = 2000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(111)
        }, time);
    })
}

hello();


// $request, $response, $notify(title, subtitle, message), console.log(message)
// $request.scheme, $request.method, $request.url, $request.path, $request.headers
// $response.statusCode, $response.headers, $response.body
// const { url, method, scheme, path, headers: reqHeaders } = $request;
// const { statusCode, body, headers: resHeaders } = $response;

console.log(Object.getOwnPropertyNames(globalThis))
$done();