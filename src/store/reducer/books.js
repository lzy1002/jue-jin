import * as TYPES from "../action-types.js";

function books(state = {all: {list: []}}, action) {
  state = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TYPES.INIT_BOOKS_ALL: {
      state.all.list = action.all;
      break;
    }
  }

  return state;

}

export default books;
