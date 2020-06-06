import * as TYPES from "../action-types.js";

let home = {
  sagaInitHomeRecommend() {
    return {
      type: TYPES.SAGA_INIT_HOME_RECOMMEND
    }
  },
  initHomeRecommend(recommend) {
    return {
      type: TYPES.INIT_HOME_RECOMMEND,
      recommend
    }
  },
  sagaMoreHomeRecommend(lastId) {
    return {
      type: TYPES.SAGA_MORE_HOME_RECOMMEND,
      lastId
    }
  },
  moreHomeRecommend(recommend) {
    return {
      type: TYPES.MORE_HOME_RECOMMEND,
      recommend
    }
  },
  sagaInitHomeFollow() {
    return {
      type: TYPES.SAGA_INIT_HOME_FOLLOW
    }
  },
  initHomeFollow(follow) {
    return {
      type: TYPES.INIT_HOME_FOLLOW,
      follow
    }
  },
  sagaMoreHomeFollow(lastId) {
    return {
      type: TYPES.SAGA_MORE_HOME_FOLLOW,
      lastId
    }
  },
  moreHomeFollow(follow) {
    return {
      type: TYPES.MORE_HOME_FOLLOW,
      follow
    }
  },
  sagaInitHomeHot(sign) {
    return {
      type: TYPES.SAGA_INIT_HOME_HOT,
      sign
    }
  },
  initHomeHot(sign, hot) {
    return {
      type: TYPES.INIT_HOME_HOT,
      sign,
      hot
    }
  },
  sagaMoreHomeHot(sign, lastId) {
    return {
      type: TYPES.SAGA_MORE_HOME_HOT,
      sign,
      lastId
    }
  },
  moreHomeHot(sign, hot) {
    return {
      type: TYPES.MORE_HOME_HOT,
      sign,
      hot
    }
  }
};

export default home;
