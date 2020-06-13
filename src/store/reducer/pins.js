import * as TYPES from "../action-types.js";

function pins(state = {recommend: {}, hot: {}}, action) {
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case TYPES.INIT_PINS_RECOMMEND: {
      state.recommend = action.recommend;
      break;
    }
    case TYPES.MORE_PINS_RECOMMEND: {
      state.recommend.items.pageInfo = action.recommend.items.pageInfo;
      state.recommend.items.userActivities.push(...action.recommend.items.userActivities);
      break;
    }
    case TYPES.INIT_PINS_HOT: {
      state.hot = action.hot;
      break;
    }
    case TYPES.MORE_PINS_HOT: {
      state.hot.edges.push(...action.hot.edges);
      state.hot.pageInfo = action.hot.pageInfo;
      break;
    }
  }

  return state;

}

export default pins;
