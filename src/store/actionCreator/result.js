import * as TYPES from "../action-types.js";

let result = {
  addSearchHistory(searchKey) {
    return {
      type: TYPES.ADD_SEARCH_HISTORY,
      searchKey
    }
  },
  removeSearchHistory(historyIndex) {
    return {
      type: TYPES.REMOVE_SEARCH_HISTORY,
      historyIndex
    }
  },
  clearSearchHistory() {
    return {
      type: TYPES.CLEAR_SEARCH_HISTORY
    }
  }
};

export default result;
