import {request} from "../assets/js/request.js";

export function getSearchSlider() {
  const data = {
    extensions: {
      query: {
        id: "1623ab25980fadf6bae12e10fc0af1e8"
      }
    },
    variables: {
      platformCode: 2,
      positionCodes: [4]
    }
  };

  return request({
    method: "post",
    url: "https://android-api.juejin.im/graphql",
    data
  })

}
