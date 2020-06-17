import {request} from "../assets/js/request.js";

export function getBookInfo(bookId) {
  const params = {
    id: bookId,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/book/info",
    params
  })

}

export function getBookBuyer(bookId) {
  const params = {
    id: bookId,
    pageNum: 1,
    pageSize: 20,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/book/buyer",
    params
  })

}

export function getBookSection(bookId) {
  const params = {
    id: bookId,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/book/section",
    params
  })

}
