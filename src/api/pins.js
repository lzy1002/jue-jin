import {request} from "../assets/js/request.js";

export function getPinsRecommend(cursor = "0") {
  const data = {
    cursor,
    limit: 20,
    id_type: 4,
    sort_type: 300
  };

  return request({
    url: "/pins/recommend",
    method: "post",
    data
  })

}

export function getPinsHot(cursor = "0") {
  const data = {
    cursor,
    limit: 20,
    id_type: 4,
    sort_type: 200
  };

  return request({
    method: "post",
    url: "/pins/hot",
    data
  })

}
