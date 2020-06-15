import {request} from "../assets/js/request.js";

export function getTopicsList(page) {
  const params = {
    device_id: 9685,
    client_id: 9685,
    src: "android",
    uid: "",
    token: "",
    sortType: "new",
    page,
    pageSize: 20
  };

  return request({
    url: "/topics/list",
    params
  })

}
