import React, { Component } from "react";
import DeleteBook from "../delete_book/delete_book";
import NewBook from "../new_book/new_book";
import "../book_detail/book_detail.css";

export default class BookDetail extends Component {
  render() {
    const { book } = this.props;
    return (
      <div className="book__detail__card">
        <div className="book__detail__card__header__box ">
          <div className="center__box">
            <h5 className="book__detail__card__header">{book.title}</h5>
          </div>
        </div>
        <div className="book__detail__card__details">
          <p>{book.author_name}</p>
          <p> {book.published_date}</p>
          <div className="book__detail__card_btn_box">
            <DeleteBook book={book} />
            <NewBook
              type="edit"
              title="Edit book"
              book={book}
              btnClass="edit_btn"
            />
          </div>
        </div>
      </div>
    );
  }
}
