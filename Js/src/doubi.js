let originBody = $request.body;

let resultBody = JSON.parse(originBody);

let fakedata = {
    deviceId: "ce6cf588b3e088a7ab6b45b17cc525bc4ec0f5bcf334d9a51559993328f6ab10",
    deviceName: "DESKTOP-JH0L3JT",
    embeddedBrowserVersion: "CEF:104.0.0.0:1.5.0.6",
    enableVdiMarkerExists: false,
    isOsUserAccountInDomain: false,
    isVirtualEnvironment: false,
    osName: "WINDOWS_64",
    osUserId: "44bd7ae60f478fae1061e11a7739f4b94d1daf917982d33b6fc8a01a63f89c21",
    osVersion: "10.0.19045.1"
}

Object.assign(resultBody.deviceDetails, fakedata);

$done({ body: JSON.stringify(resultBody) })