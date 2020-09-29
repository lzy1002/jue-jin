import {request} from "../assets/js/request.js";

export function getPinContent(pinId) {
  const data = {
    msg_id: pinId
  };

  return request({
    url: "/pin/content",
    method: "post",
    data
  })
}

export function getPinComment(pinId, cursor = "0") {
  const data = {
    cursor,
    limit: 20,
    client_type: 2606,
    item_id: pinId,
    item_type: 4
  };

  return request({
    url: `/pin/comment`,
    method: "post",
    data
  })

}
