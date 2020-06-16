import {request} from "../assets/js/request.js";

export function getBooksAll(pageNum) {
  const params = {
    pageNum,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/books/all",
    params
  })

}
