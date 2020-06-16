import {request} from "../assets/js/request.js";

export function getResultData(type, query, lastId = "") {
  const data = {
    extensions: {
      query: {
        id: "caee4ea8b64f5860b8867564230e905f"
      }
    },
    variables: {
      after: lastId,
      type,
      query
    }
  };

  return request({
    method: "post",
    url: "https://android-api.juejin.im/graphql",
    data
  })
}
