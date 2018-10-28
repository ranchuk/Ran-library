import axios from "axios";
const ROOT_URL = "/books_db.json";

export const FETCH_BOOKS = "FETCH_BOOKS";
export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const EDIT_BOOK = "EDIT_BOOK";

export const fetch_books = () => {
  const url = ROOT_URL;
  const request = axios.get(url);
  return {
    type: FETCH_BOOKS,
    payload: request
  };
};
export const add_book = book_values => {
  return {
    type: ADD_BOOK,
    payload: book_values
  };
};

export const delete_book = id => {
  return {
    type: DELETE_BOOK,
    payload: id
  };
};

export const edit_book = book_values => {
  return {
    type: EDIT_BOOK,
    payload: book_values
  };
};
