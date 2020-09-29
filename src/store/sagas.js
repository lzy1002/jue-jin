import {takeEvery, put} from "redux-saga/effects";

import * as TYPES from "./action-types.js";
import actionCreator from "./actionCreator/index.js";

import {getHomeRecommendHotArticle, getHomeRecommend, getHomeFollow, getHomeHot} from "../api/home.js";
import {getPinsRecommend, getPinsHot} from "../api/pins.js";
import {getBooksAll} from "../api/books.js";

function* initHomeRecommendHotArticle(action) {
  const res = yield getHomeRecommendHotArticle();
  yield put(actionCreator.home.initHomeRecommendHotArticle(res.data.data));
}

function* initHomeRecommend(action) {
  const res = yield getHomeRecommend();
  yield put(actionCreator.home.initHomeRecommend(res.data));
}

function* moreHomeRecommend(action) {
  const res = yield getHomeRecommend(action.lastId);
  yield put(actionCreator.home.moreHomeRecommend(res.data));
}

function* initHomeFollow() {
  const res = yield getHomeFollow();
  yield put(actionCreator.home.initHomeFollow(res.data));
}

function* moreHomeFollow(action) {
  const res = yield getHomeFollow(action.cursor);
  yield put(actionCreator.home.moreHomeFollow(res.data));
}

function* initHomeHot(action) {
  const res = yield getHomeHot(action.sign);
  yield put(actionCreator.home.initHomeHot(action.sign, res.data));
}

function* moreHomeHot(action) {
  const res = yield getHomeHot(action.sign, action.lastId);
  yield put(actionCreator.home.moreHomeHot(action.sign, res.data));
}

function* initPinsRecommend(action) {
  const res = yield getPinsRecommend();
  yield put(actionCreator.pins.initPinsRecommend(res.data));
}

function* morePinsRecommend(action) {
  const res = yield getPinsRecommend(action.lastId);
  yield put(actionCreator.pins.morePinsRecommend(res.data));
}

function* initPinsHot(action) {
  const res = yield getPinsHot();
  yield put(actionCreator.pins.initPinsHot(res.data));
}

function* morePinsHot(action) {
  const res = yield getPinsHot(action.lastId);
  yield put(actionCreator.pins.morePinsHot(res.data));
}

function* initBooksAll(action) {
  const res = yield getBooksAll(action.cursor);
  yield put(actionCreator.books.initBooksAll(res.data));
}

function* moreBooksAll(action) {
  const res = yield getBooksAll(action.cursor);
  yield put(actionCreator.books.moreBooksAll(res.data));

}

function* mySaga() {
  yield takeEvery(TYPES.SAGA_INIT_HOME_RECOMMEND_HOT_ARTICLE, initHomeRecommendHotArticle);
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
  yield takeEvery(TYPES.SAGA_INIT_BOOKS_ALL, initBooksAll);
  yield takeEvery(TYPES.SAGA_MORE_BOOKS_ALL, moreBooksAll);
}

export default mySaga;
