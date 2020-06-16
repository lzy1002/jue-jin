import {combineReducers} from "redux";

import home from "./home.js";
import pins from "./pins.js";
import result from "./result.js";
import books from "./books.js";

const reducer = combineReducers({
  home,
  pins,
  result,
  books
});

export default reducer;
