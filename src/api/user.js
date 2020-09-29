import {request} from "../assets/js/request.js";

export function getUserInfo(userId) {
  const params = {
    user_id: userId,
    aid: 2606,
    iid: 2814366492137406
  };

  return request({
    url: "/user/info",
    params
  })
}

export function getUserPins(userId) {
  const data = {
    limit: 20,
    cursor: "0",
    sort_type: 4,
    user_id: userId
  };

  return request({
    url: "/user/pins",
    method: "post",
    data
  })
}

export function getUserActive(userId) {
  const params = {
    user_id: userId,
    cursor: "0",
    aid: 2606,
    iid: 2814366492137406
  };

  return request({
    url: "/user/active",
    params
  })
}

export function getUserPosts(userId) {
  const data = {
    user_id: userId,
    limit: 20,
    cursor: "0",
    sort_type: 2,
  };

  return request({
    url: "/user/posts",
    method: "post",
    data
  })
}
