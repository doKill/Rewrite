const creditsData = {
  count: 9999999,
};
const free_creditsData = {
  ai_video_remaining_count: 9999999,
  ai_video_total_count: 9999999,
  expires_time: 9999999999999,
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

  jsonBody.data.credits = creditsData;
  jsonBody.data.free_credits = free_creditsData;

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
