/**
 * Combined script for DreamFace App.
 *
 * This script handles responses from two different endpoints:
 * 1. /user/save_user_login: Modifies user VIP and rights information.
 * 2. /subscribe/get_remaining_credits: Modifies user credit counts.
 *
 * It checks the request URL to determine which modification to apply.
 */

function modifyResponseBody(url, body) {
  let jsonBody;
  try {
    jsonBody = JSON.parse(body);
  } catch (e) {
    console.error("Failed to parse JSON response body:", e);
    // Return original body if parsing fails
    return body;
  }

  // Ensure the 'data' property exists before proceeding
  if (!jsonBody?.data) {
    return JSON.stringify(jsonBody);
  }

  // Logic for the user login endpoint
  if (url.includes("/user/save_user_login")) {
    console.log("Modifying response for /user/save_user_login");
    jsonBody.data.vip_info = {
      renewal: false,
      vip_type: "vip",
      vip_label: true,
      vip_remainder_day: 99999999,
      expires_date: 9999999999999,
      have_trial: false,
      expires_date_format: "2099-09-09 09:09:09",
      vip_product_id: "96",
    };
    jsonBody.data.rights = {
      renewal: true,
      vip_label: true,
      expires_date: 409261854900000,
      expires_date_format: "2099-09-09 09:09:09",
      vip_product_id: "96",
    };
    jsonBody.data.repeat_subscribe = true;
  }
  // Logic for the get credits endpoint
  else if (url.includes("/subscribe/get_remaining_credits")) {
    console.log("Modifying response for /subscribe/get_remaining_credits");
    jsonBody.data.credits = {
      count: 9999999,
    };
    jsonBody.data.free_credits = {
      ai_video_remaining_count: 9999999,
      ai_video_total_count: 9999999,
      expires_time: 9999999999999,
    };
  }

  return JSON.stringify(jsonBody);
}

// Main execution block
try {
  const modifiedBody = modifyResponseBody($request.url, $response.body);
  $done({ body: modifiedBody });
} catch (e) {
  console.error("An unexpected error occurred in the script:", e);
  // In case of any unexpected error, send the original response body
  $done({ body: $response.body });
}
