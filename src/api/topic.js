import {request} from "../assets/js/request.js";

export function getTopicInfo(topicId) {
  const params = {
    uid: "",
    token: "",
    src: "android",
    device_id: 9685
  };

  return request({
    url: `/topic/info/v1/topic/${topicId}`,
    params
  })

}
