import {request} from "../assets/js/request.js";

export function getArticleDetailContent(articleId) {
  const params = {
    entryIds: articleId,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/article/content",
    params
  })
}

export function getArticleDetailView(articleId) {
  const params = {
    entryId: articleId,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/article/view",
    params
  })

}

export function getArticleDetailRelated(articleId) {
  const params = {
    entryId: articleId,
    limit: 4,
    token: "",
    uid: "",
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/article/related",
    params
  })
}

export function getArticleDetailComment(articleId) {
  const params = {
    createdAt: "",
    rankType: "new",
    src: "android"
  };

  return request({
    url: `/article/comment/v2/comments/entry/${articleId}`,
    params
  })
}
