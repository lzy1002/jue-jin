import * as TYPES from "../action-types.js";

function result(state = {searchHistory: []}, action) {
  state = JSON.parse(JSON.stringify(state));
  let searchHistory = JSON.parse(window.localStorage.getItem("__SEARCH_HISTORY__") || "[]");
  state.searchHistory = searchHistory;

  switch (action.type) {
    case TYPES.ADD_SEARCH_HISTORY: {
      const index = searchHistory.findIndex(item => item === action.searchKey);
      if(index !== -1) {
        searchHistory.splice(index, 1);
      }
      searchHistory.unshift(action.searchKey);
      window.localStorage.setItem("__SEARCH_HISTORY__", JSON.stringify(searchHistory));
      state.searchHistory = searchHistory;

      break;
    }
    case TYPES.REMOVE_SEARCH_HISTORY: {
      searchHistory.splice(action.historyIndex, 1);
      window.localStorage.setItem("__SEARCH_HISTORY__", JSON.stringify(searchHistory));
      state.searchHistory = searchHistory;

      break;
    }
    case TYPES.CLEAR_SEARCH_HISTORY: {
      searchHistory = [];
      window.localStorage.setItem("__SEARCH_HISTORY__", JSON.stringify(searchHistory));
      state.searchHistory = searchHistory;

      break;
    }
  }

  return state;
}

export default result;
