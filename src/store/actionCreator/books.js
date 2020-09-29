import * as TYPES from "../action-types.js";

let books = {
  sagaInitBooksAll(cursor) {
    return {
      type: TYPES.SAGA_INIT_BOOKS_ALL,
      cursor
    }
  },
  initBooksAll(all) {
    return {
      type: TYPES.INIT_BOOKS_ALL,
      all
    }
  },
  sagaMoreBooksAll(cursor) {
    return {
      type: TYPES.SAGA_MORE_BOOKS_ALL,
      cursor
    }
  },
  moreBooksAll(all) {
    return {
      type: TYPES.MORE_BOOKS_ALL,
      all
    }
  }
};

export default books;
