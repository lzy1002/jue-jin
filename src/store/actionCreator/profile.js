import * as TYPES from "../action-types.js";

let profile = {
  changeArticleThumbState(article) {
    return {
      type: TYPES.CHANGE_ARTICLE_THUMB_STATE,
      article
    }
  },
  addArticleWatchHistory(article) {
    return {
      type: TYPES.ADD_ARTICLE_WATCH_HISTORY,
      article
    }
  },
  changeTagFollowingState(tag) {
    return {
      type: TYPES.CHANGE_TAG_FOLLOWING_STATE,
      tag
    }
  },
  changeUserFollowingState(user) {
    return {
      type: TYPES.CHANGE_USER_FOLLOWING_STATE,
      user
    }
  },
  changePinThumbState(pin) {
    return {
      type: TYPES.CHANGE_PIN_THUMB_STATE,
      pin
    }
  },
  changeTopicFollowingState(topic) {
    return {
      type: TYPES.CHANGE_TOPIC_FOLLOWING_STATE,
      topic
    }
  },
  changeCommentThumbState(comment) {
    return {
      type: TYPES.CHANGE_COMMENT_THUMB_STATE,
      comment
    }
  }

};

export default profile;
