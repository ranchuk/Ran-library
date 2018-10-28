import React, { Component } from "react";
import Header from "../Header/Header.js";
import BookList from "../../containers/book_list/book_list";
import NewBook from "../../containers/new_book/new_book";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="new__book__container">
          <NewBook type="ADD" title="Add book" btnClass="add_btn" />
        </div>
        {<BookList />}
      </div>
    );
  }
}

export default App;
