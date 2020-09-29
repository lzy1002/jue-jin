import {request} from "../assets/js/request.js";

export function getBooksAll(cursor) {
  const data = {
    category_id: "0",
    cursor,
    limit: 20
  };

  return request({
    method: "post",
    url: "/books/all",
    data
  })

}
