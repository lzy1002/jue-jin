import * as TYPES from "../action-types.js";

function home(state = {recommend: {}, follow: {}, hot: {sign: 3}}, action) {
  state = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TYPES.INIT_HOME_RECOMMEND_HOT_ARTICLE: {
      state.recommend.hotArticle = action.hotArticle;
      break;
    }
    case TYPES.INIT_HOME_RECOMMEND: {
      state.recommend.recommendList = action.recommend;
      break;
    }
    case TYPES.MORE_HOME_RECOMMEND: {
      state.recommend.recommendList.data.push(...action.recommend.data);
      state.recommend.recommendList.cursor = action.recommend.cursor;
      state.recommend.recommendList.has_more = action.recommend.has_more;
      break;
    }
    case TYPES.INIT_HOME_FOLLOW: {
      state.follow = action.follow;
      break;
    }
    case TYPES.MORE_HOME_FOLLOW: {
      state.follow.data.push(...action.follow.data);
      state.follow.cursor = action.follow.cursor;
      state.follow.has_more = action.follow.has_more;
      break;
    }
    case TYPES.INIT_HOME_HOT: {
      state.hot.sign = action.sign;
      state.hot.hotData = action.hot;
      break;
    }
    case TYPES.MORE_HOME_HOT: {
      state.hot.sign = action.sign;
      state.hot.hotData.data.push(...action.hot.data);
      state.hot.hotData.cursor = action.hot.cursor;
      state.hot.hotData.has_more = action.hot.has_more;
      break;
    }
  }

  return state;

}

export default home;
