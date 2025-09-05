const vipData = {
  renewal: false,
  vip_type: "vip",
  vip_label: true,
  vip_remainder_day: 99999999, // Sets remaining VIP days to a huge number
  expires_date: 9999999999999, // Sets an expiration timestamp far in the future
  have_trial: false,
  expires_date_format: "2099-09-09 09:09:09", // A corresponding future date string
  vip_product_id: "96",
};
const rightsData = {
  renewal: true,
  vip_label: true,
  expires_date: 148204937166000,
  expires_date_format: "2099-09-09 09:09:09",
  vip_product_id: "96",
};

function modifyResponse(body) {
  let jsonBody;
  try {
    jsonBody = JSON.parse(body);
  } catch (e) {
    console.error("Response body is not valid JSON:", e);
    return body;
  }

  if (!jsonBody?.data) {
    return JSON.stringify(jsonBody);
  }

  jsonBody.data.vip_info = vipData;
  jsonBody.data.rights = rightsData;

  return JSON.stringify(jsonBody);
}

function onResponseBody(response) {
  try {
    return modifyResponse(response);
  } catch (e) {
    console.error("Script error:", e);
    return response;
  }
}

$done({ body: onResponseBody($response.body) });
