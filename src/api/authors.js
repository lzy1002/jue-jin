import {request} from "../assets/js/request.js";

export function getAuthorsData(position, lastId = "") {
  const data = {
    extensions: {
      query: {
        id: "71f4b77bd5fe68aadfd9eb7c65319afe"
      }
    },
    variables: {
      channel: position,
      first: 20,
      after: lastId
    }
  };

  return request({
    method: "post",
    url: "https://android-api.juejin.im/graphql",
    data
  })

}
