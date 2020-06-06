import {request} from "../assets/js/request.js";

const url = "https://android-api.juejin.im/graphql";

export function getHomeRecommend(lastId = "") {  // lastId不传获取的是第一页的数据 传递了获取的是后一页的数据
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

export function getHomeFollow(hotIndex = "") {
  const params = {
    category: "all",
    limit: 20,
    period: "3day",
    before: hotIndex,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/home/follow",
    params
  })
}

export function getHomeHot(sign, lastId = "") {
  const data = {
    extensions: {
      query: {
        id: "f30157ca93f83fc7ff860ed0fb45599e"
      }
    },
    variables: {
      after: lastId,
      order: sign
    }
  };

  return request({
    method: "post",
    url,
    data
  })

}
