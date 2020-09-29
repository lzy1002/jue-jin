import {request} from "../assets/js/request.js";

export function getTopicInfo(topicId) {
  const data = {
    topic_id: topicId
  };

  return request({
    method: "post",
    url: `/topic/info`,
    data
  })

}

export function getTopicAttenders(topicId) {
  const data = {
    cursor: "0",
    limit: 6,
    item_id: topicId,
    id_type: 11
  };

  return request({
    method: "post",
    url: "/topic/attenders",
    data
  })

}

export function getTopicRank(topicId, cursor = "0") {
  const data = {
    cursor,
    limit: 20,
    id_type: 4,
    sort_type: 200,
    topic_id: topicId
  };

  return request({
    method: "post",
    url: "/topic/rank",
    data
  })

}

export function getTopicNewest(topicId, cursor = "0") {
  const data = {
    cursor,
    limit: 20,
    id_type: 4,
    sort_type: 500,
    topic_id: topicId
  };

  return request({
    method: "post",
    url: "/topic/newest",
    data
  })

}
