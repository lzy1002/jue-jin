import {request} from "../assets/js/request.js";

export function getAuthorsData(categoryId = "", cursor = "0") {
  const params = {
    category_id: categoryId,
    cursor,
    limit: 20
  };

  return request({
    url: "/authors/data",
    params
  })

}
