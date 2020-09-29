import {request} from "../assets/js/request.js";

export function getHomeRecommendHotArticle() {
  const data = {
    id_type: 2,
    client_type: 2606,
    sort_type: 213,
    cursor: "eyJ2IjoiNjg3NTg3NDUzMzIyODgzODkyNSIsImkiOjN9",
    limit: 3
  };

  return request({
    url: "/home/recommend/hot",
    method: "post",
    data
  })

}

export function getHomeRecommend(cursor = "0") {  // lastId不传获取的是第一页的数据 传递了获取的是后一页的数据
  const data = {
    id_type: 2,
    client_type: 2606,
    limit: 20,
    sort_type: 200,
    cursor
  };

  return request({
    method: "post",
    url: "/home/recommend/list",
    data
  })

}

export function getHomeFollow(cursor = "0") {
  const data = {
    id_type: 2,
    client_type: 2606,
    cursor,
    limit: 20,
    sort_type: 3
  };

  return request({
    method: "post",
    url: "/home/follow",
    data
  })
}

export function getHomeHot(sign, cursor = "0") {
  const data = {
    id_type: 2,
    client_type: 2606,
    cursor,
    limit: 20,
    sort_type: sign
  };

  return request({
    method: "post",
    url: "/home/hot",
    data
  })

}
