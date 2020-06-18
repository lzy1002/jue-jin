import {combineReducers} from "redux";

import home from "./home.js";
import pins from "./pins.js";
import result from "./result.js";
import books from "./books.js";
import profile from "./profile.js";

const reducer = combineReducers({
  home,
  pins,
  result,
  books,
  profile
});

export default reducer;
