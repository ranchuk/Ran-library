import React, { Component } from "react";
import { connect } from "react-redux";
import BookDetail from "../book_detail/book_detail.js";
import { fetch_books } from "../../actions/index";
import { bindActionCreators } from "redux";
import "../book_list/book_list.css";

class BookList extends Component {
  componentDidMount() {
    this.props.fetch_books();
  }

  renderList() {
    if (this.props.books[0]) {
      return this.props.books.map(book => {
        return <BookDetail book={book} key={book.id} />;
      });
    }
  }

  render() {
    return <div className="book__list__container">{this.renderList()}</div>;
  }
}

function mapStateToProps({ books }) {
  return { books };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetch_books }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);
