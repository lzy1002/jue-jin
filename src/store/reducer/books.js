import * as TYPES from "../action-types.js";

function books(state = {all: {}}, action) {
  state = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TYPES.INIT_BOOKS_ALL: {
      state.all = action.all;
      break;
    }
    case TYPES.MORE_BOOKS_ALL: {
      state.all.data.push(...action.all.data);
      state.all.cursor = action.all.cursor;
      state.all.has_more = action.all.has_more;
      break;
    }
  }

  return state;

}

export default books;
