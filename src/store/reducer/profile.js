import * as TYPES from "../action-types.js";

export function profile(state = {articleThumb: {articleThumbList: []}, articleHistory: {articleHistoryList: []}, tagFollowing: {tagFollowingList: []}, userFollowing: {userFollowingList: []}, pinThumb: {pinThumbList: []}}, action) {
  state = JSON.parse(JSON.stringify(state));
  let articleThumbList = JSON.parse(window.localStorage.getItem("_ARTICLE_THUMB_LIST_") || "[]");
  state.articleThumb.articleThumbList = articleThumbList;

  let articleHistoryList = JSON.parse(window.localStorage.getItem("_ARTICLE_HISTORY_LIST_") || "[]");
  state.articleHistory.articleHistoryList = articleHistoryList;

  let tagFollowingList = JSON.parse(window.localStorage.getItem("_TAG_FOLLOWING_LIST_") || "[]");
  state.tagFollowing.tagFollowingList = tagFollowingList;

  let userFollowingList = JSON.parse(window.localStorage.getItem("_USER_FOLLOWING_LIST_") || "[]");
  state.userFollowing.userFollowingList = userFollowingList;

  let pinThumbList = JSON.parse(window.localStorage.getItem("_PIN_THUMB_LIST_") || "[]");
  state.pinThumb.pinThumbList = pinThumbList;

  switch (action.type) {
    case TYPES.CHANGE_ARTICLE_THUMB_STATE: {
      console.log(action.article);
      const index = articleThumbList.findIndex(item => item.objectId === action.article.objectId);
      if(index !== -1) {
        articleThumbList.splice(index, 1);
      }else {
        articleThumbList.unshift(action.article);
      }
      window.localStorage.setItem("_ARTICLE_THUMB_LIST_", JSON.stringify(articleThumbList));
      state.articleThumb.articleThumbList = articleThumbList;
      break;
    }
    case TYPES.ADD_ARTICLE_WATCH_HISTORY: {
      const index = articleHistoryList.findIndex(item => item.objectId === action.article.objectId);
      if(index !== -1) {
        articleHistoryList.splice(index, 1);
      }
      articleHistoryList.unshift(action.article);

      if(articleHistoryList.length > 100) {
        articleHistoryList.pop();
      }

      window.localStorage.setItem("_ARTICLE_HISTORY_LIST_", JSON.stringify(articleHistoryList));
      state.articleHistory.articleHistoryList = articleHistoryList;
      break;
    }
    case TYPES.CHANGE_TAG_FOLLOWING_STATE: {
      const index = tagFollowingList.findIndex(item => item.id === action.tag.id);
      console.log(index);
      if(index !== -1) {
        tagFollowingList.splice(index, 1);
      }else {
        tagFollowingList.unshift(action.tag);
      }

      window.localStorage.setItem("_TAG_FOLLOWING_LIST_", JSON.stringify(tagFollowingList));
      state.tagFollowing.tagFollowingList = tagFollowingList;
      break;
    }
    case TYPES.CHANGE_USER_FOLLOWING_STATE: {
      const index = userFollowingList.findIndex(item => item.user.objectId === action.user.user.objectId);
      if(index !== -1) {
        userFollowingList.splice(index, 1);
      }else {
        userFollowingList.unshift(action.user);
      }

      window.localStorage.setItem("_USER_FOLLOWING_LIST_", JSON.stringify(userFollowingList));
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

      window.localStorage.setItem("_PIN_THUMB_LIST_", JSON.stringify(pinThumbList));
      state.pinThumb.pinThumbList = pinThumbList;
      break;
    }

  }
  return state;
}

export default profile;
