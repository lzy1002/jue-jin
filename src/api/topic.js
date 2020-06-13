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

export function getTopicAttenders(topicId) {
  const params = {
    topicId: topicId,
    page: 0,
    pageSize: 20,
    uid: "",
    token: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/topic/attenders",
    params
  })

}

export function getTopicRank(topicId) {
  const params = {
    topicId: topicId,
    sortType: "rank",
    page: 0,
    pageSize: 20,
    uid: "",
    token: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/topic/rank",
    params
  })

}

export function getTopicNewest(topicId) {
  const params = {
    topicId: topicId,
    sortType: "newest",
    page: 0,
    pageSize: 20,
    uid: "",
    token: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/topic/newest",
    params
  })

}
