import * as TYPES from "../action-types.js";

function home(state = {recommend: {}, follow: {loadMore: true}, hot: {sign: "THREE_DAYS_HOTTEST"}}, action) {
  state = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TYPES.INIT_HOME_RECOMMEND: {
      state.recommend = action.recommend;
      break;
    }
    case TYPES.MORE_HOME_RECOMMEND: {
      state.recommend.articleFeed.items.edges.push(...action.recommend.articleFeed.items.edges);
      state.recommend.articleFeed.items.pageInfo = action.recommend.articleFeed.items.pageInfo;
      break;
    }
    case TYPES.INIT_HOME_FOLLOW: {
      state.follow = action.follow;
      state.follow.loadMore = action.follow.entrylist.length !== 0;
      break;
    }
    case TYPES.MORE_HOME_FOLLOW: {
      state.follow.entrylist.push(...action.follow.entrylist);
      state.follow.loadMore = action.follow.entrylist.length !== 0;
      break;
    }
    case TYPES.INIT_HOME_HOT: {
      state.hot.sign = action.sign;
      state.hot.articleFeed = action.hot.articleFeed;
      break;
    }
    case TYPES.MORE_HOME_HOT: {
      state.hot.sign = action.sign;
      state.hot.articleFeed.items.edges.push(...action.hot.articleFeed.items.edges);
      state.hot.articleFeed.items.pageInfo = action.hot.articleFeed.items.pageInfo;
      break;
    }
  }

  return state;

}

export default home;
