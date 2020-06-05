import {takeEvery, put} from "redux-saga/effects";

import * as TYPES from "./action-types.js";
import actionCreator from "./actionCreator/index.js";

import {getHomeRecommend} from "../api/home.js";

function* initHomeRecommend(action) {
  const res = yield getHomeRecommend();
  yield put(actionCreator.home.initHomeRecommend(res.data.data));
}

function* moreHomeRecommend(action) {
  const res = yield getHomeRecommend(action.lastId);
  console.log(res);
  yield put(actionCreator.home.moreHomeRecommend(res.data.data));
}

function* mySaga() {
  yield takeEvery(TYPES.SAGA_INIT_HOME_RECOMMEND, initHomeRecommend);
  yield takeEvery(TYPES.SAGA_MORE_HOME_RECOMMEND, moreHomeRecommend);
}

export default mySaga;
