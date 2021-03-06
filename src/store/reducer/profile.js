import * as TYPES from "../action-types.js";

export function profile(state = {articleThumb: {articleThumbList: []}, articleHistory: {articleHistoryList: []}, tagFollowing: {tagFollowingList: []}, userFollowing: {userFollowingList: []}, pinThumb: {pinThumbList: []}, topicFollowing: {topicFollowingList: []}, commentThumb: {commentThumbList: []}}, action) {
  state = JSON.parse(JSON.stringify(state));
  let articleThumbList = JSON.parse(window.localStorage.getItem("__ARTICLE_THUMB_LIST__") || "[]");
  state.articleThumb.articleThumbList = articleThumbList;

  let articleHistoryList = JSON.parse(window.localStorage.getItem("__ARTICLE_HISTORY_LIST__") || "[]");
  state.articleHistory.articleHistoryList = articleHistoryList;

  let tagFollowingList = JSON.parse(window.localStorage.getItem("__TAG_FOLLOWING_LIST__") || "[]");
  state.tagFollowing.tagFollowingList = tagFollowingList;

  let userFollowingList = JSON.parse(window.localStorage.getItem("__USER_FOLLOWING_LIST__") || "[]");
  state.userFollowing.userFollowingList = userFollowingList;

  let pinThumbList = JSON.parse(window.localStorage.getItem("__PIN_THUMB_LIST__") || "[]");
  state.pinThumb.pinThumbList = pinThumbList;

  let topicFollowingList = JSON.parse(window.localStorage.getItem("__TOPIC_FOLLOWING_LIST__") || "[]");
  state.topicFollowing.topicFollowingList = topicFollowingList;

  let commentThumbList = JSON.parse(window.localStorage.getItem("__COMMENT_THUMB_LIST__") || "[]");
  state.commentThumb.commentThumbList = commentThumbList;

  switch (action.type) {
    case TYPES.CHANGE_ARTICLE_THUMB_STATE: {
      const index = articleThumbList.findIndex(item => item.articleId === action.article.articleId);
      if(index !== -1) {
        articleThumbList.splice(index, 1);
      }else {
        articleThumbList.unshift(action.article);
      }
      window.localStorage.setItem("__ARTICLE_THUMB_LIST__", JSON.stringify(articleThumbList));
      state.articleThumb.articleThumbList = articleThumbList;
      break;
    }
    case TYPES.ADD_ARTICLE_WATCH_HISTORY: {
      const index = articleHistoryList.findIndex(item => item.articleId === action.article.articleId);
      if(index !== -1) {
        articleHistoryList.splice(index, 1);
      }
      articleHistoryList.unshift(action.article);

      if(articleHistoryList.length > 100) {
        articleHistoryList.pop();
      }

      window.localStorage.setItem("__ARTICLE_HISTORY_LIST__", JSON.stringify(articleHistoryList));
      state.articleHistory.articleHistoryList = articleHistoryList;
      break;
    }
    case TYPES.CHANGE_TAG_FOLLOWING_STATE: {
      const index = tagFollowingList.findIndex(item => item.tag_id === action.tag.tag_id);
      if(index !== -1) {
        tagFollowingList.splice(index, 1);
      }else {
        tagFollowingList.unshift(action.tag);
      }

      window.localStorage.setItem("__TAG_FOLLOWING_LIST__", JSON.stringify(tagFollowingList));
      state.tagFollowing.tagFollowingList = tagFollowingList;
      break;
    }
    case TYPES.CHANGE_USER_FOLLOWING_STATE: {
      const index = userFollowingList.findIndex(item => item.user_id === action.user.user_id);
      if(index !== -1) {
        userFollowingList.splice(index, 1);
      }else {
        userFollowingList.unshift(action.user);
      }

      window.localStorage.setItem("__USER_FOLLOWING_LIST__", JSON.stringify(userFollowingList));
      state.userFollowing.userFollowingList = userFollowingList;
      break;
    }
    case TYPES.CHANGE_PIN_THUMB_STATE: {
      const index = pinThumbList.findIndex(item => item === action.pin);
      if(index !== -1) {
        pinThumbList.splice(index, 1);
      }else {
        pinThumbList.unshift(action.pin);
      }

      window.localStorage.setItem("__PIN_THUMB_LIST__", JSON.stringify(pinThumbList));
      state.pinThumb.pinThumbList = pinThumbList;
      break;
    }
    case TYPES.CHANGE_TOPIC_FOLLOWING_STATE: {
      const index = topicFollowingList.findIndex(item => item.topicId === action.topic.topicId);
      if(index !== -1) {
        topicFollowingList.splice(index, 1);
      }else {
        topicFollowingList.unshift(action.topic);
      }

      window.localStorage.setItem("__TOPIC_FOLLOWING_LIST__", JSON.stringify(topicFollowingList));
      state.topicFollowing.topicFollowingList = topicFollowingList;
      break;
    }
    case TYPES.CHANGE_COMMENT_THUMB_STATE: {
      const index = commentThumbList.findIndex(item => item === action.comment);
      if(index !== -1) {
        commentThumbList.splice(index, 1);
      }else {
        commentThumbList.unshift(action.comment);
      }

      window.localStorage.setItem("__COMMENT_THUMB_LIST__", JSON.stringify(commentThumbList));
      state.commentThumb.commentThumbList = commentThumbList;
      break;
    }

  }
  return state;
}

export default profile;
