import {request} from "../assets/js/request.js";

export function getArticleDetailContent(articleId) {
  const data = {
    article_id: articleId,
    client_type: 2606
  };

  return request({
    url: "/article/content",
    method: "post",
    data
  })
}

export function getArticleDetailRelated(userId, articleId, tagIds) {
  const data = {
    id_type: 2,
    client_type: 2606,
    cursor: "0",
    limit: 20,
    user_id: userId,
    item_id: articleId,
    tag_ids: tagIds
  };

  return request({
    url: "/article/related",
    method: "post",
    data
  })
}

export function getArticleDetailComment(articleId, cursor = 0) {
  const data = {
    cursor,
    limit: 20,
    client_type: 2606,
    item_id: articleId,
    item_type: 2
  };

  return request({
    url: "/article/comment",
    method: "post",
    data
  })
}
