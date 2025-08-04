
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


        // 列表显示收货地址省市
        const { receiver_info } = dataItem;
        const {
            post_addr: {
                province: { name: provinceName = '' } = {},
                city: { name: cityName = '' } = {},
                town: { name: townName = '' } = {},
                street: { name: streetName = '' } = {},
            } = {}
        } = receiver_info || {};

        dataItem.policy_info = (dataItem.policy_info || []).map(item => {
            return Object.assign(item, {
                policy_type_text: provinceName,
                status_desc: cityName,
                policy_detail_text: `${townName}${streetName ? '-' + streetName : ''}`
            })
        });


        // 列表只显示订单来源，若为联盟订单则展示达人信息
        dataItem.product_item.forEach(productItem => {
            // 获取authorText，如果不存在则为空字符串
            const authorText = productItem.properties?.find(prop => prop.key === 'author')?.text || '';

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
    try {
        return modifyResponse(response);
    } catch (e) {
        console.error("Script error:", e);
        return response;
    }
}

$done({ body: onResponseBody($response.body) });