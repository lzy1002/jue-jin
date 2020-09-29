import {request} from "../assets/js/request.js";

export function getBookInfo(bookId) {
  const data = {
    booklet_id: bookId
  };

  return request({
    method: "post",
    url: "/book/info",
    data
  })

}
