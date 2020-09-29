import {request} from "../assets/js/request.js";

export function getResultData(type, query, cursor = "0") {
  const data = {
    id_type: type,
    key_word: query,
    cursor,
    limit: 20
  };

  return request({
    method: "post",
    url: "/result/data",
    data
  })
}
