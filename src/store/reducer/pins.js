import * as TYPES from "../action-types.js";

function pins(state = {recommend: {}, hot: {}}, action) {
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case TYPES.INIT_PINS_RECOMMEND: {
      state.recommend = action.recommend;
      break;
    }
    case TYPES.MORE_PINS_RECOMMEND: {
      state.recommend.data.push(...action.recommend.data);
      state.recommend.has_more = action.recommend.has_more;
      state.recommend.cursor = action.recommend.cursor;
      break;
    }
    case TYPES.INIT_PINS_HOT: {
      state.hot = action.hot;
      break;
    }
    case TYPES.MORE_PINS_HOT: {
      state.hot.data.push(...action.hot.data);
      state.hot.has_more = action.hot.has_more;
      state.hot.cursor = action.hot.cursor;
      break;
    }
  }

  return state;

}

export default pins;
