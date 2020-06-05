import * as TYPES from "../action-types.js";

function home(state = {recommend: {}}, action) {
  state = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TYPES.INIT_HOME_RECOMMEND: {
      state.recommend = action.recommend;
      break;
    }
    case TYPES.MORE_HOME_RECOMMEND: {
      state.recommend.articleFeed.items.edges.push(...action.recommend.articleFeed.items.edges);
      state.recommend.articleFeed.items.pageInfo = action.recommend.articleFeed.items.pageInfo;
    }
  }

  return state;

}

export default home;
