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
  }
};

export default home;
