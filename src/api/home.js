import {request} from "../assets/js/request.js";

const url = "https://android-api.juejin.im/graphql";

export function getHomeRecommend(lastId = "") {
  const data = {
    extensions: {
      query: {
        id: "f948b4528c56f0d2ceaff0be67b0809d"
      }
    },
    variables: {
      after: lastId,
      platformCode: "2",
      positionCodes: [2, 3]
    }
  };

  return request({
    method: "post",
    url,
    data
  })

}
