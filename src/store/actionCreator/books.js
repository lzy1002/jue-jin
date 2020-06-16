import * as TYPES from "../action-types.js";

let books = {
  sagaInitBooksAll(pageNum) {
    return {
      type: TYPES.SAGA_INIT_BOOKS_ALL,
      pageNum
    }
  },
  initBooksAll(all) {
    return {
      type: TYPES.INIT_BOOKS_ALL,
      all
    }
  }
};

export default books;
