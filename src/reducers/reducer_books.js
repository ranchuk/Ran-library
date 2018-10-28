import { FETCH_BOOKS, ADD_BOOK } from "../actions/index";
import { DELETE_BOOK } from "../actions/index";
import { EDIT_BOOK } from "../actions/index";

const initState = [];

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_BOOKS: {
      // console.log(action.payload);
      return action.payload.data;
    }
    case DELETE_BOOK: {
      return state.filter(item => item.id !== action.payload);
    }
    case ADD_BOOK: {
      const { title, author_name, published_date } = action.payload;
      const id = state.length === 0 ? 1 : +state[state.length - 1].id + 1;
      const new_book = {
        id: id,
        title: title,
        author_name: author_name,
        published_date: published_date
      };
      return state.concat(new_book);
    }

    case EDIT_BOOK: {
      return state.map(book => {
        return book.id === action.payload.id ? action.payload : book;
      });
    }

    default:
      return state;
  }
}
