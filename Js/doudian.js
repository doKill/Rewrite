
function modifyResponse (body) {
    let jsonBody;
    try {
        jsonBody = JSON.parse(body);
    } catch (e) {
        console.error("Response body is not valid JSON:", e);
        return body;
    }

    if (!jsonBody?.data || !Array.isArray(jsonBody.data)) {
        return JSON.stringify(jsonBody);
    }

    jsonBody.data.forEach(dataItem => {
        if (!dataItem.product_item || !Array.isArray(dataItem.product_item)) {
            return;
        }

        dataItem.product_item.forEach(productItem => {
            // 获取authorText，如果不存在则为空字符串
            const authorText = productItem.properties?.find(prop => prop.key === 'author')?.text || '';

            const { province: { name: provinceName } = {}, city: { name: cityName } = {} } = productItem.receiver_info?.post_addr || {};

            productItem.policy_info = [
                {
                    "ins_policy_no": "10202508012230091012319241166",
                    "policy_type": "returnfreight2020v1",
                    "policy_type_text": "地址",
                    "status": 1,
                    "status_desc": "待生效",
                    "detail_url": "",
                    "policy_detail_text": `111${provinceName}${cityName}`
                }
            ];


            productItem.privilege_info_list = [
                {
                    "privilege_code": "returnfreight2020v1",
                    "privilege_name": "地址",
                    "status": 1,
                    "status_desc": `222${provinceName}${cityName}`,
                    "detail_url": "",
                    "ins_policy_no": "10202508020002391456406570203"
                }
            ];



            if (!productItem.tags || !Array.isArray(productItem.tags)) {
                return; // 跳过没有tags的ProductItem
            }

            productItem.tags = productItem.tags
                .filter(tag => {
                    const key = tag.key;
                    return typeof key === 'string' && !key.includes('_label') && !key.includes('delay_send');
                })
                .map(tag => {
                    if (tag.key && typeof tag.key === 'string' && tag.key.includes('biz_alliance')) {
                        tag.hover_text = (typeof tag.hover_text === 'string' ? tag.hover_text : '') + `---「${authorText}」`;
                    }
                    return tag;
                });
        });
    });

    return JSON.stringify(jsonBody);
}

function onResponseBody (response) {
    let res = {}
    try {
        res = modifyResponse(response);
    } catch (e) {
        console.error("Script error:", e);
    }
    return res
}

$done({ body: onResponseBody($response.body) });