import {combineReducers} from "redux";

import home from "./home.js";
import pins from "./pins.js";

const reducer = combineReducers({
  home,
  pins
});

export default reducer;
