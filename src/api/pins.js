import {request} from "../assets/js/request.js";

export function getPinsRecommend(lastId = "") {
  const data = {
    extensions: {
      query: {
        id: "e3e03965a15cf246cf7cc3944086843b"
      }
    },
    variables: {
      after: lastId,
      afterPosition: ""
    }
  };

  return request({
    method: "post",
    url: "https://android-api.juejin.im/graphql",
    data
  })

}

export function getPinsHot(lastId = "") {
  const data = {
    variables: {
      after: lastId,
      first: 20
    },
    extensions: {
      query: {
        id: "1b6b07b2ffcdc06c43114d79ca131afa"
      }
    }
  };

  return request({
    method: "post",
    url: "https://android-api.juejin.im/graphql",
    data
  })

}
