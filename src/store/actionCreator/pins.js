import * as TYPES from "../action-types.js";

let pins = {
  sagaInitPinsRecommend() {
    return {
      type: TYPES.SAGA_INIT_PINS_RECOMMEND
    }
  },
  initPinsRecommend(recommend) {
    return {
      type: TYPES.INIT_PINS_RECOMMEND,
      recommend
    }
  },
  sagaMorePinsRecommend(lastId) {
    return {
      type: TYPES.SAGA_MORE_PINS_RECOMMEND,
      lastId
    }
  },
  morePinsRecommend(recommend) {
    return {
      type: TYPES.MORE_PINS_RECOMMEND,
      recommend
    }
  },
  sagaInitPinsHot() {
    return {
      type: TYPES.SAGA_INIT_PINS_HOT
    }
  },
  initPinsHot(hot) {
    return {
      type: TYPES.INIT_PINS_HOT,
      hot
    }
  },
  sagaMorePinsHot(lastId) {
    return {
      type: TYPES.SAGA_MORE_PINS_HOT,
      lastId
    }
  },
  morePinsHot(hot) {
    return {
      type: TYPES.MORE_PINS_HOT,
      hot
    }
  },
  sagaInitPinsFollow(extensions) {
    return {
      type: TYPES.SAGA_INIT_PINS_FOLLOW,
      extensions
    }
  },
  initPinsFollow(follow) {
    return {
      type: TYPES.INIT_PINS_FOLLOW,
      follow
    }
  }

};

export default pins;
