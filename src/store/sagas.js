import {takeEvery, put} from "redux-saga/effects";

import * as TYPES from "./action-types.js";
import actionCreator from "./actionCreator/index.js";

import {getHomeRecommend, getHomeFollow, getHomeHot} from "../api/home.js";

function* initHomeRecommend(action) {
  const res = yield getHomeRecommend();
  yield put(actionCreator.home.initHomeRecommend(res.data.data));
}

function* moreHomeRecommend(action) {
  const res = yield getHomeRecommend(action.lastId);
  console.log(res);
  yield put(actionCreator.home.moreHomeRecommend(res.data.data));
}

function* initHomeFollow() {
  const res = yield getHomeFollow();
  console.log(res);
  console.log("发送了请求");
  yield put(actionCreator.home.initHomeFollow(res.data.d));
}

function* moreHomeFollow(action) {
  const res = yield getHomeFollow(action.lastId);
  yield put(actionCreator.home.moreHomeFollow(res.data.d));
}

function* initHomeHot(action) {
  const res = yield getHomeHot(action.sign);
  console.log(res);
  yield put(actionCreator.home.initHomeHot(action.sign, res.data.data));
}

function* moreHomeHot(action) {
  const res = yield getHomeHot(action.sign, action.lastId);
  yield put(actionCreator.home.moreHomeHot(action.sign, res.data.data));
}

function* mySaga() {
  yield takeEvery(TYPES.SAGA_INIT_HOME_RECOMMEND, initHomeRecommend);
  yield takeEvery(TYPES.SAGA_MORE_HOME_RECOMMEND, moreHomeRecommend);
  yield takeEvery(TYPES.SAGA_INIT_HOME_FOLLOW, initHomeFollow);
  yield takeEvery(TYPES.SAGA_MORE_HOME_FOLLOW, moreHomeFollow);
  yield takeEvery(TYPES.SAGA_INIT_HOME_HOT, initHomeHot);
  yield takeEvery(TYPES.SAGA_MORE_HOME_HOT, moreHomeHot)
}

export default mySaga;
