import {request} from "../assets/js/request.js";

export function getPinContent(pinId) {
  const params = {
    msgId: pinId,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/pin/content",
    params
  })
}

export function getPinComment(pinId, pageNum = 1) {
  const params = {
    pageNum,
    pageSize: 20,
    rankType: "new",
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: `/pin/comment/v1/comments/${pinId}`,
    params
  })

}
