
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