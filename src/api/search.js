import {request} from "../assets/js/request.js";

export function getSearchSlider() {
  const data = {
    platform: 2606,
    layout: 4,
    cursor: "0",
    limit: 20
  };

  return request({
    method: "post",
    url: "/search/slider",
    data
  })

}
