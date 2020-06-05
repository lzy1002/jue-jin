import {createStore, applyMiddleware} from "redux";
import reduxLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer/index.js";
import mySaga from "./sagas.js";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(reduxLogger, sagaMiddleware));

sagaMiddleware.run(mySaga);

export default store;
