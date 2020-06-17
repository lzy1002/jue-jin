import * as TYPES from "../action-types.js";

function books(state = {all: {books: [], pageNum: 1}}, action) {
  state = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TYPES.INIT_BOOKS_ALL: {
      state.all.books = action.all;
      state.all.pageNum = 2;
      break;
    }
    case TYPES.MORE_BOOKS_ALL: {
      state.all.books.push(...action.all);
      state.all.pageNum = state.all.pageNum + 1;
      break;
    }
  }

  return state;

}

export default books;
