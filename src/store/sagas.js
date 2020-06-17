import {takeEvery, put} from "redux-saga/effects";

import * as TYPES from "./action-types.js";
import actionCreator from "./actionCreator/index.js";

import {getHomeRecommend, getHomeFollow, getHomeHot} from "../api/home.js";
import {getPinsRecommend, getPinsHot, getPinsFollow} from "../api/pins.js";
import {getBooksAll} from "../api/books.js";

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

function* initPinsRecommend(action) {
  const res = yield getPinsRecommend();
  console.log(res);
  yield put(actionCreator.pins.initPinsRecommend(res.data.data.recommendedActivityFeed));
}

function* morePinsRecommend(action) {
  console.log(action);
  const res = yield getPinsRecommend(action.lastId);
  yield put(actionCreator.pins.morePinsRecommend(res.data.data.recommendedActivityFeed));
}

function* initPinsHot(action) {
  const res = yield getPinsHot();
  yield put(actionCreator.pins.initPinsHot(res.data.data.popularPinList.items));
  console.log(res);
}

function* morePinsHot(action) {
  const res = yield getPinsHot(action.lastId);
  console.log(res.data.data.popularPinList.items);
  yield put(actionCreator.pins.morePinsHot(res.data.data.popularPinList.items));
}

function* initPinsFollow(action) {
  const res = yield getPinsFollow(action.extensions);
  console.log(res);
  yield put(actionCreator.pins.initPinsFollow(res.data.data.userRecommendationCard));

}

function* initBooksAll(action) {
  const res = yield getBooksAll(action.pageNum);
  console.log(res);
  yield put(actionCreator.books.initBooksAll(res.data.d));
}

function* moreBooksAll(action) {
  const res = yield getBooksAll(action.pageNum);
  yield put(actionCreator.books.moreBooksAll(res.data.d));

}

function* mySaga() {
  yield takeEvery(TYPES.SAGA_INIT_HOME_RECOMMEND, initHomeRecommend);
  yield takeEvery(TYPES.SAGA_MORE_HOME_RECOMMEND, moreHomeRecommend);
  yield takeEvery(TYPES.SAGA_INIT_HOME_FOLLOW, initHomeFollow);
  yield takeEvery(TYPES.SAGA_MORE_HOME_FOLLOW, moreHomeFollow);
  yield takeEvery(TYPES.SAGA_INIT_HOME_HOT, initHomeHot);
  yield takeEvery(TYPES.SAGA_MORE_HOME_HOT, moreHomeHot);
  yield takeEvery(TYPES.SAGA_INIT_PINS_RECOMMEND, initPinsRecommend);
  yield takeEvery(TYPES.SAGA_MORE_PINS_RECOMMEND, morePinsRecommend);
  yield takeEvery(TYPES.SAGA_INIT_PINS_HOT, initPinsHot);
  yield takeEvery(TYPES.SAGA_MORE_PINS_HOT, morePinsHot);
  yield takeEvery(TYPES.SAGA_INIT_PINS_FOLLOW, initPinsFollow);
  yield takeEvery(TYPES.SAGA_INIT_BOOKS_ALL, initBooksAll);
  yield takeEvery(TYPES.SAGA_MORE_BOOKS_ALL, moreBooksAll);
}

export default mySaga;
