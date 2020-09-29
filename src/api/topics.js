import {request} from "../assets/js/request.js";

export function getTopicsList(cursor = "0") {
  const data = {
    sort_type: 7,
    cursor,
    limit: 20
  };

  return request({
    method: "post",
    url: "/topics/list",
    data
  })

}
